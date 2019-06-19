const scanner = require("sonarqube-scanner");

scanner(
  {
    // this example uses local instance of SQ
    serverUrl: "https://sonarcloud.io",
    options: {
      "sonar.projectVersion": "0.0.1",
      "sonar.sources": "src",
      "sonar.exclusions":"**/*.test.*",
      "sonar.tests": "src",
      "sonar.test.inclusions": "**/*.test.*/**",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "test-report.xml"
    },
  },
  () => {
    // callback is required
  }
);