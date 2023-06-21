/*
	[ 원하는 시간동안 정밀하게 모션 처리하기 ]

  [ performance 객체 ]
  
  performance.now();
	- 브라우저가 로딩된 순간부터 해당 구문이 호출된 시점까지의 시간을 ms 단위로 반환
  - 1ms 단위로 정밀한 시간 계산이 가능
  - 정밀한 시간계산이 필요할 때 활용된다.

	progress
  - 특정시간동안 특정 수치값까지 변경
  - 변화량, 시간, 반복횟수
		-> 반복횟수는 제어가 불가능
		-> 고정된 반복횟수 안에서 변화량을 제어할 수 있다.
*/

const btn = document.querySelector('button');
const box = document.querySelector('#box');

// 1초 동안 500px 이동
btn.addEventListener('click', () => {
	anime(box, {
		prop: 'margin-left',
		value: 100,
		duration: 1000,
		callback: () => {
			// 모션이 끝났을 때 실행
			console.log('end');
		},
	});
});

function anime(selector, option) {
	const startTime = performance.now();
	console.log('시작시간: ', startTime);
	let count = 0;

	// 현재 selector 요소에 적용되어 있는 css 값을 가져온뒤, parseInt를 활용하여 숫자값으로 변경
	const currentValue = parseInt(getComputedStyle(selector)[option.prop]);
	if (option.value === currentValue) return;
	if (option.value > currentValue) requestAnimationFrame(plus);
	if (option.value < currentValue) requestAnimationFrame(minus);

	function plus(time) {
		/*
			console.log('각 반복사이클 마다의 누적시간: ', time);
			num++;
			box.style.marginLeft = num + 'px';
			if (num >= 60) {
				console.log('총 모션 시간: ', time - startTime);
				return;
			}
		*/

		// timelast: 각 사이클 마다 걸리는 누적시간
		let timelast = time - startTime;

		/*
			progress
			- 지정한 시간에 대한 진행률
			- 설정한 시간대비 현재 반복되는 모션 진행상황을 0 ~ 1 사이의 소수점으로 나타내주는 진행률 (100을 곱하면 백분율)
			- 매 반복횟수마다 현재 걸리는 누적 시간값을 전체시간으로 나누면 0 ~ 1 사이의 실수로 반환 가능
		*/
		let progress = timelast / option.duration;
		console.log('누적시간: ', timelast);
		console.log('진행률: ', progress);
		console.log('반복횟수: ', count++);

		// progress 값이 시작시 음수로 떨어지거나 종료시 1을 넘는 경우를 각각 0, 1로 보정
		// progress 값이 적용되는 targetValue 값도 딱 정수로 떨어지게 된다. (px 단위에서 중요!)
		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);

		// 종료시 callback 실행
		progress < 1 ? requestAnimationFrame(plus) : option.callback && option.callback();
		/*
			if (progress < 1) {
				requestAnimationFrame(move);
			} else {
				if (option.callback) option.callback();
			}
		*/

		// 고정된 반복횟수 안에서 제어할 수 있는것은 각 반복 사이클마다의 변화량이기 때문에 변경하려고 하는 targetValue 값에 진행률을 곱하여 변화량을 제어
		let result = currentValue + (option.value - currentValue) * progress;
		selector.style[option.prop] = result + 'px';
	}

	function minus(time) {
		let timelast = time - startTime;
		let progress = timelast / option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1 ? requestAnimationFrame(minus) : option.callback && option.callback();

		let result = currentValue - (currentValue - option.value) * progress;
		selector.style[option.prop] = result + 'px';
	}
}
