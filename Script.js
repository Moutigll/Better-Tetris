document.addEventListener('DOMContentLoaded', function() {
    var divElement = document.querySelector('.rowT2');
    
    if (divElement) {
        var button = document.createElement('button');
        button.innerText = 'Fullscreen';
        button.style = 'background-color: #4CAF50; color: white; text-align: center; text-decoration: none; font-size: 16px; height: 50px; width: 100px; z-index: 9999; margin-left: 47.5%; margin-bottom: 10px; cursor: pointer;';
        button.addEventListener('click', function() {
            putgame();
        });
        divElement.parentNode.insertBefore(button, divElement.nextSibling);
    }
});

function putgame() {
    var gameArea = document.getElementById('gameArea');
    
    if (gameArea) {
        var clonedGameArea = gameArea.cloneNode(true);
        document.body.innerHTML = '';
        document.body.appendChild(clonedGameArea);
    }
    resizeGameFrame();
    setTimeout(function() {
        removeCssFromIframe();
    }, 1000);
}

function resizeGameFrame() {
    const canvas = document.querySelector('canvas#GameCanvas');
    const iframe = document.querySelector('iframe#gameIFrame');

    if (!canvas && !iframe) return;

    const windowWidth = window.innerWidth - 20;
    const windowHeight = window.innerHeight - 20;

    const aspectRatio = 4 / 3;

    let newWidth = windowWidth;
    let newHeight = windowWidth / aspectRatio;

    if (newHeight > windowHeight) {
        newHeight = windowHeight;
        newWidth = windowHeight * aspectRatio;
    }

    if (iframe) {
        iframe.style.width = `${newWidth}px`;
        iframe.style.height = `${newHeight}px`;
        iframe.style.position = 'absolute';
        iframe.style.top = '50%';
        iframe.style.left = '50%';
        iframe.style.transform = 'translate(-50%, -50%)';
    }
}

function removeCssFromIframe() {
    const iframe = document.querySelector('iframe#gameIFrame');

    if (iframe && iframe.contentDocument) {
        var iframeDocument = iframe.contentDocument;
        var elementToRemove = iframeDocument.querySelector('link[href="../css/desktop.css"]');

        if (elementToRemove) {
            elementToRemove.parentNode.removeChild(elementToRemove);
        }

        var iframeHtml = iframeDocument.documentElement;
        iframeHtml.style.overflow = 'hidden';
		iframeHtml.style.border = 'none';
    }
}
