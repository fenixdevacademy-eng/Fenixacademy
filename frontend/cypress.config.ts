'use client';

﻿import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: true,
        screenshotOnRunFailure: true,
        defaultCommandTimeout: 10000,
        requestTimeout: 10000,
        responseTimeout: 10000,
        setupNodeEvents(on, config) {
            // Implementar plugins aqui
        },
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/e2e.ts',
        fixturesFolder: 'cypress/fixtures',
        screenshotsFolder: 'cypress/screenshots',
        videosFolder: 'cypress/videos',
        downloadsFolder: 'cypress/downloads',
        env: {
            // Variáveis de ambiente para testes
            API_BASE_URL: 'http://localhost:8000',
            TEST_USER_EMAIL: 'test@fenixacademy.com',
            TEST_USER_PASSWORD: 'testpassword123'
        }
    },
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack'},
        specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/component.ts',
        indexHtmlFile: 'cypress/support/component-index.html'
    }
});