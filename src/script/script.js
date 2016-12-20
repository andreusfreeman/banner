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
