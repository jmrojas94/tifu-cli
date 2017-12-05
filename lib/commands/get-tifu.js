const r = require("nraw")
const Reddit = new r("TIFU-CLI v0.0.1 by jmrojas")

exports.getTifu = () => {
  Reddit.subreddit("tifu").exec(function (data) {
    var posts = data.data.children
    for (var i = 0; i < posts.length; i++) {
      console.log(posts[i].data.title)
    }
  })
}
