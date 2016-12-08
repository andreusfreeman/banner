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

					ctx.beginPath();
					ctx.rect(resultArray[2], resultArray[3], resultArray[0], resultArray[1]);
					ctx.fillStyle = "yellow";
					ctx.fill(); /*
					ctx.font="20px Georgia";
					ctx.fillText("Hello World!",10,50);
					ctx.font="30px Verdana";
					ctx.background = "yellow";
					ctx.padding = "10px";*/
					// Create gradient

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
							var marginLeft = resultArray[2];
							var marginTop = resultArray[3] + rt;
							var text = textInsert.innerHTML;
							ctx.font = textInsert.style.fontSize + " Calibri";
							ctx.fillStyle = "white";
							wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight);
						}
					}
				}
			}

}
