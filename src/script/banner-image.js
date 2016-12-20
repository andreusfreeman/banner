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
