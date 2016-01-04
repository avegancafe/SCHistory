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
      console.log(items);
      that.setState({
        songList: items.SCHistory
      });
    });
  },

  componentWillMount: function () {
    this._getSongList();
  },

  render: function () {
    console.log("rendering");
   return (
      React.createElement("div", null, 
        this.state.songList.map(function (el, i, arr) {
          return React.createElement(Song, {key: i, imgStyle: el.img, title: el.title, url: el.url})
        })
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

  componentWillMount: function () {
    console.log("some song?");
  },
  render: function () {
    var fin = {
      "background-size": "cover"
    };
    var p = /([^;\s]+):([^;]*)/g;
    var m;
    while ( (m = p.exec(this.props.imgStyle)) !== null) {
      fin[m[1]] = m[2];
    }
    console.log("done:", fin);

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

