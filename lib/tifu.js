const commander = require('commander')

commander
    .option('--fast', 'running things even faster')

commander
    .command('run')
    .description('Run something')
    .action(() => {
        console.log('Working!')
        console.log(commander.dryRun)
    })

commander.parse(process.argv)

if (commander.rawArgs.length <= 2) {
    commander.help()
}
