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
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
