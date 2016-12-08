class ChangeElement {
	constructor(elem, nameClass, id, text, style) {
		this.elem = elem;
		this.nameClass = nameClass;
		this.id = id;
		this.text = text;
		this.style = style;
	}
	addElement(place) {
		this.elem = document.createElement(this.elem);
		this.elem.className = this.nameClass;
		console.log(this.style);
		this.elem.setAttribute('style', this.style);
		if (this.id.length > 0 ) {
			this.elem.id = this.id + Math.floor(Math.random() * 10000);
		}
		if ( this.text !== undefined ) {
			let placeElement = place.appendChild(this.elem);
			placeElement.innerHTML = this.text;
			return placeElement;
		} else {
			return place.appendChild(this.elem);
		}
	}
	addMoreElement(place) {
		var nameCreateElem = this.elem;
		for ( let i = 0; i < this.nameClass.length; i++ ) {
			nameCreateElem = document.createElement(this.elem);
			nameCreateElem.className = this.nameClass[i];
			place.appendChild(nameCreateElem);
			nameCreateElem = this.elem;
		}
	}
	deleteButton(newElem) {
		var span = document.createElement('span');
		span.setAttribute('onclick', 'deleteElem(this)')
		span.className = 'create__block__right-add-element-list';
	}
}
// class Block {
// 	constructor(elem, id) {
// 		this.elem = elem;
// 		this.id = id;
// 		this.arrayStyle = [['float', ['left', 'right']],['position', ['relative', 'absolute']]];
// 	}
// 	createElements() {
// 		var valueArray = this.elem.split(', ');
// 		var newElem = document.createElement(valueArray[0]);
// 		// newElem.id = this.id + Math.floor(Math.random() * 10000);
// 		if ( valueArray[0] === 'span') {
//
// 		} else {
// 			newElem.setAttribute('style', 'width: 50px;height: 40px;cursor:pointer;border: 2px solid ' + valueArray[1]);
// 		}
// 		newElem.className = 'create__block__right-blocks';
// 		document.querySelector('.create__block__right__result').appendChild(newElem);
// 		if ( valueArray[0] === 'span') {
// 			newElem.setAttribute('style', 'color: red;cursor:pointer;font-size:16px');
// 			newElem.innerHTML = 'Text';
// 		}
// 		return newElem;
// 	}
// 	control(newElem) {
// 		var span = document.createElement('span');
// 		span.setAttribute('onclick', 'deleteElem(this)')
// 		span.className = 'create__block__right-add-element-list';
// 		//newElem.appendChild(span);
// 	}
// 	controlStyle(kindElem, placeInsert) {
// 		for ( var i = 0; i < this.arrayStyle.length; i++ ) {
// 			var elem = document.createElement(kindElem);
// 			var elemPlace = document.querySelector('.' + placeInsert);
// 			elemPlace.appendChild(elem);
// 			var input = document.createElement('input');
// 			input.setAttribute('type', 'checkbox');
// 			elem.appendChild(input);
// 			var label = document.createElement('label');
// 			elem.appendChild(label).innerHTML = this.arrayStyle[i][0];
// 			var select = document.createElement('select');
// 			elem.appendChild(select);
// 			for ( var j = 0; j < this.arrayStyle[i][1].length; j++ ) {
// 				var option = document.createElement('option');
// 				option.setAttribute('value', this.arrayStyle[i][1][j]);
// 				select.appendChild(option).innerHTML = this.arrayStyle[i][1][j];
// 			}
// 		}
// 	}
// }


// var newBlock = new Block(document.querySelector('.create__block__right__select').value, 'block');
// newBlock.controlStyle('div', 'create__block__right__style');
document.querySelector('.create__block__right-add-element').addEventListener('click', function() {
	let place = document.querySelector('.create__block__right__result');
	let valueArray = document.querySelector('.create__block__right__select').value.split(', ')[0];
	console.log(valueArray);
	if ( valueArray == 'div' ) {
		var styleValue = 'width: 50px;height: 40px;cursor:pointer;border: 2px solid black';
		var textValue = '';
	} else if ( valueArray == 'span' ) {
		var styleValue = 'color: red;cursor:pointer;font-size:16px';
		var textValue = 'Text';
	}
	const newBlock = new ChangeElement(valueArray, 'create__block__right-blocks', 'ball', textValue, styleValue);
	newBlock.deleteButton(newBlock.addElement(place));
});
// function deleteElem(a) {
// 	a.parentElement.remove();
// }
function searchElementNew(elemName, elemSearch) {
	for ( var i = 0; i < elemName.length; i++ ) {
		console.log(elemName[i].substring(0, elemSearch.length));
		if ( elemName[i].substring(0, elemSearch.length) === elemSearch ) {
			elemName.splice(i, 1);
			return elemName;
		}
	}
	return elemName;
}
// document.querySelector('.create__block__right__style-button ').addEventListener('click', function() {
// 	var elemName = document.getElementById(testObj.id).getAttribute('style').split('; ');
// 	console.log(elemName);
// 	if ( testObj.id.length > 0 ) {
// 		var checkInput = document.querySelectorAll('.create__block__right__style div');
// 		for ( var i = 0; i < checkInput.length; i++ ) {
// 			if ( checkInput[i].children[0].checked === true ) {
// 				if ( checkInput[i].children[1].innerHTML == 'float' ) {
// 					//var result = searchElementNew(result, 'float');
// 					var result = searchElementNew(elemName, 'position');
// 					var result = searchElementNew(result, 'left');
// 					var result = searchElementNew(result, 'top');
// 					document.getElementById(testObj.id).removeAttribute("style");
// 					result.unshift(checkInput[i].children[1].innerHTML + ': ' + checkInput[i].children[2].value);
// 					document.getElementById(testObj.id).setAttribute('style', result.join(';'));
// 				} else {
// 					var result = searchElementNew(elemName, 'position');
// 					var result = searchElementNew(result, 'left');
// 					var result = searchElementNew(result, 'top');
// 					document.getElementById(testObj.id).removeAttribute("style");
// 					result.unshift(checkInput[i].children[1].innerHTML + ': ' + checkInput[i].children[2].value);
// 					document.getElementById(testObj.id).setAttribute('style', result.join(';'));
// 				}
// 			}
// 		}
// 	}
// });
