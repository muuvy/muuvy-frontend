const scanner = require("sonarqube-scanner");

scanner(
  {
    // this example uses local instance of SQ
    serverUrl: "https://sonarcloud.io",
    options: {
      "sonar.projectKey":"muuvy_muuvy-frontend",
      "sonar.organization":"muuvy",
      "sonar.sources":"src",
      "sonar.host.url": "https://sonarcloud.io",
      "sonar.login": "5365f8872e33b556aad8493d86df46effe8fe3ce"
    }
  },
  () => {
    // callback is required
  }
);