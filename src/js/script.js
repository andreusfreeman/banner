function createBanner() {
	var banner = document.querySelector('.create__block__left').children;
	var styleArray = ['width', 'height', 'left', 'top', 'background'];

	for ( let j = 0; j < banner.length; j++ ) {
		if ( banner[j].localName !== 'canvas' ) {
			var resultArray = [];
			var attrsArray = banner[j].getAttribute('style').split(';');
			attrsArray.map(function(item) {
				for ( let i = 0; i < styleArray.length; i++ ) {
					if ( item.search(styleArray[i]) >= 0) {
						resultArray[i] = parseInt(item.split(':')[1]);
					}
				}
			})
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			//insert image
			if ( banner[j].src !== undefined) {
				var img = banner[j];
				ctx.drawImage(img, resultArray[2], resultArray[3]);
			}
			if ( banner[j].localName !== 'span' ) {
				if ( banner[j].style.background.length !== 0 && banner[j].style.background !== 'none' ) {
					ctx.beginPath();
					ctx.globalAlpha = getComputedStyle(banner[j]).opacity;
					ctx.rect(resultArray[2], resultArray[3], resultArray[0], resultArray[1]);
					ctx.fillStyle = banner[j].style.background;
					ctx.fill();
				}
			}

			//insert text

			var textInsert = banner[j];
			if ( textInsert !== undefined ) {
				if ( textInsert.innerHTML.length > 0 ) {
					/*var gradient=ctx.createLinearGradient(0,0,c.width,0);
					gradient.addColorStop("0","magenta");
					gradient.addColorStop("0.5","blue");
					gradient.addColorStop("1.0","red");
					// Fill with gradient
					ctx.fillStyle=gradient;
					var rt = parseInt(getComputedStyle(textInsert).fontSize);
					ctx.font = "16px Verdana";
					ctx.fillStyle = "red";
					ctx.fillText(textInsert.innerHTML, resultArray[2], resultArray[3] + rt , resultArray[0]);*/
					function wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight) {
						var words = text.split(" ");
						var countWords = words.length;
						var line = "";
						for (var n = 0; n < countWords; n++) {
							var testLine = line + words[n] + " ";
							var testWidth = ctx.measureText(testLine).width;
							if (testWidth > maxWidth) {
								ctx.fillText(line, marginLeft, marginTop);
								line = words[n] + " ";
								marginTop += lineHeight;
							}
							else {
								line = testLine;
							}
						}
						ctx.fillText(line, marginLeft, marginTop);
					}
					var rt = parseInt(getComputedStyle(textInsert).fontSize);
					var maxWidth = parseInt(getComputedStyle(textInsert).width);
					var lineHeight = parseInt(getComputedStyle(textInsert).lineHeight);
					var fontFamily = getComputedStyle(textInsert).fontFamily;
					var marginLeft = resultArray[2];
					var marginTop = resultArray[3] + rt;
					var text = textInsert.innerHTML;
					ctx.font = textInsert.style.fontSize + " " + fontFamily;
					ctx.fillStyle =  getComputedStyle(textInsert).color;
					wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight);
				}
			}
		}
	}
}

