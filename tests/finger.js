/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Finger = require('../../ainojs-finger/finger')

/*CSS
*{margin:0;padding:0}
.container{position:absolute;width:100%;height:100%;overflow:hidden}
.container .items{}
.container .items .item{
  background-position:50% 50%;
  background-repeat:no-repeat; 
  background-size:cover;position:absolute;left:0;
}
.btn{position:absolute;top:20px;left:20px}
.btn.ll{left:200px}
#log{position:absolute;top:40px;left:20px;color:#fff;font:12px/16px sans-serif}
*/

var App = React.createClass({
  getInitialState: function() {
    return { width: 0 }
  },
  getDefaultProps: function() {
    return {
      data: [
        'http://192.168.43.227/i/Antelope-Canyon.jpg',
        'http://192.168.43.227/i/Bahamas-Aerial.jpg',
        'http://192.168.43.227/i/Beach.jpg',
        'http://192.168.43.227/i/Blue-Pond.jpg',
        'http://192.168.43.227/i/Bristle-Grass.jpg',
        'http://192.168.43.227/i/Brushes.jpg'
      ]
    }
  },
  componentDidMount: function() {
    var container = this.getDOMNode()
    $(window).on('resize', this.setWidth)
    this.setWidth()
    this.finger = Finger(container)
  },
  animateTo: function(e) {
    e.preventDefault()
    this.finger.animateTo(1)
  },
  jumpTo: function(e) {
    e.preventDefault()
    this.finger.jumpTo(2)
  },
  componentWillUnmount: function() {
    $(window).off('resize', this.setWidth)
  },
  setWidth: function() {
    this.setState({ width: $(this.getDOMNode()).width() })
  },
  render: function() {
    var w = this.state.width
    var items = this.props.data.map(function(item, i) {
      return <div className="item" style={{height: '100%', width:w, left: i*w, backgroundImage: 'url('+item+')'}} />
    })

    return (
      <div className="container" style={{ background: '#000', position:'relative' }}>
        <div className="items" style={{ height: '100%', width: (w*items.length) }}>
          {items}
        </div>
        <button className="btn" onClick={this.animateTo}>Animate to 1</button>
        <button className="btn ll" onClick={this.jumpTo}>Jump to 2</button>
        <div id="log" />
      </div>
    )
  }
})

React.renderComponent(App(), document.body)