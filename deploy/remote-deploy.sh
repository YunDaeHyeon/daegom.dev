#!/bin/bash
# EC2에서 실행되는 배포 스크립트. GitHub Actions의 rsync 단계에서 이 저장소와
# 함께 복사되므로, 워크플로우는 이 파일을 SSH로 실행만 하면 된다.
#
# firebase-admin@14는 Node >=22를 요구한다. Node 20에서는 optionalDependencies로
# 선언된 @google-cloud/firestore가 EBADENGINE으로 설치에서 조용히 빠져버려서
# "Cannot find package 'firebase-admin-<hash>'" 형태로 /lab 페이지가 500을 낸다
# (원인 기록: git log f3b8182). GitHub Actions 러너의 Node 버전을 올려도 EC2
# 박스 자체의 Node 버전은 별개이므로, 여기서 직접 확인하고 강제한다.
set -euo pipefail

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
  nvm use 22
fi

NODE_MAJOR=$(node -e "console.log(process.versions.node.split('.')[0])")
if [ "$NODE_MAJOR" -lt 22 ]; then
  echo "EC2 Node 버전이 v$(node -v)입니다. firebase-admin은 Node >=22가 필요합니다." >&2
  echo "고치려면: nvm install 22 && nvm alias default 22" >&2
  exit 1
fi

cd ~/daegom-portfolio
npm ci --omit=dev

# pm2 데몬은 최초 시작 시점의 PATH(구버전 Node 경로)를 캐싱해두기 때문에,
# --update-env 없이 restart하면 방금 npm ci에 쓴 Node 22와 다른 인터프리터로
# 프로세스가 뜰 수 있다. 반드시 --update-env로 현재 셸의 PATH를 다시 반영한다.
pm2 restart daegom-portfolio --update-env

# 배포 후 실제로 떴는지 확인 — Firestore를 쓰는 /lab 경로까지 건드려서
# 조용히 깨진 채로 남는 상황을 방지한다.
sleep 2
if ! curl -fsS -o /dev/null http://localhost:3000/lab; then
  echo "배포 후 /lab 헬스체크 실패 — pm2 logs daegom-portfolio 로 확인 필요" >&2
  exit 1
fi
echo "배포 완료 및 헬스체크 통과"