class CreateDiv {
	constructor(elem, inElem, varText, typeInput, idName, nameClass, modelName, propertyElem) {
		this.elem = elem;
		this.inElem = inElem;
		this.varText = varText;
		this.typeInput = typeInput;
		this.idName = idName;
		this.nameClass = nameClass;
		this.modelName = modelName;
		this.propertyElem = propertyElem;
	}
	NewDiv() {
		var inputPlace = document.querySelector(this.inElem);
		if ( this.elem === 'div' ) {
			var divForAll = document.createElement('div');
			var spanControlValueUp = document.createElement('span');
			spanControlValueUp.className = 'control-panel__control-value-up';
			spanControlValueUp.setAttribute('onclick', 'valueUp(this)');
			var spanControlValueDown = document.createElement('span');
			spanControlValueDown.className = 'control-panel__control-value-down';
			spanControlValueDown.setAttribute('onclick', 'valueDown(this)');
			var spanControl = document.createElement('span');
			spanControl.setAttribute('style', 'width: 100px; margin-left: 10px');
			var element = document.createElement(this.elem);
			element.setAttribute('style', 'overflow: hidden; padding: 10px');
			if ( this.nameClass === undefined) {
			} else {
				element.className = this.nameClass;
			}
			if (this.elem === 'input') {
				element.setAttribute('type', this.typeInput);
				element.setAttribute('style', 'flex: 1');
				element.id = this.idName;
				element.value = 10;
			}
			if (this.elem === 'label') {
				element.setAttribute('for', this.idName);
			}
			if (this.elem === 'input') {
				divForAll.appendChild(spanControlValueDown);
			}
			inputPlace.appendChild(element);
			element.appendChild(spanControlValueDown);
			element.appendChild(spanControlValueUp);
			element.appendChild(spanControl).innerHTML = this.varText;
			if (this.elem === 'input') {
				divForAll.appendChild(spanControlValueUp);
			}
		} else if ( this.elem === 'select' ) {
			var divForAll = document.createElement('div');
			var input = document.createElement('input');
			input.setAttribute('type', 'checkbox');
			input.setAttribute('onchange', 'changeValuePosition(this)');
			divForAll.setAttribute('style', 'overflow: hidden; padding: 10px');
			divForAll.className = this.nameClass;
			var select = document.createElement('select');
			select.setAttribute('onchange', 'changeValuePosition(this)');
			inputPlace.appendChild(divForAll).innerHTML = this.varText;
			divForAll.appendChild(select);
			for ( var i = 0; i < this.propertyElem.length; i++ ) {
				var option = document.createElement('option');
				option.setAttribute('value', this.propertyElem[i]);
				select.appendChild(option).innerHTML = this.propertyElem[i];
			}
			divForAll.appendChild(input);
		}
	}
}
var controlArray = [
	['div', 'change-width', 'changeWidth', 'Width', '.control-panel__control-block',''],
	['div', 'change-padding', 'changePadding', 'Padding', '.control-panel__control-block',''],
	// ['div', 'change-margin', 'changeMargin', 'Margin', '.control-panel__control-block',''],
	['div', 'change-radius', 'changeRadius', 'Radius', '.control-panel__control-block',''],
	// ['div', 'change-shadow', 'changeShadow', 'Shadow', '.control-panel__control-block',''],
	// ['div', 'change-shadow-up', 'changeShadowUp', 'Shadow Up', '.control-panel__control-block',''],
	// ['div', 'change-shadow-down', 'changeShadowDown', 'Shadow Down', '.control-panel__control-block',''],
	['div', 'change-fontsize', 'changeFontSize', 'Font-Size', '.control-panel__control-text',''],
	['div', 'change-lineheight', 'changeLineHeight', 'Line-Height', '.control-panel__control-text'],
	// ['div', 'change-shadow-down-text', 'changeShadowTextDown', 'Shadow Text Down', '.control-panel__control-text',''],
	// ['div', 'change-shadow-up-text', 'changeShadowTextUp', 'Shadow Text Up', '.control-panel__control-text',''],
	// ['div', 'change-shadow-text', 'changeShadowText', 'Shadow Text', '.control-panel__control-text',''],
	// ['select', 'change-float', 'changeFloat', 'Float', '.control-panel__control-block',['left', 'right']],
	// ['select', 'change-position', 'changePosition', 'Position', '.control-panel__control-block',['absolute', 'relative', 'fixed']],
	// ['div', 'change-top-position', 'changeTopPosition', 'Top Position', '.control-panel__control-block',''],
	//['div', 'change-bottom-position', 'changeBottomPosition', 'Bottom Position', '.control-panel__control-block',''],
	// ['div', 'change-left-position', 'changeLeftPosition', 'Left Position', '.control-panel__control-block',''],
	//['div', 'change-right-position', 'changeRightPosition', 'Right Position', '.control-panel__control-block',''],
	['div', 'change-opacity', 'changeOpacity', 'Opacity', '.control-panel__control-block',''],
	// ['div', 'change-z-index', 'changeZIndex', 'Z-index', '.control-panel__control-block','']
];
function showControlPanel() {
	if ( document.querySelector('.control-panel__control-block').children.length == 0 ) {
		for ( let i = 0; i < controlArray.length; i++) {
			const controlElement = new CreateDiv(controlArray[i][0], controlArray[i][4], controlArray[i][3], '', '', controlArray[i][1], controlArray[i][2], controlArray[i][5]);
			controlElement.NewDiv();
		}
		const changeControl = new ChangeElement('ul', 'control-panel__control-color__list','', '');
		let placeForColor = document.querySelector('.control-panel__control-color');
		let changeElements = changeControl.addElement(placeForColor);
		const underChangeElement = new ChangeElement('li', [
			['control-panel__control-color__item', 'none'],
			['control-panel__control-color__item', 'red'],
			['control-panel__control-color__item', 'yellow'],
			['control-panel__control-color__item', 'green'],
			['control-panel__control-color__item', 'black'],
			['control-panel__control-color__item', 'white']
		]);

		underChangeElement.addMoreElement(changeElements);
	} else {
		//document.querySelector('.control-panel__control-block').children.remove();
	}
}
function changeValue(classNameElement, stepEl, elem){
	var t = elem;
	var computedStyle = getComputedStyle(t);
	if (computedStyle.boxShadow === 'none') {
		t.style.boxShadow = "0px 0px 0px blue";
	}
	if (computedStyle.textShadow === 'none') {
		t.style.textShadow = "0px 0px 0px blue";
	}
	if (classNameElement === 'change-width') {
		t.style.width = (parseInt(t.offsetWidth) + stepEl) + 'px';
	} else if (classNameElement === 'change-radius') {
		if (computedStyle.borderRadius.length > 0) {
			t.style.borderRadius = (parseInt(computedStyle.borderRadius) + stepEl) + 'px';
		} else {
			t.style.borderRadius.length > 0 ? t.style.borderRadius = (parseInt(t.style.borderRadius) + stepEl) + 'px' : t.style.borderRadius = stepEl + 'px';
		}
	} else if (classNameElement === 'change-padding') {
		if (computedStyle.padding.length > 0) {
			t.style.padding = (parseInt(computedStyle.padding) + stepEl) + 'px';
		} else {
			t.style.padding.length > 0 ? t.style.padding = (parseInt(t.style.padding) + stepEl) + 'px' : t.style.padding = stepEl + 'px';
		}
	} else if (classNameElement === 'change-shadow-down' || classNameElement === 'change-shadow-up' || classNameElement === 'change-shadow') {
			classNameElement === 'change-shadow-down' ? shadowDown = parseInt(computedStyle.boxShadow.split(' ')[3]) + stepEl : shadowDown = parseInt(computedStyle.boxShadow.split(' ')[3]);
			classNameElement === 'change-shadow-up' ? shadowUp = parseInt(computedStyle.boxShadow.split(' ')[4]) + stepEl : shadowUp = parseInt(computedStyle.boxShadow.split(' ')[4]);
			classNameElement === 'change-shadow' ? shadow = parseInt(computedStyle.boxShadow.split(' ')[5]) + stepEl : shadow = parseInt(computedStyle.boxShadow.split(' ')[5]);
			t.style.boxShadow = shadowDown + "px " + shadowUp + "px " + shadow + "px blue";
	} else if (classNameElement === 'change-margin') {
		if (computedStyle.margin.length > 0) {
			t.style.margin = (parseInt(computedStyle.margin) + stepEl) + 'px';
		} else {
			t.style.margin.length > 0 ? t.style.margin = (parseInt(t.style.margin) + stepEl) + 'px' : t.style.margin = stepEl + 'px';
		}
	} else if (classNameElement === 'change-fontsize') {
		t.style.fontSize = (parseInt(computedStyle.fontSize) + stepEl) + 'px';
	} else if (classNameElement === 'change-lineheight') {
		if (computedStyle.lineHeight.length > 0) {
			t.style.lineHeight = (parseInt(computedStyle.lineHeight) + stepEl) + 'px';
		} else {
			t.style.lineHeight.length > 0 ? t.style.lineHeight = (parseInt(t.style.lineHeight) + stepEl) + 'px' : t.style.lineHeight = stepEl + 'px';
		}
	} else if (classNameElement === 'change-shadow-down-text' || classNameElement === 'change-shadow-up-text' || classNameElement === 'change-shadow-text') {
		classNameElement === 'change-shadow-down-text' ? shadowDown = parseInt(computedStyle.textShadow.split(' ')[3]) + stepEl : shadowDown = parseInt(computedStyle.textShadow.split(' ')[3]);
		classNameElement === 'change-shadow-up-text' ? shadowUp = parseInt(computedStyle.textShadow.split(' ')[4]) + stepEl : shadowUp = parseInt(computedStyle.textShadow.split(' ')[4]);
		classNameElement === 'change-shadow-text' ? shadow = parseInt(computedStyle.textShadow.split(' ')[5]) + stepEl : shadow = parseInt(computedStyle.textShadow.split(' ')[5]);
		t.style.textShadow = shadowDown + "px " + shadowUp + "px " + shadow + "px blue";
	}  else if (classNameElement === 'change-float') {
		if ( stepEl !== null ) {
			t.style.float = stepEl;
		} else {
			t.style.float = 'none';
		}
	}  else if (classNameElement === 'change-position') {
		if ( stepEl !== null ) {
			t.style.position = stepEl;
		} else {
			t.style.position = 'static';
		}
	} else if (classNameElement === 'change-top-position') {
		if (computedStyle.top.length > 0) {
			t.style.top = (parseInt(computedStyle.top) + stepEl) + 'px';
		} else {
			t.style.top.length > 0 ? t.style.top = (parseInt(t.style.top) + stepEl) + 'px' : t.style.top = stepEl + 'px';
		}
	}	/*else if (classNameElement === 'change-bottom-position') {
		if (computedStyle.bottom.length > 0) {
			t.style.bottom = (parseInt(computedStyle.bottom) + stepEl) + 'px';
		} else {
			t.style.bottom.length > 0 ? t.style.bottom = (parseInt(t.style.bottom) + stepEl) + 'px' : t.style.bottom = stepEl + 'px';
		}
	}*/	else if (classNameElement === 'change-left-position') {
		if (computedStyle.left.length > 0) {
			t.style.left = (parseInt(computedStyle.left) + stepEl) + 'px';
		} else {
			t.style.left.length > 0 ? t.style.left = (parseInt(t.style.left) + stepEl) + 'px' : t.style.left = stepEl + 'px';
		}
	}	/*else if (classNameElement === 'change-right-position') {
		if (computedStyle.right.length > 0) {
			t.style.right = (parseInt(computedStyle.right) + stepEl) + 'px';
		} else {
			t.style.right.length > 0 ? t.style.right = (parseInt(t.style.right) + stepEl) + 'px' : t.style.right = stepEl + 'px';
		}
	}	*/
		else if (classNameElement === 'change-opacity') {
		stepEl = stepEl/50;
		if (computedStyle.opacity.length > 0) {
			t.style.opacity = (computedStyle.opacity*1 + stepEl);
		} else {
			t.style.opacity.length > 0 ? t.style.opacity = (t.style.opacity*1 + stepEl) : t.style.opacity = stepEl;
		}
	} else if (classNameElement === 'change-z-index') {
		if (computedStyle.zIndex !== 'auto') {
			if ( (parseInt(computedStyle.zIndex) + stepEl) >= 0 ) {
				t.style.zIndex = (parseInt(computedStyle.zIndex) + stepEl);
			}
		} else {
			t.style.zIndex = stepEl;
		}
	}
}
function valueUp(e){
	var idElement = document.querySelector('.create__block__right__style-element').innerHTML;
	elementSearch = document.getElementById(idElement);
	if ( elementSearch === null ) return;
	var classNameElement = e.parentElement.className;
	changeValue(classNameElement, 1, elementSearch);
}
function valueDown(e){
	var idElement = document.querySelector('.create__block__right__style-element').innerHTML;
	elementSearch = document.getElementById(idElement);
	if ( elementSearch === null ) return;
	var classNameElement = e.parentElement.className;
	changeValue(classNameElement, -1, elementSearch);
}
document.querySelector('.control-panel__control-color').addEventListener('click', function(e) {
	var idElement = document.querySelector('.create__block__right__style-element').innerHTML;
	elementSearch = document.getElementById(idElement);
	if ( elementSearch === null ) return;
	if ( elementSearch.localName === 'div' ) {
		elementSearch.style.background = e.target.style.background;
	} else if ( elementSearch.localName === 'span' ) {
		elementSearch.style.color = e.target.style.background;
	}
});

