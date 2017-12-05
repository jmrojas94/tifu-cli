const chalk = require('chalk')
const clear = require('clear')
const CLI = require('clui')
const figlet = require('figlet')
const inquirer = require('inquirer')
const r = require("nraw")

const Reddit = new r("TIFU-CLI v0.0.1 by jmrojas")
const Spinner = CLI.Spinner

clear()
console.log(
  chalk.yellow(
    figlet.textSync('TIFU', { horizontalLayout: 'full' })
  )
)

const status = new Spinner('Hold up...', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'])
status.start()
setTimeout(() => {
  status.stop()
  ask()
  },
  2000
)

var getTifu = (answer) => {
  status.start()
  Reddit.subreddit("tifu").exec(function (data) {
    var posts = data.data.children
    for (var i = 0; i < posts.length; i++) {
      console.log(posts[i].data.title)
      status.stop()
    }
  })
}


var ask = () => {
  var questions = [
    {
      type: 'list',
      name: 'chooseTIFU',
      message: 'View All Titles or Random TIFU:',
      choices: ['Choose Title', 'Random'],
      default: 'Choose Title'
    }
  ]

  inquirer.prompt(questions).then((answer => {
    getTifu(answer)
  }))
}

// inquirer
//   .option('--fast', 'running things even faster')

// inquirer
//   .command('run')
//   .description('Run something')
//   .action(() => {
//     var status = new Spinner('Hold up...')
//     status.start()
//     getTifu.getTifu()
//     status.stop()
//   })

// inquirer.parse(process.argv)

// if (inquirer.rawArgs.length <= 2) {
//   inquirer.help()
// }
