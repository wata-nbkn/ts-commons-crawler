module.exports = {
  rootDir: '../',
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^consts$': '<rootDir>/src/consts',
  },
  preset: 'ts-jest',
  testRegex: '/__tests__/.*\\.spec\\.ts$',
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
      diagnostics: true,
    },
  },
};
