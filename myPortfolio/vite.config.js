import { defineConfig, loadEnv } from 'vite' // import loadEnv for loading environment variables
import react from '@vitejs/plugin-react' // import react plugin for React support
import process from 'process' // import process for environment variables

// This function will return the Vite configuration
export default defineConfig(({ mode }) => { 
  // Here we pass the mode and the 
  // root directory to loadEnv, this uses three parameters, the first one is the 
  // mode, the second one is the root directory, and the third one is the prefix 
  // for the environment variables
  const env = loadEnv(mode, process.cwd(), '')

  return{
    plugins: [react()],
    server: {
      port: parseInt(env.PORT) || 3000, // Here we use the environment variable PORT and if it is not available we use 3000
    },
  }
})