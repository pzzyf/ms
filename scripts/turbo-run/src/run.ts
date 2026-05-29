import { cancel, isCancel, select } from '@clack/prompts';
import { getPackages,execaCommand } from '@ms/node-utils';


interface RunOptions {
  command?: string;
}

export async function run(options: RunOptions) {
  const { command } = options;
  if (!command) {
    console.error('No command provided');
    process.exit(1);
  }

  const { packages } = await getPackages();

  // 只显示有对应命令的包
  const selectPkgs = packages.filter((pkg) => {
    return (pkg?.packageJson as Record<string, any>)?.scripts?.[command];
  });

  let selectPkg: string | symbol;

  if (selectPkgs.length > 1) {
    selectPkg = await select<string>({
      message: `Select the app you need to run [${command}]:`,
      options: selectPkgs.map((item) => ({
        label: item?.packageJson.name,
        value: item?.packageJson.name,
      })),
    });

    if (isCancel(selectPkg) || !selectPkg) {
      cancel('👋 Has cancelled');
      process.exit(0);
    }
  } else {
    selectPkg = selectPkgs[0]?.packageJson?.name ?? '';
  }

  console.log(selectPkg,'selectPkg');

  console.info(`pnpm --filter=${selectPkg} run ${command}`)

  execaCommand(`pnpm --filter=${selectPkg} run ${command}`, {
    stdio: 'inherit',
  });
}
