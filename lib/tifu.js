const commander = require('commander')
const getTifu = require('./commands/get-posts.js')

commander
  .option('--fast', 'running things even faster')

commander
  .command('run')
  .description('Run something')
  .action(() => {
    getTifu.getTifu()
    console.log('Working!')
    console.log(commander.dryRun)
  })

commander.parse(process.argv)

if (commander.rawArgs.length <= 2) {
  commander.help()
}
