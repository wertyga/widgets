module.exports = {
  apps : [
    {
      name: "widgets-site",
      cwd: "./apps/widgets/widgets_site",
      script: 'npm',
      args: 'run start',
      env: {
        "NODE_ENV": "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "widgets-http",
      cwd: "./apps/widgets/widgets",
      script: './public/server/index.js',
      env: {
        "NODE_ENV": "production",
      },
    },
    {
      name: "widgets-socket",
      cwd: "./apps/widgets/widgets",
      script: './public/server/chatServer/index.js',
      env: {
        "NODE_ENV": "production",
      },
    },
  ]
}
