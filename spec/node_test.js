var signal = require('../src/nanosignal');

var happened = signal();
var listener = function() { console.log('happened listener')};
happened.add(listener);
happened();
happened();
happened.remove(listener);
happened();