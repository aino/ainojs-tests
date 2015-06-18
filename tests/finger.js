/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Detect = require('ainojs-detect')
var Finger = require('../../ainojs-finger/index')
var RequestFrame = require('raf')

/*HEAD
<style>
*{margin:0;padding:0}
.container{position:absolute;width:100%;height:600px;overflow:hidden}
.container .items{}
.container .items .item{
  background-position:50% 50%;
  background-repeat:no-repeat; 
  background-size:cover;position:absolute;left:0;top:0;
}
.btn{position:absolute;top:20px;left:20px}
.btn.ll{left:100px}
</style>
*/

var loops = []

;(function loop() {
  RequestFrame(loop)
  loops.forEach(function(fn) { fn() })
}())

var App = React.createClass({
  getInitialState: function() {
    return { 
      width: 0,
      height: 0,
      tapped: false
    }
  },
  x: 0,
  y: 0,
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
    $(window).on('resize', this.setWidthHeight)
    this.setWidthHeight()
    this.fingerX = new Finger(container, {
      items: 3
    })
    this.fingerX.on('change', this.onFrameX)
    loops.push(this.fingerX.run.bind(this.fingerX))
    /*
    this.fingerY = new Finger(container, {
      items: 3,
      vertical: true
    })
    this.fingerY.on('change', this.onFrameY)
    loops.push(this.fingerY.run)
    */
  },
  onFrameX: function(e) {

    this.x = e.position
    
    var style = this.fingerX.inner.style

    if (!Detect.translate3d) {
      // this is actually faster than CSS3 translate
      
      return style.left = e.position + 'px'
    }
    this.setTransform()
    
  },
  onFrameY: function(e) {

    this.y = e.position
    
    var style = this.fingerY.inner.style

    if (!Detect.translate3d) {
      // this is actually faster than CSS3 translate
      return style.top = e.position + 'px'
    }
    this.setTransform()
  },
  setTransform: function() {
    var style = this.fingerX.inner.style
    style.MozTransform = style.msTransform = style.transform = style.webkitTransform = 'translate3d('+this.x+'px,'+this.y+'px,0px)'
  },
  tap: function(e) {
    this.setState({ tapped: !this.state.tapped })
  },
  animateTo: function(e) {
    e.preventDefault()
    this.fingerX.animateTo(1)
  },
  jumpTo: function(e) {
    e.preventDefault()
    this.fingerX.jumpTo(2)
  },
  componentWillUnmount: function() {
    $(window).off('resize', this.setWidthHeight)
  },
  setWidthHeight: function() {
    this.setState({ 
      width: $(this.getDOMNode()).width(),
      height: $(this.getDOMNode()).height() 
    })
  },
  render: function() {
    var w = this.state.width
    var h = this.state.height
    var items = this.props.data.map(function(item, i) {
      var x = i%3
      var y = Math.floor(i/3)
      return <div className="item" style={{height: h, width:w, top: (y*h), left: (x*w), backgroundImage: 'url('+item+')'}} />
    })

    return (
      <div>
        <div className="container" style={{ background: '#000', position:'relative' }}>
          <div className="items" style={{ height: '100%', width: (w*items.length) }}>
            {items}
          </div>
          <button className="btn" onClick={this.animateTo}>Animate to 1</button>
          <button className="btn ll" onClick={this.jumpTo}>Jump to 2</button>
        </div>
      </div>
    )
  }
})

React.renderComponent(App(), document.body)