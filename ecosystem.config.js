module.exports = {
  apps: [
    {
      name: "daegom-portfolio",
      script: "npm",
      args: "start",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      instances: 1,
      // Turbopack의 serverExternalPackages 해시 임포트(firebase-admin 등)가
      // pm2 cluster 모드(Node cluster 워커)에서 깨져 "Cannot find package
      // 'firebase-admin-<hash>'" 500을 낸다. fork 모드로 고정한다.
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
