// ES6
class Tab {
	constructor(selector, option) {
		// 지역변수 설정 이유
		// defaults, result 값은 인스턴스 객체에 전달할 필요가 없어 지역변수 설정
		// this 객체에 특정 정보값을 복사하여 전달하는 구조이기 때문에 this로 복사해야 하는 정보값을 줄이는것을 권장
		// defaults, result 값은 btns와 boxs를 만들어주기 위한 값으로 인스턴스 객체에서 직접적으로 필요한 값이 아니기 때문에 지역변수로 설정
		// 생성자를 통해서 복사가 될 때마다 지연변수로 설정한 값은 static 하게 유지
		const defaults = { btns: 'ul li', boxs: 'article div' };
		const result = { ...defaults, ...option };

		this.tab = document.querySelector(selector);
		this.btns = this.tab.querySelectorAll(result.btns);
		this.boxs = this.tab.querySelectorAll(result.boxs);
		this.bindingEvent();
	}

	bindingEvent() {
		this.btns.forEach((btn, idx) => {
			btn.addEventListener('click', () => {
				[this.btns, this.boxs].forEach((btn) => this.activation(btn, idx));
			});
		});
	}

	activation(arr, idx) {
		arr.forEach((el) => el.classList.remove('on'));
		arr[idx].classList.add('on');
	}
}
