function createBanner() {
	var banner = document.querySelector('.main__place__work');
	var leftToWindow = banner.offsetLeft;
	var topToWindow = banner.offsetTop;
	var styleArray = ['width', 'height', 'left', 'top', 'background-color', 'border-radius'];
	var sequenceArray = [[], [], []];
	for ( let i = 0; i < banner.children.length; i++ ) {
		if ( banner.children[i].style.zIndex == 2 || banner.children[i].style.zIndex === undefined ) {
			sequenceArray[0].push(banner.children[i]);
		} else if ( banner.children[i].style.zIndex == 3 ) {
			sequenceArray[1].push(banner.children[i]);
		} else if ( banner.children[i].style.zIndex == 4 ) {
			sequenceArray[2].push(banner.children[i]);
		}
	}
	for ( let i = 0; i < sequenceArray.length; i++ ) {
		if ( sequenceArray[i].length > 0 ) {
			for ( let j = 0; j < sequenceArray[i].length; j++ ) {
				console.log(sequenceArray[i][j]);
				if ( sequenceArray[i][j].localName !== 'canvas' ) {
					var resultArray = [];
					var attrsArray = sequenceArray[i][j].getAttribute('style').split(';');
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
					if ( sequenceArray[i][j].src !== undefined) {
						var img = sequenceArray[i][j];
						ctx.save();
						if ( resultArray[5] === undefined ) {
							resultArray[5] = 0;
						}
						console.log(resultArray[5]);
						roundedImage(resultArray[2] - leftToWindow, resultArray[3] - topToWindow, sequenceArray[i][j].width, sequenceArray[i][j].height, resultArray[5]);
						ctx.clip();
						ctx.globalAlpha = getComputedStyle(sequenceArray[i][j]).opacity;
						ctx.drawImage(img, resultArray[2] - leftToWindow, resultArray[3] - topToWindow, sequenceArray[i][j].width, sequenceArray[i][j].height);
						ctx.restore();
						function roundedImage(x, y, width, height, radius){
							ctx.beginPath();
							ctx.moveTo(x + radius, y);
							ctx.lineTo(x + width - radius, y);
							ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
							ctx.lineTo(x + width, y + height - radius);
							ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
							ctx.lineTo(x + radius, y + height);
							ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
							ctx.lineTo(x, y + radius);
							ctx.quadraticCurveTo(x, y, x + radius, y);
							ctx.closePath();
						}
					}
					if ( sequenceArray[i][j].localName !== 'span' ) {
						if ( sequenceArray[i][j].style.backgroundColor.length !== 0 && sequenceArray[i][j].style.backgroundColor !== 'none' ) {
							ctx.beginPath();
							ctx.globalAlpha = getComputedStyle(sequenceArray[i][j]).opacity;
							ctx.rect(resultArray[2] - leftToWindow, resultArray[3] - topToWindow, resultArray[0], resultArray[1]);
							ctx.fillStyle = sequenceArray[i][j].style.backgroundColor;
							ctx.fill();
						}
					}
					//insert text
					var textInsert = sequenceArray[i][j];
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
							var marginLeft = resultArray[2] - leftToWindow;
							var marginTop = resultArray[3] - topToWindow + rt;
							var text = textInsert.innerHTML;
							ctx.font = textInsert.style.fontSize + " " + fontFamily;
							ctx.fillStyle =  getComputedStyle(textInsert).color;
							wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight);
						}
					}
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
	['div', 'change-width', 'changeWidth', 'Width', '.instrument-control__style__block',''],
	['div', 'change-height', 'changeHeight', 'Height', '.instrument-control__style__block',''],
	['div', 'change-padding', 'changePadding', 'Padding', '.instrument-control__style__block',''],
	// ['div', 'change-margin', 'changeMargin', 'Margin', '.control-panel__control-block',''],
	['div', 'change-radius', 'changeRadius', 'Radius', '.instrument-control__style__block',''],
	// ['div', 'change-shadow', 'changeShadow', 'Shadow', '.control-panel__control-block',''],
	// ['div', 'change-shadow-up', 'changeShadowUp', 'Shadow Up', '.control-panel__control-block',''],
	// ['div', 'change-shadow-down', 'changeShadowDown', 'Shadow Down', '.control-panel__control-block',''],
	['div', 'change-fontsize', 'changeFontSize', 'Font-Size', '.instrument-control__style__block',''],
	['div', 'change-lineheight', 'changeLineHeight', 'Line-Height', '.instrument-control__style__block'],
	// ['div', 'change-shadow-down-text', 'changeShadowTextDown', 'Shadow Text Down', '.control-panel__control-text',''],
	// ['div', 'change-shadow-up-text', 'changeShadowTextUp', 'Shadow Text Up', '.control-panel__control-text',''],
	// ['div', 'change-shadow-text', 'changeShadowText', 'Shadow Text', '.control-panel__control-text',''],
	// ['select', 'change-float', 'changeFloat', 'Float', '.control-panel__control-block',['left', 'right']],
	// ['select', 'change-position', 'changePosition', 'Position', '.control-panel__control-block',['absolute', 'relative', 'fixed']],
	// ['div', 'change-top-position', 'changeTopPosition', 'Top Position', '.control-panel__control-block',''],
	//['div', 'change-bottom-position', 'changeBottomPosition', 'Bottom Position', '.control-panel__control-block',''],
	// ['div', 'change-left-position', 'changeLeftPosition', 'Left Position', '.control-panel__control-block',''],
	//['div', 'change-right-position', 'changeRightPosition', 'Right Position', '.control-panel__control-block',''],
	['div', 'change-opacity', 'changeOpacity', 'Opacity', '.instrument-control__style__block',''],
	// ['div', 'change-z-index', 'changeZIndex', 'Z-index', '.control-panel__control-block','']
];
window.onload = function showControlPanel() {
		for ( let i = 0; i < controlArray.length; i++) {
			const controlElement = new CreateDiv(controlArray[i][0], controlArray[i][4], controlArray[i][3], '', '', controlArray[i][1], controlArray[i][2], controlArray[i][5]);
			controlElement.NewDiv();
		}
		const changeControlFont = new ChangeElement('ul', 'control-panel__control-color__list','', '');
		let placeForColorFont = document.querySelector('.instrument-control__color__block');
		let changeElementsFont = changeControlFont.addElement(placeForColorFont);
		const underChangeElementFont = new ChangeElement('li', colorArray);
		underChangeElementFont.addMoreElement(changeElementsFont);

		const changeFont = new ChangeElement('ul', 'control-panel__control-font__list','', '');
		let placeForFont = document.querySelector('.instrument-control__font__block');
		let changeFontFamily = changeFont.addElement(placeForFont);
		const underChangeFont = new ChangeElement('li', fontArray, '', fontArray, '', '', '', '', fontArray);
		underChangeFont.addMoreElement(changeFontFamily);
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
	if (classNameElement === 'change-height') {
		t.style.height = (parseInt(computedStyle.height) + stepEl) + 'px';
	} else if (classNameElement === 'change-width') {
		t.style.width = (parseInt(computedStyle.width) + stepEl) + 'px';
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
	var idElement = document.querySelector('.info__block').innerHTML;
	elementSearch = document.getElementById(idElement);
	if ( elementSearch === null ) return;
	var classNameElement = e.parentElement.className;
	changeValue(classNameElement, 1, elementSearch);
}
function valueDown(e){
	var idElement = document.querySelector('.info__block').innerHTML;
	elementSearch = document.getElementById(idElement);
	if ( elementSearch === null ) return;
	var classNameElement = e.parentElement.className;
	changeValue(classNameElement, -1, elementSearch);
}
document.querySelector('.instrument-control__color__block').addEventListener('click', function(e) {
	var idElement = document.querySelector('.info__block').innerHTML;
	elementSearch = document.getElementById(idElement);
	if ( elementSearch === null ) return;
	if ( elementSearch.localName === 'div' ) {
		elementSearch.style.backgroundColor = e.target.style.backgroundColor;
	} else if ( elementSearch.localName === 'span' ) {
		elementSearch.style.color = e.target.style.backgroundColor;
	}
});
document.querySelector('.instrument-control__font__block').addEventListener('click', function(e) {
	var idElement = document.querySelector('.info__block').innerHTML;
	elementSearch = document.getElementById(idElement);
	if ( elementSearch === null ) return;
	if ( elementSearch.localName === 'span' ) {
		elementSearch.style.fontFamily = e.target.style.fontFamily;
	}
});

// var bannerSpace = document.querySelector('.main__place');
﻿var bannerSpace = document.body;
//var checkClassName = ['new__block-left-up', 'new__block-right-up', 'new__block-right-down', 'new__block-left-down'];
var checkClassName = ['new__block-right-up', 'new__block-right-down'];
bannerSpace.onmousedown = function(e) {
	if (e.which != 1) return;
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
		//bannerElement = document.getElementById(e.target.parentElement.parentElement.id);

		//start new code
		bannerElement = document.getElementById(e.target.parentElement.id);
		//end new code
	}
	var controlChange = e.target.className;
	for ( let i = 0; i < checkClassName.length; i++ ) {
		if ( e.target.className == checkClassName[i] ) {
			checkClass = true;
			break;
		}
	}
	if ( checkClass === false && (e.target.parentElement.className === 'main__place__work' || e.target.parentElement.parentElement.className === 'main__place__work') && e.target.localName !== 'span' ) {
		/*if ( document.querySelector('.new__block') !== null )  {
			document.querySelector('.new__block').remove();
		}*/

		//start new code
		if ( e.target.className == 'new__block' ) {
			deleteAllChange();	//delete all change block
		} else {
			choiceElement = e.target;
			deleteAllChange();	//delete all change block
			const test = new ChangeElement('div', 'new__block','element', '', 'border:0.5px solid black;border-style:dashed;position:absolute;top:' + (e.target.offsetTop - 10) + 'px;left:'+ (e.target.offsetLeft - 10) + 'px;width:' + (parseInt(getComputedStyle(e.target).width) + 20) + 'px;height:' + (parseInt(getComputedStyle(e.target).height) + 20) + 'px');
			let testElements = test.addElement(document.querySelector('.main__place__work'));
			const underChangeElement = new ChangeElement('a', [
				['new__block-right-up', ''],
				['new__block-right-down', '']
			]);
			underChangeElement.addMoreElement(testElements);
			//end new code

			/*const changeControl = new ChangeElement('div', 'new__block','', '');
			let changeElements = changeControl.addElement(e.target);
			const underChangeElement = new ChangeElement('a', [
				['new__block-right-up', ''],
				['new__block-right-down', '']
			]);
			underChangeElement.addMoreElement(changeElements);*/
		}
	}
	if ( bannerElement === null && checkClass === false ) return;
	//openDeleteField = setTimeout(deleteElement, 500);
	//deleteElement();
	var widthValue = Math.floor(parseInt(bannerElement.style.width));
	var heightValue = Math.floor(parseInt(bannerElement.style.height));
	var coords = getCoords(bannerElement);
	var shiftX = e.pageX - coords.left;
	var shiftY = e.pageY - coords.top;
	var changeWidth = Math.floor(shiftX);
	var changeHeight = Math.floor(shiftY);
	bannerElement.style.position = 'absolute';
	document.body.appendChild(bannerElement);

	if ( e.target.className == 'new__block-right-up' || e.target.className == 'new__block-right-down' ) {
		moveAtChange(e, checkClass);
	} else {
		moveAt(e, checkClass);
	}
	if ( bannerElement.localName === 'img' ) {
		bannerElement.style.zIndex = 2;
	} else if ( bannerElement.localName === 'div' ) {
		bannerElement.style.zIndex = 3;
	} else {
		bannerElement.style.zIndex = 4;
	}
	//start new code change
	function moveAt(e, checkClass) {
		bannerElement.style.left = e.pageX - shiftX + 'px';
		bannerElement.style.top = e.pageY - shiftY + 'px';
	}

	function moveAtChange(e, checkClass) {
		let classNameCheck = e.target.className;
		if ( classNameCheck == 'new__block-right-up') {
			bannerElement.style.width = e.pageX - bannerElement.offsetLeft + 'px';
			choiceElement.style.width = e.pageX - bannerElement.offsetLeft - 20 + 'px';
		} else if ( classNameCheck == 'new__block-right-down') {
			bannerElement.style.height = e.pageY - bannerElement.offsetTop + 'px';
			choiceElement.style.height = e.pageY - bannerElement.offsetTop - 20 + 'px';
		}
	}
	document.onmousemove = function(e) {
		if ( e.target.className == 'new__block-right-up' || e.target.className == 'new__block-right-down' ) {
			checkClass = true;
			moveAtChange(e, checkClass);
		} else {
			deleteAllChange();	//delete all change block
			if ( checkClass === false ) {
				moveAt(e, checkClass);
			} else {
				document.onmousemove = null;
				return;
			}
		}
	};
	//end new code change
	bannerSpace.onmouseup = function(e) {
		//deleteElement();
		if ( e.target.localName == 'textarea' ) {
			return;
		}
		try {
			if ( bannerElement.className == 'new__block' ) {
				deleteAllChange();	//delete all change block
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

//https://www.html5rocks.com/ru/tutorials/file/dndfiles/
class ChangeElement {
	constructor(elem, nameClass, id, text, style, source, dataElem, imageWidth, font) {
		this.elem = elem;
		this.nameClass = nameClass;
		this.id = id;
		this.text = text;
		this.style = style;
		this.source = source;
		this.dataElem = dataElem;
		this.imageWidth = imageWidth;
		this.font = font;
	}
	addElement(place) {
		var elementName = this.elem;
		this.elem = document.createElement(this.elem);
		this.elem.className = this.nameClass;
		this.elem.setAttribute('style', this.style);
		if ( elementName === 'img' ) {
			this.elem.setAttribute('src', this.source)
		}
		if (this.id.length > 0 ) {
			this.elem.id = this.id + Math.floor(Math.random() * 10000);
		}
		if ( this.dataElem !== undefined ) {
			this.elem.setAttribute('data-id-elem', this.dataElem)
		}
		if ( this.imageWidth !== undefined ) {
			this.elem.setAttribute('width', this.imageWidth)
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
		let textHtml;
		for ( let i = 0; i < this.nameClass.length; i++ ) {
			nameCreateElem = document.createElement(this.elem);
			nameCreateElem.className = this.nameClass[i][0];
			if ( this.nameClass[i][1].length > 0 ) {
				nameCreateElem.setAttribute('style', 'background-color:' + this.nameClass[i][1]);
			}
			if ( this.font !== undefined ) {
				nameCreateElem.setAttribute('style', 'font-family:' + this.font[i][1]);
			}
			if ( this.text !== undefined ) {
				textHtml = this.font[i][1];
			}
			if ( textHtml !== undefined ) {
				place.appendChild(nameCreateElem).innerHTML = textHtml;
			} else {
				place.appendChild(nameCreateElem);								
			}
			nameCreateElem = this.elem;
		}
	}
	deleteButton(newElem) {
		var span = document.createElement('span');
		span.setAttribute('onclick', 'deleteElem(this)')
		span.className = 'create__block__right-add-element-list';
	}
}
document.querySelector('.instrument-control__element__block-list').addEventListener('click', function(e) {
	e.preventDefault();
	let place = document.querySelector('.main__place__elements-block');
	let valueArray = e.target.dataset.idKind;
	if ( valueArray == 'div' ) {
		var styleValue = 'width:140px;height:100px;cursor:move;border:1px solid black;border-style:dashed';
		var textValue = '';
	} else if ( valueArray == 'span' ) {
		var styleValue = 'color:red;cursor:move;font-size:16px;line-height:20px;width:35px';
		var textValue = 'Text';
	}
	const newBlock = new ChangeElement(valueArray, '', 'element', textValue, styleValue);
	let elementList = newBlock.addElement(place);
	newBlock.deleteButton(elementList);
	const listBlock = new ChangeElement('li', '', '', elementList.id, '', '', elementList.id);
	listBlock.addElement(document.querySelector('.main__place__elements__list-items'));
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

var DragManager = new function() {

  /**
   * составной объект для хранения информации о переносе:
   * {
   *   elem - элемент, на котором была зажата мышь
   *   avatar - аватар
   *   downX/downY - координаты, на которых был mousedown
   *   shiftX/shiftY - относительный сдвиг курсора от угла элемента
   * }
   */
  var dragObject = {};

  var self = this;

  function onMouseDown(e) {

    if (e.which != 1) return;

    var elem = e.target.closest('.draggable');
    if (!elem) return;

    dragObject.elem = elem;

    // запомним, что элемент нажат на текущих координатах pageX/pageY
    dragObject.downX = e.pageX;
    dragObject.downY = e.pageY;

    return false;
  }

  function onMouseMove(e) {
    if (!dragObject.elem) return; // элемент не зажат

    if (!dragObject.avatar) { // если перенос не начат...
      var moveX = e.pageX - dragObject.downX;
      var moveY = e.pageY - dragObject.downY;

      // если мышь передвинулась в нажатом состоянии недостаточно далеко
      if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
        return;
      }

      // начинаем перенос
      dragObject.avatar = createAvatar(e); // создать аватар
      if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
        dragObject = {};
        return;
      }

      // аватар создан успешно
      // создать вспомогательные свойства shiftX/shiftY
      var coords = getCoords(dragObject.avatar);
      dragObject.shiftX = dragObject.downX - coords.left;
      dragObject.shiftY = dragObject.downY - coords.top;

      startDrag(e); // отобразить начало переноса
    }

    // отобразить перенос объекта при каждом движении мыши
    dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
    dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

    return false;
  }

  function onMouseUp(e) {
    if (dragObject.avatar) { // если перенос идет
      finishDrag(e);
    }

    // перенос либо не начинался, либо завершился
    // в любом случае очистим "состояние переноса" dragObject
    dragObject = {};
  }

  function finishDrag(e) {
    var dropElem = findDroppable(e);

    if (!dropElem) {
      self.onDragCancel(dragObject);
    } else {
      self.onDragEnd(dragObject, dropElem);
    }
  }

  function createAvatar(e) {

    // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
    var avatar = dragObject.elem;
    var old = {
      parent: avatar.parentNode,
      nextSibling: avatar.nextSibling,
      position: avatar.position || '',
      left: avatar.left || '',
      top: avatar.top || '',
      zIndex: avatar.zIndex || ''
    };

    // функция для отмены переноса
    avatar.rollback = function() {
      old.parent.insertBefore(avatar, old.nextSibling);
      avatar.style.position = old.position;
      avatar.style.left = old.left;
      avatar.style.top = old.top;
      avatar.style.zIndex = old.zIndex
    };

    return avatar;
  }

  function startDrag(e) {
    var avatar = dragObject.avatar;

    // инициировать начало переноса
    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
  }

  function findDroppable(event) {
    // спрячем переносимый элемент
    dragObject.avatar.hidden = true;

    // получить самый вложенный элемент под курсором мыши
    var elem = document.elementFromPoint(event.clientX, event.clientY);

    // показать переносимый элемент обратно
    dragObject.avatar.hidden = false;

    if (elem == null) {
      // такое возможно, если курсор мыши "вылетел" за границу окна
      return null;
    }

    return elem.closest('.droppable');
  }

  document.onmousemove = onMouseMove;
  document.onmouseup = onMouseUp;
  document.onmousedown = onMouseDown;

  this.onDragEnd = function(dragObject, dropElem) {};
  this.onDragCancel = function(dragObject) {};

};


function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}
function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        /*var div = document.createElement('div');
        div.innerHTML = ['<img src="', e.target.result,
                          '" title="', escape(theFile.name), '"/>'].join('');*/
    const newImg = new ChangeElement('img', '', 'element', '', '', e.target.result, '', '140');
    let imgElement = newImg.addElement(document.querySelector('.main__place__elements'));
    const listBlock = new ChangeElement('li', '', '', imgElement.id, '', '', imgElement.id);
    listBlock.addElement(document.querySelector('.main__place__elements__list-items'));
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

document.querySelector('.instrument-control__upload__block-file').addEventListener('change', handleFileSelect, false);

document.querySelector('.view__block-preview').addEventListener('click', function() {
	document.querySelector('.modal-window').style.display = 'block';
	document.querySelector('.result__banner').style.display = 'block';
	createCanvas();
	createBanner();
});
document.querySelector('.result__banner-block-close').addEventListener('click', function(e) {
	e.preventDefault();
	document.querySelector('.modal-window').style.display = 'none';
	document.querySelector('.result__banner').style.display = 'none';
});

function createCanvas() {
 	var c = document.getElementById('myCanvas');
 	var elem = document.querySelector('.main__place__work');
 	c.setAttribute('width', parseInt(getComputedStyle(elem).width));
 	c.setAttribute('height', parseInt(getComputedStyle(elem).height));
	document.querySelector('.result__banner-block').style.width = parseInt(getComputedStyle(elem).width) + 'px';
 	//var ctx = c.getContext("2d");
	//ctx.drawImage(img, 0, 0);
 	//img.style.display = 'none';
}
function deleteAllChange() {
	/*if ( document.querySelectorAll('.new__block') !== null )  {
		document.querySelector('.new__block').remove();
	}*/
	let checkBlocks = false;
	let changeBlock = document.querySelectorAll('.new__block');
	for ( let i = 0; i < changeBlock.length; i++ ) {
		changeBlock[i].remove();
		checkBlocks = true;
	}
}
document.querySelector('.main__place__elements__list-items').addEventListener('click', function(e) {
	e.preventDefault();
	document.querySelector('.info__block').innerHTML = e.target.dataset.idElem;
	let choiceElement = document.getElementById(e.target.dataset.idElem);
	var a = choiceElement.offsetLeft;
	var b = choiceElement.offsetTop;
	choiceElement.style.display = 'none';
	searchElement(a, b, choiceElement);
	choiceElement.style.display = 'block';
});
function deleteElement() {
	let fieldDelete = document.querySelector('.delete__block');
	if ( getComputedStyle(fieldDelete).display == 'none' ) {
		fieldDelete.style.display = 'block';
	} else {
		fieldDelete.style.display = 'none'
	}
}

colorArray =  [
  ['control-panel__control-color__item', 'none'],
  ['control-panel__control-color__item', 'AliceBlue'],
  ['control-panel__control-color__item', 'AntiqueWhite'],
  ['control-panel__control-color__item', 'Aqua'],
  ['control-panel__control-color__item', 'Aquamarine'],
  ['control-panel__control-color__item', 'Azure'],
  ['control-panel__control-color__item', 'Beige'],
  ['control-panel__control-color__item', 'Bisque'],
  ['control-panel__control-color__item', 'Black'],
  ['control-panel__control-color__item', 'BlanchedAlmond'],
  ['control-panel__control-color__item', 'Blue'],
  ['control-panel__control-color__item', 'BlueViolet'],
  ['control-panel__control-color__item', 'Brown'],
  ['control-panel__control-color__item', 'BurlyWood'],
  ['control-panel__control-color__item', 'CadetBlue'],
  ['control-panel__control-color__item', 'Chartreuse'],
  ['control-panel__control-color__item', 'Chocolate'],
  ['control-panel__control-color__item', 'Coral'],
  ['control-panel__control-color__item', 'CornflowerBlue'],
  ['control-panel__control-color__item', 'Cornsilk'],
  ['control-panel__control-color__item', 'Crimson'],
  ['control-panel__control-color__item', 'Cyan'],
  ['control-panel__control-color__item', 'DarkBlue'],
  ['control-panel__control-color__item', 'DarkCyan'],
  ['control-panel__control-color__item', 'DarkGoldenRod'],
  ['control-panel__control-color__item', 'DarkGray'],
  ['control-panel__control-color__item', 'DarkGrey'],
  ['control-panel__control-color__item', 'DarkGreen'],
  ['control-panel__control-color__item', 'DarkKhaki'],
  ['control-panel__control-color__item', 'DarkMagenta'],
  ['control-panel__control-color__item', 'DarkOliveGreen'],
  ['control-panel__control-color__item', 'DarkOrange'],
  ['control-panel__control-color__item', 'DarkOrchid'],
  ['control-panel__control-color__item', 'DarkRed'],
  ['control-panel__control-color__item', 'DarkSalmon'],
  ['control-panel__control-color__item', 'DarkSeaGreen'],
  ['control-panel__control-color__item', 'DarkSlateBlue'],
  ['control-panel__control-color__item', 'DarkSlateGray'],
  ['control-panel__control-color__item', 'DarkSlateGrey'],
  ['control-panel__control-color__item', 'DarkTurquoise'],
  ['control-panel__control-color__item', 'DarkViolet'],
  ['control-panel__control-color__item', 'DeepPink'],
  ['control-panel__control-color__item', 'DeepSkyBlue'],
  ['control-panel__control-color__item', 'DimGray'],
  ['control-panel__control-color__item', 'DimGrey'],
  ['control-panel__control-color__item', 'DodgerBlue'],
  ['control-panel__control-color__item', 'FireBrick'],
  ['control-panel__control-color__item', 'FloralWhite'],
  ['control-panel__control-color__item', 'ForestGreen'],
  ['control-panel__control-color__item', 'Fuchsia'],
  ['control-panel__control-color__item', 'Gainsboro'],
  ['control-panel__control-color__item', 'GhostWhite'],
  ['control-panel__control-color__item', 'Gold'],
  ['control-panel__control-color__item', 'GoldenRod'],
  ['control-panel__control-color__item', 'Gray'],
  ['control-panel__control-color__item', 'Grey'],
  ['control-panel__control-color__item', 'Green'],
  ['control-panel__control-color__item', 'GreenYellow'],
  ['control-panel__control-color__item', 'HoneyDew'],
  ['control-panel__control-color__item', 'HotPink'],
  ['control-panel__control-color__item', 'IndianRed'],
  ['control-panel__control-color__item', 'Indigo'],
  ['control-panel__control-color__item', 'Ivory'],
  ['control-panel__control-color__item', 'Khaki'],
  ['control-panel__control-color__item', 'Lavender'],
  ['control-panel__control-color__item', 'LavenderBlush'],
  ['control-panel__control-color__item', 'LawnGreen'],
  ['control-panel__control-color__item', 'LemonChiffon'],
  ['control-panel__control-color__item', 'LightBlue'],
  ['control-panel__control-color__item', 'LightCoral'],
  ['control-panel__control-color__item', 'LightCyan'],
  ['control-panel__control-color__item', 'LightGoldenRodYellow'],
  ['control-panel__control-color__item', 'LightGray'],
  ['control-panel__control-color__item', 'LightGrey'],
  ['control-panel__control-color__item', 'LightGreen'],
  ['control-panel__control-color__item', 'LightPink'],
  ['control-panel__control-color__item', 'LightSalmon'],
  ['control-panel__control-color__item', 'LightSeaGreen'],
  ['control-panel__control-color__item', 'LightSkyBlue'],
  ['control-panel__control-color__item', 'LightSlateGray'],
  ['control-panel__control-color__item', 'LightSlateGrey'],
  ['control-panel__control-color__item', 'LightSteelBlue'],
  ['control-panel__control-color__item', 'LightYellow'],
  ['control-panel__control-color__item', 'Lime'],
  ['control-panel__control-color__item', 'LimeGreen'],
  ['control-panel__control-color__item', 'Linen'],
  ['control-panel__control-color__item', 'Magenta'],
  ['control-panel__control-color__item', 'Maroon'],
  ['control-panel__control-color__item', 'MediumAquaMarine'],
  ['control-panel__control-color__item', 'MediumBlue'],
  ['control-panel__control-color__item', 'MediumOrchid'],
  ['control-panel__control-color__item', 'MediumPurple'],
  ['control-panel__control-color__item', 'MediumSeaGreen'],
  ['control-panel__control-color__item', 'MediumSlateBlue'],
  ['control-panel__control-color__item', 'MediumSpringGreen'],
  ['control-panel__control-color__item', 'MediumTurquoise'],
  ['control-panel__control-color__item', 'MediumVioletRed'],
  ['control-panel__control-color__item', 'MidnightBlue'],
  ['control-panel__control-color__item', 'MintCream'],
  ['control-panel__control-color__item', 'MistyRose'],
  ['control-panel__control-color__item', 'Moccasin'],
  ['control-panel__control-color__item', 'NavajoWhite'],
  ['control-panel__control-color__item', 'Navy'],
  ['control-panel__control-color__item', 'OldLace'],
  ['control-panel__control-color__item', 'Olive'],
  ['control-panel__control-color__item', 'OliveDrab'],
  ['control-panel__control-color__item', 'Orange'],
  ['control-panel__control-color__item', 'OrangeRed'],
  ['control-panel__control-color__item', 'Orchid'],
  ['control-panel__control-color__item', 'PaleGoldenRod'],
  ['control-panel__control-color__item', 'PaleGreen'],
  ['control-panel__control-color__item', 'PaleTurquoise'],
  ['control-panel__control-color__item', 'PaleVioletRed'],
  ['control-panel__control-color__item', 'PapayaWhip'],
  ['control-panel__control-color__item', 'PeachPuff'],
  ['control-panel__control-color__item', 'Peru'],
  ['control-panel__control-color__item', 'Pink'],
  ['control-panel__control-color__item', 'Plum'],
  ['control-panel__control-color__item', 'PowderBlue'],
  ['control-panel__control-color__item', 'Purple'],
  ['control-panel__control-color__item', 'RebeccaPurple'],
  ['control-panel__control-color__item', 'Red'],
  ['control-panel__control-color__item', 'RosyBrown'],
  ['control-panel__control-color__item', 'RoyalBlue'],
  ['control-panel__control-color__item', 'SaddleBrown'],
  ['control-panel__control-color__item', 'Salmon'],
  ['control-panel__control-color__item', 'SandyBrown'],
  ['control-panel__control-color__item', 'SeaGreen'],
  ['control-panel__control-color__item', 'SeaShell'],
  ['control-panel__control-color__item', 'Sienna'],
  ['control-panel__control-color__item', 'Silver'],
  ['control-panel__control-color__item', 'SkyBlue'],
  ['control-panel__control-color__item', 'SlateBlue'],
  ['control-panel__control-color__item', 'SlateGray'],
  ['control-panel__control-color__item', 'SlateGrey'],
  ['control-panel__control-color__item', 'Snow'],
  ['control-panel__control-color__item', 'SpringGreen'],
  ['control-panel__control-color__item', 'SteelBlue'],
  ['control-panel__control-color__item', 'Tan'],
  ['control-panel__control-color__item', 'Teal'],
  ['control-panel__control-color__item', 'Thistle'],
  ['control-panel__control-color__item', 'Tomato'],
  ['control-panel__control-color__item', 'Turquoise'],
  ['control-panel__control-color__item', 'Violet'],
  ['control-panel__control-color__item', 'Wheat'],
  ['control-panel__control-color__item', 'White'],
  ['control-panel__control-color__item', 'WhiteSmoke'],
  ['control-panel__control-color__item', 'Yellow'],
  ['control-panel__control-color__item', 'YellowGreen']
];

fontArray =  [
  ['control-panel__control-font__item', 'Georgia'],
  ['control-panel__control-font__item', 'Palatino'],
  ['control-panel__control-font__item', 'Times'],
  ['control-panel__control-font__item', 'Helvetica'],
  ['control-panel__control-font__item', 'Arial'],
  ['control-panel__control-font__item', 'Gadget'],
  ['control-panel__control-font__item', 'Comic Sans MS'],
  ['control-panel__control-font__item', 'Impact'],
  ['control-panel__control-font__item', 'Charcoal'],
  ['control-panel__control-font__item', 'Lucida Sans Unicode'],
  ['control-panel__control-font__item', 'Lucida Grande'],
  ['control-panel__control-font__item', 'Tahoma'],
  ['control-panel__control-font__item', 'Geneva'],
  ['control-panel__control-font__item', 'Trebuchet MS'],
  ['control-panel__control-font__item', 'Verdana'],
  ['control-panel__control-font__item', 'Geneva'],
  ['control-panel__control-font__item', 'Courier New'],
  ['control-panel__control-font__item', 'Courier'],
  ['control-panel__control-font__item', 'Lucida Console'],
  ['control-panel__control-font__item', 'Monaco']
];
