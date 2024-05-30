import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
};

export default config;
