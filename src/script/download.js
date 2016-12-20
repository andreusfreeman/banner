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
