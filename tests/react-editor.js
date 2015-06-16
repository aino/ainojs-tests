/** @jsx React.DOM */

var React = require('react')
var EditorComponent = require('../../ainojs-react-editor/index')

/*HEAD
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.css">
<style type="text/css">
.content{outline:none}
</style>
*/

var App = React.createClass({
  onChange: function(html) {
    console.log(html)
  },
  render: function() {
    return (
      <EditorComponent className="content" onChange={this.onChange} html="<h2>foo</h2><p>bar</p>" />
    )
  }
})
React.renderComponent(App(), document.body)