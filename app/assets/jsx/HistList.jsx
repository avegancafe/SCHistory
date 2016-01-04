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
      <div>
        {this.state.songList.map(function (el, i, arr) {
          return <Song key={i} imgStyle={el.img} title={el.title} url={el.url}/>
        })}
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

