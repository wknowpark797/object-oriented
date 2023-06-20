// ES6
class Tab {
	constructor(selector, option) {
		this.tab = document.querySelector(selector);
		this.btns = this.tab.querySelectorAll(option.btns);
		this.boxs = this.tab.querySelectorAll(option.boxs);
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

new Tab('#tab', {
	btns: 'ul li',
	boxs: 'article div',
});
