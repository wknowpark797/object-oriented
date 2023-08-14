/* ES6 */

/*
	[ 캡슐화 ]
	- property 접근자
		- get: 프로퍼티의 key에 접근할 때 자동으로 호출되는 접근자
		- set: 프로퍼티의 value에 값이 담길 때 자동으로 호출되는 접근자

	- 클래스에 직접 값을 등록할 때
		- public: 클래스에 등록한 값을 접근해서 변경
		- static: 고정적인 상태로 값을 저장 (접근가능, 확인가능, 변경가능)
		- private: 접근 및 변경 불가능 (#키워드 사용)
*/

class Tab {
	/*
		- 인스턴스가 복사가 될 때마다 매번 메모리 할당을 할 필요가 없는 공통의 값을 클래스자체에 등록 처리
		- 클래스에 등록한 변수 앞쪽에 #을 붙이면 private 설정으로 변경되고 
			private로 등록된 변수는 외부에서 변경 불가능한 캡슐화 상태가 된다.
	*/
	#defaults = { btns: 'ul li', boxs: 'article div' };

	constructor(selector, option) {
		/*
			[ 지역변수 설정 ]
			- this 객체에 특정 정보값을 복사하여 전달하는 구조
				-> this로 복사해야 하는 정보값을 줄이는것을 권장
			- 생성자를 통해서 복사가 될 때마다 지역변수로 설정한 값은 static하게 유지된다.

			defaults와 result 값은 btns와 boxs를 만들어주기 위한 값
			-> 인스턴스 객체에서 직접적으로 필요한 값이 아니기 때문에 지역변수로 설정
		*/

		const result = { ...this.#defaults, ...option };

		this.tab = document.querySelector(selector);
		this.btns = this.tab.querySelectorAll(result.btns);
		this.boxs = this.tab.querySelectorAll(result.boxs);

		// 해당 생성자를 통해서 복사가 될 인스턴스 객체를 강제로 고정시켜서 추후 해당 인스턴스의 property값 변경 자체를 막는다.
		Object.freeze(this);

		// this.bindingEvent();
	}

	// tab 프로퍼티 key에 접근하는 순간 호출되는 함수
	get tab() {
		return this.value;
	}

	// tab 프로퍼티 value에 값을 담으려는 순간 호출되는 함수
	set tab(value) {
		this.value = value.tagName === 'SECTION' ? value : document.querySelector('#tab');
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
