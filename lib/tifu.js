const chalk = require('chalk')
const clear = require('clear')
const CLI = require('clui')
const figlet = require('figlet')
const inquirer = require('inquirer')
const r = require("nraw")

const Reddit = new r("TIFU-CLI v0.0.1 by jmrojas")
const Spinner = CLI.Spinner
const status = new Spinner('Hold up...', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'])

clear()
console.log(
  chalk.yellow(
    figlet.textSync('TIFU', { horizontalLayout: 'full' })
  )
)

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
