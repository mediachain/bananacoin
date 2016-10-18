var koa = require('koa');
var app = koa();
var route = require('koa-route');

app.use(route.get('/price', price));

function *price() {
  this.body = (Math.random() * 9 + 1).toFixed(2);
};

app.listen(3000);
