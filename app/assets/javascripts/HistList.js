function toCamelCase(str) { return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

function clearMem() {
  chrome.storage.local.remove("SCHistory");
}

var HistList = React.createClass({displayName: "HistList",
  getInitialState: function () {
    return {
      songList: [{
        img: "",
        title: "",
        url: ""
      }]
    }
  },

  _getSongList: function () {
    var that = this;
    chrome.storage.local.get("SCHistory", function (items) {
      that.setState({
        songList: items.SCHistory || []
      });
    });
  },

  componentWillMount: function () {
    this._getSongList();
  },

  clearHist: function () {
    clearMem();
    this._getSongList();
  },

  showPlayer: function () {
    var playerContainer = document.getElementById('player-container');
    playerContainer.style.animation = "revealPlayer 0.5s 1";
    playerContainer.style.height = "45%";
  },

  closePlayer: function () {
    var playerContainer = document.getElementById('player-container');
    playerContainer.style.animation = "hidePlayer 0.5s 1";
    playerContainer.style.height = "0%";
  },

  songComponents: function () {
    return this.state.songList.map(function (el, i, arr) {
      return React.createElement(Song, {key: i, imgStyle: el.img, title: el.title, url: el.url, i: i/(arr.length-1 || 1)})
    });
  },

  render: function () {
    var tmpSongs;
    var emptySongList = (React.createElement("div", {className: "no-songs"}, "Get some tunes bumping!"));
    return (

     React.createElement("span", {id: "no-blur"}, 
        React.createElement("div", null, 
          React.createElement("div", {id: "clear", onClick: this.clearHist}, "Clear"), 
          React.createElement("div", {id: "music-player", onClick: this.showPlayer}, "Open Music Player"), 
           (tmpSongs = this.songComponents()).length > 0 ? tmpSongs : emptySongList
        ), 
        React.createElement("div", {id: "player-container"}, 
          React.createElement("button", {id: "player-close", onClick: this.closePlayer}, "X")
        )
      )

    );
  }
});

var Song = React.createClass({displayName: "Song",
  getDefaultProps: function () {
    return {
      imgStyle: "",
      url: "",
      title: "",
      i: 0
    }
  },

  render: function () {
    var fin = {
      "backgroundSize": "cover"
    };
    var p = /([\w-]+):\s?([^;]*)/g;
    var m;
    while ( (m = p.exec(this.props.imgStyle)) !== null) {
      fin[toCamelCase(m[1])] = m[2];
    }
    var divider;
    if (this.props.i < 1)
      divider = React.createElement("hr", {className: "divider"});
    else
      divider = "";
    return (
      React.createElement("div", {className: "song"}, 
        React.createElement("a", {href: this.props.url, target: "_blank"}, 
          React.createElement("div", null, 
            React.createElement("span", {style: fin}), 
            React.createElement("div", {className: "song-title"}, 
              this.props.title
            )
          )
        ), 
        divider
      )
    )
  }
});



ReactDOM.render(
  React.createElement(HistList, null),
  document.getElementById("react")
);
