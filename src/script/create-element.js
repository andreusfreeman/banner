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
