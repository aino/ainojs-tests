/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Detect = require('ainojs-detect')
var Finger = require('../../ainojs-finger/finger')
var Animation = require('ainojs-animation')

/*CSS
*{margin:0;padding:0}
.container{position:absolute;width:100%;height:600px;overflow:hidden}
.container .items{}
.container .items .item{
  background-position:50% 50%;
  background-repeat:no-repeat; 
  background-size:cover;position:absolute;left:0;
}
.btn{position:absolute;top:20px;left:20px}
.btn.ll{left:200px}
#log{position:absolute;top:40px;left:20px;color:#fff;font:12px/16px sans-serif}
.tools{position:absolute;bottom:0;height:80px;background:rgba(0,0,0,.7);width:100%}
*/

var App = React.createClass({
  getInitialState: function() {
    return { 
      width: 0,
      topacity: 0,
      tapped: false
    }
  },
  tanimation: new Animation({ duration: 1000}),
  componentWillMount: function() {
    this.tanimation.on('frame', function(e) {
      this.setState({ topacity: e.value})
    }.bind(this))
  },
  getDefaultProps: function() {
    return {
      data: [
        'http://galleria.io/static/i/s2013/2m.jpg',
        'http://galleria.io/static/i/s2013/3m.jpg',
        'http://galleria.io/static/i/s2013/4m.jpg',
        'http://galleria.io/static/i/s2013/2m.jpg',
        'http://galleria.io/static/i/s2013/3m.jpg',
        'http://galleria.io/static/i/s2013/4m.jpg'
      ]
    }
  },
  componentDidMount: function() {
    var container = this.getDOMNode().firstChild
    $(window).on('resize', this.setWidth)
    this.setWidth()
    this.finger = new Finger(container)
    this.finger.on('frame', this.onFrame)
    this.finger.on('tap', this.tap)
  },
  onFrame: function(e) {
    
    var style = this.finger.inner.style

    if (!Detect.translate3d) {
      // this is actually faster than CSS3 translate
      return style.left = e.position + 'px'
    }
    return style.MozTransform = style.msTransform = style.transform = style.webkitTransform = 'translate3d(' + e.position + 'px,0,0)'
    
  },
  tap: function(e) {
    this.setState({ tapped: !this.state.tapped })
    this.tanimation.animateTo(Number(this.state.tapped))
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
      return <div className="item" style={{height: '100%', width:w, left: (i*w), backgroundImage: 'url('+item+')'}} />
    })
    var toolstyle = { opacity: this.state.topacity }

    return (
      <div>
        <div className="container" style={{ background: '#000', position:'relative' }}>
          <div className="items" style={{ height: '100%', width: (w*items.length) }}>
            {items}
          </div>
          <button className="btn" onClick={this.animateTo}>Animate to 1</button>
          <button className="btn ll" onClick={this.jumpTo}>Jump to 2</button>
          <div className="tools" style={toolstyle} />
        </div>
        <h1>Hello<br />You<br />The<br />Rock <br/>Steady<br />Crew</h1>
      </div>
    )
  }
})

React.renderComponent(App(), document.body)