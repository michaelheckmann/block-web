// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/web',
  setupFilesAfterEnv: ['<rootDir>/web/config/setup-jest.js'],
}

module.exports = config
