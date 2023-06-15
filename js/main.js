/*
  [ 객체지향 사용 전 코드 ]
  
  const tit1 = document.querySelector('#title1');
  const tit2 = document.querySelector('#title2');

  changeSize(tit1, '100px');
  changeSize(tit2, '50px');
  changeColor(tit1, 'hotpink');
  changeColor(tit2, 'green');

  function changeSize(el, size) {
    el.style.fontSize = size;
  }
  function changeColor(el, color) {
    el.style.color = color;
  }
*/

/*
  [ ES5 - 객체지향 사용 ]
*/
function FontStyle(el) {
	this.el = document.querySelector(el);
}

FontStyle.prototype.changeSize = function (size) {
	this.el.style.fontSize = size;
};
FontStyle.prototype.changeColor = function (color) {
	this.el.style.color = color;
};

const copy1 = new FontStyle('#title1');
copy1.changeSize('100px');
copy1.changeColor('hotpink');

const copy2 = new FontStyle('#title2');
copy2.changeSize('50px');
copy2.changeColor('green');
