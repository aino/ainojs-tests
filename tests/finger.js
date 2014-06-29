/** @jsx React.DOM */

var React = require('react')
var $ = require('jquery')
var Finger = require('../../ainojs-finger/finger')

/*CSS
*{margin:0;padding:0}
.container{position:absolute;width:100%;height:100%}
.container .items{}
.container .items .item{
  background-position:50% 50%;
  background-repeat:no-repeat; 
  background-size:cover;position:absolute;left:0;}
*/

var App = React.createClass({
  getInitialState: function() {
    return { width: 0 }
  },
  getDefaultProps: function() {
    return {
      data: [
        'http://galleria.io/static/i/s2013/2m.jpg',
        'http://galleria.io/static/i/s2013/3m.jpg',
        'http://galleria.io/static/i/s2013/4m.jpg'
      ]
    }
  },
  componentDidMount: function() {
    var container = this.getDOMNode()
    $(window).on('resize', this.setWidth)
    this.setWidth()
    var finger = Finger(container)
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
      </div>
    )
  }
})

React.renderComponent(App(), document.body)