/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Detect = require('ainojs-detect')
var FingerComponent = require('../../ainojs-react-finger/react-finger')

var App = React.createClass({
  getDefaultProps: function() {
    return {
      data: [
        'http://galleria.io/static/i/s2013/2m.jpg',
        'http://galleria.io/static/i/s2013/3m.jpg',
        'http://galleria.io/static/i/s2013/4m.jpg'
      ]
    }
  },
  onFinger: function(finger) {
    var style = finger.inner.style
    var support = Detect.translate3d
    finger.on('frame', function(e) {
      if (!support) {
        return style.left = e.position + 'px'
      }
      style.MozTransform = style.msTransform = style.transform = style.webkitTransform = 'translate3d(' + e.position + 'px,0,0)'
    })
  },
  render: function() {
    var items = this.props.data.map(function(item, i) {
      return <div className="item" style={{backgroundImage: 'url('+item+')'}} />
    })
    return (
      <FingerComponent onReady={this.onFinger}>
        {items}
      </FingerComponent>
    )
  }
})
React.renderComponent(App(), document.body)