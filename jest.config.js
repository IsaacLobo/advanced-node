/* eslint-disable semi */
/* eslint-disable comma-dangle */
module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/test/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
}
