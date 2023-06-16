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
	console.log('this: ', this);

	this.el.addEventListener(
		'click',
		function () {
			console.log('this: ', this);

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
		}.bind(this)
	);
	/*
    일반 이벤트가 연결되어 있는 function 문 안쪽에서 this 값이 이벤트가 발생한 선택자로 변경되기 때문에 해당 값을 해당 function 문 외부에서 bind(this)로 고정

    [ 일반 함수에서 이벤트 사용 시 이슈 발생 ]
      이벤트 안쪽에서 this는 클릭 요소를 가리킨다.
      따라서 프로토타입 함수를 불러오지 못한다.
      -> bind 사용
  */
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
