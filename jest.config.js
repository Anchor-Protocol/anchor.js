module.exports = {
  roots: ['<rootDir>/anchor.js/src/', '<rootDir>/cli/src/'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testTimeout: 50000,
  testMatch: ['**/__test?(s)__/**/*.ts?(x)', '**/?(*.)(spec|test).ts?(x)'],
  moduleNameMapper: {
    '@anchor-protocol/anchor.js/(.*)$': '<rootDir>/anchor.js/src/$1',
    '@anchor-protocol/cli/(.*)$': '<rootDir>/cli/src/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverageFrom: [
    'src/**/*.ts?(x)',
    '!**/*.d.ts?(x)',
    '!**/__*__/**',
    '!**/bin/**'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  //moduleDirectories: ['<rootDir>/src', '<rootDir>/node_modules', '<rootDir>/../node_modules'],
  //modulePaths: ['<rootDir>/src/'],
};
