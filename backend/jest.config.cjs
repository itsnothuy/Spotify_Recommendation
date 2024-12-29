module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
