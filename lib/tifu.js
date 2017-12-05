const chalk = require('chalk')
const clear = require('clear')
const CLI = require('clui')
const figlet = require('figlet')
const inquirer = require('inquirer')

const getTifu = require('./commands/get-tifu.js')

const Spinner = CLI.Spinner

clear();
console.log(
  chalk.yellow(
    figlet.textSync('TIFU', { horizontalLayout: 'full' })
  )
)

var status = new Spinner('Hold up...', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'])
status.start()
setTimeout(() => {
  status.stop()
  },
  2000
)

// inquirer
//   .option('--fast', 'running things even faster')

// inquirer
//   .command('run')
//   .description('Run something')
//   .action(() => {
//     var status = new Spinner('Hold up...');
//     status.start()
//     getTifu.getTifu()
//     status.stop()
//   })

// inquirer.parse(process.argv)

// if (inquirer.rawArgs.length <= 2) {
//   inquirer.help()
// }
