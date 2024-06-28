// module.exports = {
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
//     moduleNameMapper: {
//       '\\.(css|less)$': 'identity-obj-proxy',
//     },
//     collectCoverage: true,
//     coverageDirectory: 'coverage',
//     coverageReporters: ['json', 'lcov', 'text', 'clover'],
//     collectCoverageFrom: [
//       'src/**/*.{js,jsx}',
//       '!src/index.js',
//       '!src/serviceWorker.js',
//       '!src/setupTests.js',
//     ],
//   };

module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ['/node_modules/(?!axios)/"'],
  testEnvironment: "jsdom",
};
