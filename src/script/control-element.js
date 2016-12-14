// var bannerSpace = document.querySelector('.main__place');
﻿var bannerSpace = document.body;
//var checkClassName = ['new__block-left-up', 'new__block-right-up', 'new__block-right-down', 'new__block-left-down'];
var checkClassName = ['new__block-right-up', 'new__block-right-down'];
bannerSpace.onmousedown = function(e) {
	if ( e.target.className === 'close__textarea' ) {
		testCheck = true;
		return closeInput(e.target);
	}
	testCheck = false;
	if ( e.target.localName == 'textarea' ) {
		return;
	}
	if ( e.target.localName === 'canvas' ) return;
	if ( e.target.className === 'main__place-garbage' ) return;
	var checkClass = false;
	bannerElement = document.getElementById(e.target.id);
	if ( bannerElement === null ) {
		bannerElement = document.getElementById(e.target.parentElement.parentElement.id);
	}
	var controlChange = e.target.className;
	for ( let i = 0; i < checkClassName.length; i++ ) {
		if ( e.target.className == checkClassName[i] ) {
			checkClass = true;
			break;
		}
	}
	if ( checkClass === false && (e.target.parentElement.className === 'main__place__work' || e.target.parentElement.parentElement.className === 'main__place__work') && e.target.localName !== 'span' ) {
		if ( document.querySelector('.new__block') !== null )  {
			document.querySelector('.new__block').remove();
		}
		const changeControl = new ChangeElement('div', 'new__block','', '');
		let changeElements = changeControl.addElement(e.target);
		const underChangeElement = new ChangeElement('a', [
			['new__block-right-up', ''],
			['new__block-right-down', '']
		]);
		underChangeElement.addMoreElement(changeElements);
	}
	if (bannerElement === null && checkClass === false) return;
	var widthValue = Math.floor(parseInt(bannerElement.style.width));
	var heightValue = Math.floor(parseInt(bannerElement.style.height));
	var coords = getCoords(bannerElement);
	var shiftX = e.pageX - coords.left;
	var shiftY = e.pageY - coords.top;
	var changeWidth = Math.floor(shiftX);
	var changeHeight = Math.floor(shiftY);
	bannerElement.style.position = 'absolute';
	document.body.appendChild(bannerElement);
	moveAt(e, checkClass);

	if ( bannerElement.localName === 'canvas' ) {
		bannerElement.style.zIndex = 2;
	} else {
		bannerElement.style.zIndex = 3;
	}

	function moveAt(e, checkClass) {
		let classNameCheck = e.target.className;
		if ( checkClass === true && classNameCheck == 'new__block-right-up') {
			bannerElement.style.width = e.pageX - coords.left + 'px';
		} else if ( checkClass === true && classNameCheck == 'new__block-right-down') {
			bannerElement.style.height = e.pageY - coords.top + 'px';
		} else {
			bannerElement.style.left = e.pageX - shiftX + 'px';
			bannerElement.style.top = e.pageY - shiftY + 'px';
		}
	}

	document.onmousemove = function(e) {
		testCheck = true;
		moveAt(e, checkClass);
	};
	bannerSpace.onmouseup = function(e) {
		if ( e.target.localName == 'textarea' ) {
			return;
		}
		try {
			document.onmousemove = null;
			bannerElement.onmouseup = null;
			var a = bannerElement.offsetLeft;
			var b = bannerElement.offsetTop;
			bannerElement.style.display = 'none';
			searchElement(a, b, bannerElement);
			bannerElement.style.display = 'block';
			if ( testCheck === false ) {
				insertText(e.target);
			}
		}	catch(err) {

		}
	};
	if ( e.target.id.length === 0 ) {
		document.querySelector('.info__block').innerHTML = e.target.parentElement.id;
	} else {
		document.querySelector('.info__block').innerHTML = e.target.id;
	}
}
bannerSpace.ondragstart = function() {
	return false;
};
function getCoords(elem) { // кроме IE8-
	var box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}
function searchElement(lengthX, lengthY, elem) {
	// if ( document.elementFromPoint(lengthX, lengthY).className == 'main__place-garbage' ) {
	// 	bannerElement.remove();
	// 	return;
	// }
	// console.log(document.elementFromPoint(lengthX, lengthY));
	// var testElem = document.elementFromPoint(lengthX, lengthY);
	document.querySelector('.main__place__work').appendChild(elem);
	testObj.id = elem.id;
}
var testObj = {
	id: ''
}
// window.onload = function() {
// 	var c = document.getElementById("myCanvas");
// 	var img = document.getElementById("scream");
// 	c.setAttribute('width', parseInt(getComputedStyle(img).width));
// 	c.setAttribute('height', parseInt(getComputedStyle(img).height));
// 	var ctx = c.getContext("2d");
// 	ctx.drawImage(img, 0, 0);
// 	img.style.display = 'none';
// }

function insertText(e) {
	if ( e.localName === 'span' ) {
		let spanText = e.innerHTML;
		e.innerHTML = '';
		let div = document.createElement('div');
		div.setAttribute('style', 'position: relative; float:left');
		e.appendChild(div);
		let input = document.createElement('textarea');
		div.appendChild(input).value = spanText;
		// var span = document.createElement('span');
		// span.className = 'close__textarea';
		// // span.setAttribute('style','');
		// div.appendChild(span);
		const insertTextarea = new ChangeElement('span', 'close__textarea', '', '');
		insertTextarea.addElement(div);
	}
}
function closeInput(e) {
	let widthSpan = getComputedStyle(e.parentElement.children[0]).width;
	e.parentElement.parentElement.style.width = widthSpan;
	e.parentElement.parentElement.innerHTML = e.parentElement.children[0].value;
}
document.querySelector('.view__work-place').addEventListener('click', function(e) {
	let workPlace = document.querySelector('.main__place__work');
	if (e.target.className === 'view__work-place-vert' ) {
		workPlace.style.width = '525px';
		workPlace.style.height = '700px';
	} else if (e.target.className === 'view__work-place-horiz' ) {
		workPlace.style.width = '800px';
		workPlace.style.height = '450px';
	}
});
