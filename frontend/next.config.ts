import type { NextConfig } from 'next'

type EnvironmentVariables = {
  WELCOME: string
  PORT: string
}

// fixme: we can use .env files to load environment variables based on the environment
const getEnvironmentVariables = (target: string): EnvironmentVariables => {
  if (target === 'production') {
    return {
      WELCOME: 'Welcome to the production environment!',
      PORT: '80',
    }
  }

  return {
    WELCOME: 'Welcome to the development environment!',
    PORT: '8080',
  }
}


const nextConfig: NextConfig = {
  /* config options here */
  env: getEnvironmentVariables(process.env.NODE_ENV),
};

export default nextConfig;
