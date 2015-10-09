/** @jsx React.DOM */

var React = require('react')
var Ajax = require('../../ainojs-ajax')

var url = 'http://en.wikiquote.org/w/api.php'

var App = React.createClass({
  getInitialState: function() {
    return {
      response: 'Loading JSONP'
    }
  },
  componentDidMount: function() {
    var that = this
    Ajax.jsonp(url, {
      action: 'opensearch',
      search: 'einstein'
    }).then(function(response) {
      console.log(response)
      Ajax.jsonp(url, {
        action: 'query',
        format: 'json',
        redirects: "",
        titles: response[1].join('|')
      }).then(function(response) {
        console.log(response)
        var pageid = Object.keys(response.query.pages)[0]
        Ajax.jsonp(url, {
          action: 'parse',
          format: 'json',
          pageid: pageid//response.query.pages[0].pageid
        }).then(function(response) {
          console.log(response)
          that.setState({response: response.parse.text['*']})
        })
      })

    }.bind(this)).catch(function(e) {
      console.error(e)
    })
  },
  render: function() {
    return <div dangerouslySetInnerHTML={{__html: this.state.response }} />
  }
})
React.renderComponent(App(), document.body)