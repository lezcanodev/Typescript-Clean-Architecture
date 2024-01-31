import type {Config} from 'jest';
import path from 'path';

const config: Config = {
    preset: 'ts-jest',
    verbose: true,
    passWithNoTests: true,
    testMatch: [path.join(__dirname, 'tests/**/*.test.ts')],
    moduleNameMapper: {
        '@auth/(.*)': '<rootDir>/src/resources/auth//$1',
        '@common/(.*)': '<rootDir>/src/resources/common//$1',
        '@user/(.*)': '<rootDir>/src/resources/user//$1',
        '@post/(.*)': '<rootDir>/src/resources/post//$1',
        '@file/(.*)': '<rootDir>/src/resources/file//$1',
        '@tests/(.*)': '<rootDir>/tests/resources//$1'
    }
};
  
export default config;