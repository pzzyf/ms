import { colors, consola } from '@ms/node-utils';

import { cac } from 'cac';

import { version } from '../package.json';
import { defineLintCommand } from './lint';

/**
 * Initialize and run the CLI
 */
async function main(): Promise<void> {
  try {
    const vsh = cac('vsh');

    defineLintCommand(vsh);

    // Set up CLI
    vsh.usage('vsh <command> [options]');
    vsh.help();
    vsh.version(version);

    // Parse arguments
    vsh.parse();
  } catch (error) {
    consola.error(
      colors.red('An unexpected error occurred:'),
      '\n',
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }
}

// Run the CLI
main().catch((error) => {
  consola.error(
    colors.red('Failed to start CLI:'),
    '\n',
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
});
