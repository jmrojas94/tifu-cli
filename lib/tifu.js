const chalk = require("chalk");
const clear = require("clear");
const CLI = require("clui");
const figlet = require("figlet");
const inquirer = require("inquirer");
const r = require("nraw");

const Reddit = new r("TIFU-CLI v0.0.1 by jmrojas");
const Spinner = CLI.Spinner;
const status = new Spinner("Hold up...", [
  "⣾",
  "⣽",
  "⣻",
  "⢿",
  "⡿",
  "⣟",
  "⣯",
  "⣷",
]);

var posts = [];
var titles = [];
var nsfwFilter = false;

clear();
console.log(chalk.gray(figlet.textSync("TIFU", { horizontalLayout: "full" })));

var getTifuPosts = (answer, callback) => {
  status.start();

  Reddit.subreddit("tifu").exec((data) => {
    let unfilteredPosts = data.data.children;
    if (answer.includeNSFWFilter === "No") {
      unfilteredPosts = unfilteredPosts.filter((post) => !post.data.over_18);
    }
    posts.push(unfilteredPosts);
    status.stop();
    getTifuTitles(unfilteredPosts, callback);
  });
};

var getTifuTitles = (x, callback) => {
  for (var i = 0; i < x.length; i++) {
    titles.push(x[i].data.title);
  }
  callback();
};

var getTifu = (answer) => {
  getTifuPosts(answer, () => {
    if (answer.chooseTifuOption === "Choose Title") {
      console.log("\n");
      titleOptions();
    } else if (answer.chooseTifuOption === "Random") {
      console.log("\n");
      console.log("-----------------------------------------------");
      console.log("\n");
      var randomTifu = Math.floor(Math.random() * posts[0].length);
      console.log(posts[0][randomTifu].data.title);
      console.log("\n");
      console.log("-----------------------------------------------");
      console.log("\n");
      console.log(posts[0][randomTifu].data.selftext);
      console.log("\n");
      console.log("-----------------------------------------------");
      console.log("\n");
      chooseAgain();
    }
  });
};

var titleOptions = () => {
  var questions = [
    {
      type: "list",
      name: "chooseTifuTitle",
      message: "Choose TIFU By Title:",
      choices: titles,
      default: titles[0],
    },
  ];

  inquirer.prompt(questions).then((answer) => {
    console.log("\n");
    console.log("-----------------------------------------------");
    console.log("\n");
    console.log(answer.chooseTifuTitle);
    console.log("\n");
    console.log("-----------------------------------------------");
    console.log("\n");
    console.log(findTifuByTitle(answer.chooseTifuTitle));
    console.log("\n");
    console.log("-----------------------------------------------");
    console.log("\n");
    chooseAgain();
  });
};

var findTifuByTitle = (title) => {
  var tifuPostFound = posts[0].filter((post) => {
    return post.data.title === title ? post : false;
  });

  return tifuPostFound[0].data.selftext;
};

var chooseAgain = () => {
  var questions = [
    {
      type: "list",
      name: "chooseAgain",
      message: "Another TIFU or Get Back To Work:",
      choices: ["Another TIFU", "Get Back To Work"],
      default: "Another TIFU",
    },
  ];

  inquirer.prompt(questions).then((answer) => {
    if (answer.chooseAgain === "Another TIFU") {
      console.log("\n");
      clear();
      initTifu();
    } else {
      console.log("Until next time...");
      return;
    }
  });
};

var initTifu = () => {
  var questions = [
    {
      type: "list",
      name: "includeNSFWFilter",
      message: "Include NSFW?",
      choices: ["Yes", "No"],
      default: true,
    },
    {
      type: "list",
      name: "chooseTifuOption",
      message: "View All Titles or Random TIFU:",
      choices: ["Choose Title", "Random"],
      default: "Choose Title",
    },
  ];

  inquirer.prompt(questions).then((answer) => {
    getTifu(answer);
  });
};

initTifu();
