/** @jsx React.DOM */

var React = require('react')
var EditorComponent = require('../../ainojs-react-editor/react-editor')

/*CSS
.aino-editor,
.aino-editor *{box-sizing:border-box;}

.aino-editor .toolbar {
  position:absolute;
  display:block;
  background:#333;
  height:32px;
}

.aino-editor .toolbar button {
  height:32px;
  width:32px;
  text-align:center;
  border:none;
  border-left:1px solid #444;
  float:left;
  margin:0;
  background:transparent;
  color:#fff;
  font:12px/32px sans-serif;
}

.aino-editor .toolbar button.center{display:none}
.aino-editor .toolbar.heading button.center{display:block} 
.aino-editor .toolbar.heading button.bold,
.aino-editor .toolbar.heading button.italic,
.aino-editor .toolbar.heading button.list{display:none}

.aino-editor .toolbar .arr {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 7px 6px 7px;
  border-color: transparent transparent #333 transparent;
}
.aino-editor .toolbar.top .arr{
  border-width: 6px 7px 0 7px;
  border-color: #333 transparent transparent transparent;
}
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