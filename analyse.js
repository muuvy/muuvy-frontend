const scanner = require("sonarqube-scanner");
require('dotenv').config();

scanner(
  {
    serverUrl: "https://sonarcloud.io",
    options: {
      "sonar.projectKey": "muuvy_muuvy-frontend",
      "sonar.organization": "muuvy",
      "sonar.sources": "src",
      "sonar.host.url": "https://sonarcloud.io",
      "sonar.login": process.env.SONAR_TOKEN
    }
  },
  () => {
    // callback is required
  }
);