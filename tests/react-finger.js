/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
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
  render: function() {
    var items = this.props.data.map(function(item, i) {
      return <div className="item" style={{backgroundImage: 'url('+item+')'}} />
    })
    return (
      <FingerComponent>
        {items}
      </FingerComponent>
    )
  }
})
React.renderComponent(App(), document.body)