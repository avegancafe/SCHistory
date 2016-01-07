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
     <span id="no-blur">
        <div>
          <div id="clear" onClick={this.clearHist}>Clear</div>
          {
            this.state.songList.reverse().map(function (el, i, arr) {
              return <Song key={i} imgStyle={el.img} title={el.title} url={el.url} i={i/(arr.length-1 || 1)}/>
            })
          }
        </div>
      </span>
    );
  }
});

var Song = React.createClass({
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
    console.log(this.props.imgStyle);
    while ( (m = p.exec(this.props.imgStyle)) !== null) {
      console.log(m[1], ":", m[2]);
      fin[toCamelCase(m[1])] = m[2];
    }
    var divider;
    if (this.props.i < 1)
      divider = <hr className="divider"/>;
    else
      divider = "";
    return (
      <div className="song">
        <a href={this.props.url} target="_blank">
          <div>
            <span style={fin}></span>
            <div className="song-title">
              {this.props.title}
            </div>
          </div>
        </a>
        {divider}
      </div>
    )
  }
});

ReactDOM.render(
  <HistList />,
  document.getElementById("react")
);
