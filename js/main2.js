/*
  [ 객체지향 ES6 코드 개선 ]
*/

class FontStyle {
	// 생성자 함수
	constructor(el, option) {
		this.el = document.querySelector(el);

		// 내부적으로 default 옵션 객체 생성
		this.default = { type: 'all', color: 'gray', size: '30px' };

		// default 객체에 옵션으로 넘어오는 객체를 덮어쓰기 하여 합침
		// 내부에는 합쳐진 옵션 객체를 활용
		this.result = { ...this.default, ...option };

		this.bindingEvent();
	}

	bindingEvent() {
		this.el.addEventListener('click', () => {
			if (this.result.type === 'all') {
				this.changeSize(this.result.size);
				this.changeColor(this.result.color);
			}
			if (this.result.type === 'size') this.changeSize(this.result.size);
			if (this.result.type === 'color') this.changeColor(this.result.color);
		});
	}

	changeSize(size) {
		this.el.style.fontSize = size;
	}

	changeColor(color) {
		this.el.style.color = color;
	}
}

new FontStyle('#title1');
new FontStyle('#title2', { color: 'orange' });
