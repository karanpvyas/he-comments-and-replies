module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'reports', outputName: 'report.xml' }],
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
