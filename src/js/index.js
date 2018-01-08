import * as cao from './componentJs/print.js';

import "../css/index.css";

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!!!!';
  btn.onclick = cao.cube;

  element.appendChild(btn);

  return element;
}
document.body.appendChild(component());

let a=10
var sym = Symbol();

// var promise = new Promise();
$(function(){
	alert(a)
	let json={}
	Object.assign(json,{a:1});
	console.log(json)
})
if (module.hot) {
   module.hot.accept()
}