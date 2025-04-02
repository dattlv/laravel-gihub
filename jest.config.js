module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/resources/js/$1',
  },
  testMatch: ['<rootDir>/resources/js/**/*.test.{js,jsx}'],
};
