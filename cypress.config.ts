import { defineConfig } from 'cypress';
import { removeDownloadsFolder } from './cypress/support/tasks';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', { removeDownloadsFolder });
      return config;
    },
  },
});
