/** @jsx React.DOM */

var React = require('react')
var Easing = require('ainojs-easing')
var Animation = require('../../ainojs-animation/index')

var App = React.createClass({

  getInitialState: function() {
    return {
      left: 0,
      top: 0,
      rotate: 1,
      scale: 1,
      toggler: true
    }
  },

  componentWillMount: function() {
    this.animation = new Animation({
      duration: 5000,
      easing: Easing('easeOutExpo')
    })
    var obj = this.getInitialState()
    delete obj.toggler
    this.animation.on('frame', this.onFrame)
    this.animation.init(obj)
  },

  componentDidMount: function() {
    this.node = this.refs.div.getDOMNode()
  },

  onFrame: function(e) {
    Animation.transform(this.node, e.values)
    /*
    this.setState({
      left: e.values.left,
      top: e.values.top,
      opacity: e.values.opacity
    })
    */
  },

  move: function() {
    this.animation.animateTo({
      top: Math.floor(Math.random()*500),
      left: Math.floor(Math.random()*1000),
      scale: Math.random(),
      rotate: Math.random()*360
    })
  },

  update: function() {
    this.animation.updateTo({
      top: Math.floor(Math.random()*500),
      left: Math.floor(Math.random()*1000),
      scale: Math.random(),
      rotate: Math.random()*360
    })
  },

  pause: function() {
    this.animation.pause()
  },

  resume: function() {
    this.animation.resume()
  },

  destroy: function() {
    this.animation.destroy()
  },

  render: function() {
    var style = {
      width: 100,
      height: 100,
      position: 'absolute',
      background: '#000',
      top: 50
    }
    return (
      <div>
        <div ref="div" style={style} />
        <button style={{marginLeft: 400}} onClick={this.move}>Move</button>
        <button onClick={this.update}>Update</button>
        <button onClick={this.pause}>Pause</button>
        <button onClick={this.resume}>Resume</button>
        <button onClick={this.destroy}>Destroy</button>
      </div>
    )
  }
})

React.renderComponent(App(), document.body)