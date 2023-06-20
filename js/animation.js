/*
  [ performance 객체 ]
  
  performance.now();
	- 브라우저가 로딩된 순간부터 해당 구문이 호출된 시점까지의 시간을 ms 단위로 반환
  - 1ms 단위로 정밀한 시간 계산이 가능
  - 정밀한 시간계산이 필요할 때 활용된다.

  특정시간동안 특정 수치값까지 변경
  - 변화량, 시간, 반복횟수
		-> 반복횟수는 제어가 불가능
		-> 고정된 반복횟수 안에서 변화량을 제어할 수 있다.
*/

// 1초 동안 500px 이동
const btn = document.querySelector('button');
const box = document.querySelector('#box');
const speed = 1000;
const targetValue = 500;
let num = 0;
let startTime = 0;
let count = 0;

btn.addEventListener('click', () => {
	startTime = performance.now();
	console.log('시작시간: ', startTime);

	requestAnimationFrame(move);
});

function move(time) {
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
		- 설정한 시간대비 현재 반복되는 모션 진행상황을 0 ~ 1 사이의 소수점으로 나타내주는 진행률 (100을 곱하면 백분율)
		- 매 반복횟수마다 현재 걸리는 누적 시간값을 전체시간으로 나누면 0 ~ 1 사이의 실수로 반환 가능
	*/
	let progress = timelast / speed;
	console.log('누적시간: ', timelast);
	console.log('진행률: ', progress);
	console.log('반복횟수: ', count++);

	if (progress < 1) {
		requestAnimationFrame(move);
	}
}
