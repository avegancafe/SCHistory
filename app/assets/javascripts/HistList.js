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

  render: function () {
   return (
      React.createElement("div", null, 
        React.createElement("div", {id: "clear", onClick: this.clearHist}, "Clear"), 
        this.state.songList.map(function (el, i, arr) {
          return React.createElement(Song, {key: i, imgStyle: el.img, title: el.title, url: el.url})
        }).reverse()
      )
    );
  }
});

var Song = React.createClass({displayName: "Song",
  getDefaultProps: function () {
    return {
      imgStyle: "",
      url: "",
      title: ""
    }
  },

  render: function () {
    var fin = {
      "backgroundSize": "cover"
    };
    var p = /([^;\s]+):([^;]*)/g;
    var m;
    while ( (m = p.exec(this.props.imgStyle)) !== null) {
      fin[toCamelCase(m[1])] = m[2];
    }

    return (
      React.createElement("div", {className: "song"}, 
        React.createElement("span", {style: fin}), 
        React.createElement("div", {className: "song-title"}, 
          React.createElement("a", {href: this.props.url, target: "_blank"}, 
            this.props.title
          )
        )
      )
    )
  }
});

ReactDOM.render(
  React.createElement(HistList, null),
  document.getElementById("react")
);

