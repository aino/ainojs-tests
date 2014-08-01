
var EventMixin = require('../../ainojs-events/events')

function A() {}
EventMixin.call(A.prototype)
A.prototype.init = function() {
  this.trigger('tick')
}

var a = new A()

a.on('tick', function() {
  console.log('ERROR')
})

var b = new A()
b.on('tick', function() {
  console.log('OK')
})

b.init()