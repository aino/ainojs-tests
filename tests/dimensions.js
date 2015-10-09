/** @jsx React.DOM */

var React = require('react')
var Dimensions = require('../../ainojs-dimensions')

var App = React.createClass({
  componentDidMount: function() {
    console.log(Dimensions(this.getDOMNode()))
  },
  render: function() {
    return <div style={{height:100}} />
  }
})
React.renderComponent(App(), document.body)