module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,vue}", "!**/node_modules/**"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/main.js",
    "<rootDir>/src/lib/constants.js",
    "<rootDir>/src/router/index.js",
    "<rootDir>/src/store/index.js",
    "<rootDir>/src/service/httpService.js"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  preset: "@vue/cli-plugin-unit-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};

