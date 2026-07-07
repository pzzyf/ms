import process from 'node:process'
import { cac } from 'cac'
import { run } from './run'

try {
  const turboRun = cac('turbo-run')

  turboRun
    .command('[script]', 'Run a command in turbo mode')
    .action(async (command: string) => {
      run({ command })
    })

  turboRun.parse()
} catch (error) {
  console.error(error)
  process.exit(1)
}
