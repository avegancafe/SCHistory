function toCamelCase(str) { return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

function clearMem() {
  chrome.storage.local.remove("SCHistory");
}

var HistList = React.createClass({
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
      <div>
        <div id="clear" onClick={this.clearHist}>Clear</div>
        {this.state.songList.map(function (el, i, arr) {
          return <Song key={i} imgStyle={el.img} title={el.title} url={el.url}/>
        }).reverse()}
      </div>
    );
  }
});

var Song = React.createClass({
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
      <div className="song">
        <span style={fin}></span>
        <div className="song-title">
          <a href={this.props.url} target="_blank">
            {this.props.title}
          </a>
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <HistList />,
  document.getElementById("react")
);

