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
