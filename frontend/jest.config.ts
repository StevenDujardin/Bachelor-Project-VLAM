import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use the preset for TypeScript
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  verbose: true, // Enable verbose output
  setupFilesAfterEnv: ['./src/setupTests.ts'], // Setup file for additional configurations
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files using ts-jest
    '^.+\\.(js|jsx)$': 'babel-jest', // Transform JavaScript files using babel-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Recognize these file types
  transformIgnorePatterns: ['<rootDir>/node_modules/'], // Ignore transforming files in node_modules
};

export default config;