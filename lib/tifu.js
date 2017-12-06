const chalk = require('chalk')
const clear = require('clear')
const CLI = require('clui')
const figlet = require('figlet')
const inquirer = require('inquirer')
const r = require("nraw")

const Reddit = new r("TIFU-CLI v0.0.1 by jmrojas")
const Spinner = CLI.Spinner
const status = new Spinner('Hold up...', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'])

var posts = []
var titles = []

clear()
console.log(
  chalk.yellow(
    figlet.textSync('TIFU', { horizontalLayout: 'full' })
  )
)

var getTifuPosts = (callback) => {
  status.start()
  Reddit.subreddit("tifu").exec((data) => {
    var tifuPostData = data.data.children
    posts.push(tifuPostData)
    status.stop()
    getTifuTitles(tifuPostData, callback)
  })
}

var getTifuTitles = (x, callback) => {
  for (var i = 0; i < x.length; i++) {
    titles.push(x[i].data.title)
  }
  callback()
}

var getTifu = (answer) => {
  getTifuPosts(() => {
    console.log(answer)
    titleOptions()
  })
}

var titleOptions = () => {
  var questions = [
    {
      type: 'list',
      name: 'chooseTifuTitle',
      message: 'Choose TIFU By Title:',
      choices: titles,
      default: titles[0]
    }
  ]

  inquirer.prompt(questions).then((answer => {
    console.log(answer)
  }))
}

var initTifu = () => {
  var questions = [
    {
      type: 'list',
      name: 'chooseTifuOption',
      message: 'View All Titles or Random TIFU:',
      choices: ['Choose Title', 'Random'],
      default: 'Choose Title'
    }
  ]

  inquirer.prompt(questions).then((answer => {
    getTifu(answer.chooseTifuOption)
  }))
}

initTifu()
