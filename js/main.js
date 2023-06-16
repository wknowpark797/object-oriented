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
function FontStyle(el, option) {
	this.el = document.querySelector(el);

	if (!option) {
		this.changeSize('30px');
		this.changeColor('gray');
		return;
	}

	// 무조건 실행되어야 하는 요소를 생성자 함수 내부에서 호출
	if (option.type === 'all') {
		this.changeSize(option.size);
		this.changeColor(option.color);
	}
	if (option.type === 'size') {
		this.changeSize(option.size);
	}
	if (option.type === 'color') {
		this.changeColor(option.color);
	}
}

FontStyle.prototype.changeSize = function (size) {
	this.el.style.fontSize = size;
};
FontStyle.prototype.changeColor = function (color) {
	this.el.style.color = color;
};

// 생성자 함수로부터 인스턴스 복사 시 자동으로 특정 메서드가 호출되도록 처리
new FontStyle('#title1', {
	type: 'all',
	size: '100px',
	color: 'hotpink',
});
new FontStyle('#title2', {
	type: 'color',
	color: 'green',
});
new FontStyle('#title3');

/*
  const copy1 = new FontStyle('#title1');
  copy1.changeSize('100px');
  copy1.changeColor('hotpink');

  const copy2 = new FontStyle('#title2');
  copy2.changeSize('50px');
  copy2.changeColor('green');
*/
