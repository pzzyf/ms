import process from 'node:process'
import { cancel, isCancel, select } from '@clack/prompts'
import { execaCommand, getPackages } from '@ms/node-utils'

interface RunOptions {
  command?: string
}

export async function run(options: RunOptions) {
  const { command } = options
  if (!command) {
    console.error('No command provided')
    process.exit(1)
  }

  const { packages } = await getPackages()

  // 只显示有对应命令的包
  const selectPkgs = packages.filter((package_) => {
    return (package_?.packageJson as Record<string, any>)?.scripts?.[command]
  })

  let selectPackage: string | symbol

  if (selectPkgs.length > 1) {
    selectPackage = await select<string>({
      message: `Select the app you need to run [${command}]:`,
      options: selectPkgs.map((item) => ({
        label: item?.packageJson.name,
        value: item?.packageJson.name,
      })),
    })

    if (isCancel(selectPackage) || !selectPackage) {
      cancel('👋 Has cancelled')
      process.exit(0)
    }
  } else {
    selectPackage = selectPkgs[0]?.packageJson?.name ?? ''
  }

  execaCommand(`pnpm --filter=${selectPackage} run ${command}`, {
    stdio: 'inherit',
  })
}
