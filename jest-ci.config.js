/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
    ci: true
};

module.exports = Object.assign({}, require('./jest-coverage.config.js'), config);
