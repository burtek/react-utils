/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    ci: true,
    projects: [
        {
            displayName: 'test',
            preset: 'ts-jest',
            testEnvironment: 'jest-environment-jsdom'
        },
        {
            displayName: 'lint',
            runner: 'jest-runner-eslint',
            testMatch: [
                '<rootDir>/src/**/*.js',
                '<rootDir>/src/**/*.jsx',
                '<rootDir>/src/**/*.ts',
                '<rootDir>/src/**/*.tsx'
            ]
        }
    ],
    collectCoverage: true,
    coverageProvider: 'v8',
    reporters: ['default', 'jest-junit']
};
