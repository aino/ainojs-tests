/** @jsx React.DOM */

var React = require('react')
var EditorComponent = require('../../ainojs-react-editor/react-editor')

/*CSS
.content{margin: 100px}
*/

var App = React.createClass({
  onChange: function(html) {
    console.log(html)
  },
  render: function() {
    return (
      <EditorComponent className="content" onChange={this.onChange}>
        <h2>Lorem ipsum</h2>
        <p>Foo bar dorem</p>
      </EditorComponent>
    )
  }
})
React.renderComponent(App(), document.body)