# daegom.dev 배포 runbook

목표: 지금 `daegom.dev`에서 돌고 있는 n8n을 `n8n.daegom.dev`로 옮기고,
이 Next.js 포트폴리오를 `daegom.dev`(루트 도메인)에 올린다.

이 앱은 모달(Intercepting Route)이 서버 렌더링을 필요로 해서 **정적
export가 안 됨** — 반드시 `next start`로 떠 있는 Node 프로세스가 필요하다.
S3/CloudFront 같은 정적 호스팅만으로는 안 된다.

n8n은 이미 Docker/docker-compose로, 웹서버는 Nginx로 돌고 있다는 전제로
작성함. 진행 전에 **n8n을 백업**하거나 최소한 `docker-compose.yml`을
복사해두는 걸 추천 — n8n 쪽 설정도 같이 건드리기 때문.

## 0. 사전 준비 (로컬)

- [ ] 이 저장소를 GitHub(또는 접근 가능한 원격 저장소)에 올려두기 —
      EC2에서 `git clone`으로 받을 수 있어야 함. 아직이면 먼저 push.
- [ ] EC2 인스턴스 사양 확인 (`free -h`로 메모리 확인). 1GB 미만이면
      `npm run build`가 메모리 부족으로 죽을 수 있음 — 이 경우 3번에서
      "로컬에서 빌드 후 전송" 방식을 선택할 것.

## 1. DNS

`daegom.dev`를 관리하는 곳(Route 53 등)에서:

- `n8n.daegom.dev` → 지금 EC2의 (Elastic) IP로 A 레코드 추가
- `daegom.dev` 기존 A 레코드는 그대로 둠 (같은 서버, 서비스만 바뀜)

전파에 몇 분~몇 시간 걸릴 수 있음. `dig n8n.daegom.dev` 로 확인.

## 2. n8n을 서브도메인으로 이동

EC2에 SSH 접속 후, n8n의 `docker-compose.yml` (또는 이걸 참조하는
`.env`)에서 아래 값들을 `n8n.daegom.dev` 기준으로 변경:

```yaml
environment:
  - N8N_HOST=n8n.daegom.dev
  - N8N_PROTOCOL=https
  - WEBHOOK_URL=https://n8n.daegom.dev/
  - N8N_PORT=5678 # 컨테이너 내부 포트, 보통 안 바뀜
```

적용:

```bash
docker compose down
docker compose up -d
```

**주의**: 웹훅을 쓰는 워크플로우가 있으면, 외부 서비스(GitHub 등)에 등록된
웹훅 URL도 `n8n.daegom.dev`로 바꿔야 함. n8n 워크플로우 편집기에서 각
Webhook 노드를 열어 URL이 새 도메인으로 나오는지 확인.

## 3. 포트폴리오 코드를 EC2로

옵션 A — EC2에서 직접 빌드 (메모리 충분할 때):

```bash
git clone <repo-url> daegom-portfolio
cd daegom-portfolio
npm ci
npm run build
```

옵션 B — 로컬에서 빌드 후 전송 (EC2가 작을 때):

```bash
# 로컬에서
npm ci && npm run build
rsync -avz --exclude node_modules \
  ./ ec2-user@<EC2-IP>:~/daegom-portfolio/
# EC2에서
cd ~/daegom-portfolio && npm ci --omit=dev
```

Node 버전: Next.js 16 자체는 Node 20.9 이상이면 되지만, `firebase-admin`
(Lab 기능의 Firestore 연동)이 **Node 22 이상**을 요구한다. `node -v`로
확인하고, 낮으면 nvm으로 22 LTS 설치 (`nvm install 22 && nvm alias default 22`).

**주의**: GitHub Actions 워크플로우의 Node 버전을 22로 맞춰도 그건 CI
러너에만 적용된다 — EC2 박스 자체의 Node 버전은 별개로 22여야 한다.
낮으면 `@google-cloud/firestore`(firebase-admin의 optionalDependency)가
`npm ci` 중 EBADENGINE으로 조용히 빠지고, `/lab` 접속 시에만
"Cannot find package 'firebase-admin-...'" 500 에러로 나타난다.

## 4. PM2로 프로세스 상시 구동

저장소 루트의 `ecosystem.config.js`를 그대로 사용:

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # 출력되는 명령어를 그대로 한 번 더 실행 (재부팅 시 자동시작)
```

`pm2 logs daegom-portfolio`로 정상 기동 확인 (기본 포트 3000).

## 5. Nginx 설정

이 저장소의 `deploy/nginx/*.conf` 두 파일을 참고용으로 만들어뒀음.

```bash
sudo cp deploy/nginx/daegom.dev.conf /etc/nginx/sites-available/
sudo cp deploy/nginx/n8n.daegom.dev.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/daegom.dev.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/n8n.daegom.dev.conf /etc/nginx/sites-enabled/
```

**기존에 `daegom.dev`를 n8n으로 프록시하던 server block이 있다면 지금
지우거나 비활성화** (`sites-enabled`에서 제거) — 안 그러면 충돌남.

n8n이 호스트의 몇 번 포트로 노출돼 있는지 `docker compose ps` 또는
`docker-compose.yml`의 `ports:` 매핑으로 확인하고, `n8n.daegom.dev.conf`의
`proxy_pass` 포트를 맞게 고칠 것 (기본값 5678로 넣어뒀음).

```bash
sudo nginx -t          # 문법 체크
sudo systemctl reload nginx
```

## 6. SSL (Let's Encrypt)

Nginx 설정이 반영된 뒤 실행 — certbot이 위 conf 파일들을 직접 수정해서
SSL 블록을 추가함:

```bash
sudo certbot --nginx -d daegom.dev -d www.daegom.dev
sudo certbot --nginx -d n8n.daegom.dev
```

## 7. 확인

- [ ] `https://daegom.dev` → 포트폴리오 사이트 뜨는지
- [ ] `https://daegom.dev/opengraph-image`, `/icon` 같은 생성 이미지 라우트 정상인지
- [ ] `https://n8n.daegom.dev` → n8n 로그인 화면 뜨는지
- [ ] 기존 워크플로우의 웹훅이 새 도메인에서도 정상 동작하는지 (하나 직접 트리거해보기)
- [ ] `pm2 status`로 포트폴리오 프로세스가 `online`인지

## 자동 배포 (GitHub Actions)

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 로컬 빌드 →
rsync → `deploy/remote-deploy.sh` 실행(EC2에서 Node 22 확인 →
`npm ci --omit=dev` → `pm2 restart --update-env` → `/lab` 헬스체크) 순으로
자동 배포한다. `pm2 restart`에 `--update-env`가 빠지면 pm2 데몬이 최초
기동 시점의 낡은 PATH/Node 버전을 계속 캐싱해서 쓸 수 있으니, 수동으로
재시작할 때도 반드시 `--update-env`를 붙일 것.

## 재배포 시 (수동으로 다시 할 때)

```bash
git pull
npm ci
npm run build
bash deploy/remote-deploy.sh   # Node 버전 확인 + npm ci --omit=dev + pm2 restart --update-env + 헬스체크
```