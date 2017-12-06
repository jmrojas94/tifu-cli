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

var getTifuPosts = () => {
  var tifu = []
  status.start()
  Reddit.subreddit("tifu").exec((data) => {
    var posts = data.data.children
    status.stop()
    for (var i = 0; i < posts.length; i++) {
      tifu.push(posts[i])
    }
    return posts
  })
}

var getTifuTitles = (posts) => {
  var titles = []
  status.start()
  for (var i = 0; i < posts.length; i++) {
    titles.push(posts[i].data.titles)
  }
  status.stop()
  return titles
}

var getTifu = (answer) => {
  var tifuPosts = getTifuPosts()
}

var initTifu = () => {
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

initTifu()
