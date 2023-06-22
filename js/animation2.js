/* ES6 객체지향 */

class Anime {
	constructor(selector, option) {
		this.selector = selector;
		this.option = option;
		this.startTime = performance.now();
		this.currentValue = null;

		this.option.prop === 'scroll'
			? (this.currentValue = this.selector.scrollY)
			: (this.currentValue = parseFloat(getComputedStyle(this.selector)[this.option.prop]));

		this.isString = typeof this.option.value;
		if (this.isString === 'string') {
			const parentWidth = parseInt(getComputedStyle(this.selector.parentElement).width);
			const parentHeight = parseInt(getComputedStyle(this.selector.parentElement).height);

			const x = ['left', 'right', 'width'];
			const y = ['top', 'bottom', 'height'];
			const errProps = [
				'margin-left',
				'margin-right',
				'padding-left',
				'padding-right',
				'margin-top',
				'margin-bottom',
				'padding-top',
				'padding-bottom',
			];

			for (let cond of errProps)
				if (this.option.prop === cond)
					return console.error('margin, padding 값은 %로 모션처리할 수 없습니다.');

			for (let cond of x)
				this.option.prop === cond && (this.currentValue = (this.currentValue / parentWidth) * 100);
			for (let cond of y)
				this.option.prop === cond && (this.currentValue = (this.currentValue / parentHeight) * 100);

			this.option.value = parseFloat(this.option.value);
		}

		/*
			[ 프로토타입에 등록되어 있는 run 메서드에서 this객체를 읽지 못하는 이슈 ]
      run 메서드가 화살표 함수가 아니기 때문에 상위 스코프에 있는 인스턴스 this 객체를 참조하지 못한다.
      
			=> 해결 방안
			1. bind(this)를 사용하여 직접적으로 this 객체를 바인딩한다.
				- this.run.bind(this)
			2. run 메서드를 화살표 함수로 wrapping 처리한다.
				- () => this.run()
				- 화살표 함수 안쪽에 this 객체가 있어야 상위 코드블록의 this 객체값을 참조한다.
				- requestAnimationFrame의 time 파라미터를 직접 재전달 해준다.
					- 직계 콜백함수에만 파라미터를 전달하기 때문
    */
		this.option.value !== this.currentValue && requestAnimationFrame((time) => this.run(time));
	}

	run(time) {
		let timelast = time - this.startTime;
		let progress = timelast / this.option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);

		progress < 1
			? requestAnimationFrame((time) => this.run(time))
			: this.option.callback && this.option.callback();

		let result = this.currentValue + (this.option.value - this.currentValue) * progress;

		if (this.isString === 'string') this.selector.style[this.option.prop] = result + '%';
		else if (this.option.prop === 'opacity') this.selector.style[this.option.prop] = result;
		else if (this.option.prop === 'scroll') this.selector.scroll(0, result);
		else this.selector.style[this.option.prop] = result + 'px';
	}
}
