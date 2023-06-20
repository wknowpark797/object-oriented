/* ES5 */
var tab = document.querySelector('#tab');
var btns = tab.querySelectorAll('ul li');
var boxs = tab.querySelectorAll('article div');

btns.forEach(function (btn, idx) {
	btn.addEventListener('click', function () {
		// activation(btns, idx); // 버튼 활성화
		// activation(boxs, idx); // 박스 활성화
		[btns, boxs].forEach(function (el) {
			activation(el, idx);
		});
	});
});

function activation(arr, idx) {
	arr.forEach(function (item) {
		item.classList.remove('on');
	});
	arr[idx].classList.add('on');
}

/* 객체 지향 ES5 */
new Tab('#tab', {
	btns: 'ul li',
	boxs: 'article div',
});

function Tab(selector, option) {
	this.tab = document.querySelector(selector);
	this.btns = this.tab.querySelectorAll(option.btns);
	this.boxs = this.tab.querySelectorAll(option.boxs);
	console.log('constructor: ', this);

	this.btns.forEach(
		function (btn, idx) {
			// forEach 안쪽에서의 this는 인스턴스가 아닌 window 객체
			console.log('forEach: ', this);

			btn.addEventListener(
				'click',
				function () {
					// event 안쪽에서의 this는 이벤트 발생 대상
					console.log('event: ', this);

					[this.btns, this.boxs].forEach(
						function (el) {
							this.activation(el, idx);
						}.bind(this)
						// forEach 안쪽의 this 값을 인스턴스로 고정
					);
				}.bind(this)
				// event 안쪽의 this 값을 인스턴스로 고정
			);
		}.bind(this)
		// forEach 안쪽의 this 값을 인스턴스로 고정
	);
}

Tab.prototype.activation = function (arr, idx) {
	arr.forEach(function (el) {
		el.classList.remove('on');
	});
	arr[idx].classList.add('on');
};
