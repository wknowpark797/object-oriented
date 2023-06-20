// ES5
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
