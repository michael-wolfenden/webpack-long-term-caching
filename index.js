var _ = require('lodash');

var h1 = document.createElement('h1');
h1.innerText = _.VERSION;
document.body.appendChild(h1);