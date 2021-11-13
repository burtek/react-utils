/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
    collectCoverage: true,
    coverageProvider: 'v8'
};

module.exports = Object.assign({}, require('./jest.config.js'), config);
