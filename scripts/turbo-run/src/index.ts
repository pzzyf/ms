import { cac } from 'cac';
import { run } from './run';

try{

  const turboRun = cac('turbo-run');

  turboRun
    .command('[script]', 'Run a command in turbo mode')
    .action(async (command: string) => {
      run({ command });
    });

  turboRun.parse();

}catch(err){
    console.error(err);
    process.exit(1);
}
