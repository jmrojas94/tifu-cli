const r = require("nraw")
const Reddit = new r("TIFU-CLI v0.0.1 by jmrojas")

exports.getTifu = () => {
  Reddit.subreddit("CatReactionGifs").exec(function (data) {
    console.log(data)
  })
}