var bannerSpace = document.body;
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
	if ( checkClass === false && (e.target.parentElement.className === 'create__block__left' || e.target.parentElement.parentElement.className === 'create__block__left') && e.target.localName !== 'span' ) {
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
	};

	if ( e.target.id.length === 0 ) {
		document.querySelector('.create__block__right__style-element').innerHTML = e.target.parentElement.id;
	} else {
		document.querySelector('.create__block__right__style-element').innerHTML = e.target.id;
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
	var testElem = document.elementFromPoint(lengthX, lengthY);
	document.querySelector('.create__block__left').appendChild(elem);
	testObj.id = elem.id;
}
var testObj = {
	id: ''
}
window.onload = function() {
	var c = document.getElementById("myCanvas");
	var img = document.getElementById("scream");
	c.setAttribute('width', parseInt(getComputedStyle(img).width));
	c.setAttribute('height', parseInt(getComputedStyle(img).height));
	var ctx = c.getContext("2d");
	ctx.drawImage(img, 0, 0);
	img.style.display = 'none';
}

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
			nameCreateElem.className = this.nameClass[i][0];
			if ( this.nameClass[i][1].length > 0 ) {
				nameCreateElem.setAttribute('style', 'background:' + this.nameClass[i][1]);
			}
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
document.querySelector('.create__block__right-add-element').addEventListener('click', function() {
	let place = document.querySelector('.create__block__right__result');
	let valueArray = document.querySelector('.create__block__right__select').value.split(', ')[0];
	console.log(valueArray);
	if ( valueArray == 'div' ) {
		var styleValue = 'width:50px;height:40px;cursor:pointer;border:2px solid black';
		var textValue = '';
	} else if ( valueArray == 'span' ) {
		var styleValue = 'color:red;cursor:pointer;font-size:16px;line-height:20px;width:35px';
		var textValue = 'Text';
	}
	const newBlock = new ChangeElement(valueArray, 'create__block__right-blocks', 'ball', textValue, styleValue);
	newBlock.deleteButton(newBlock.addElement(place));
});
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
