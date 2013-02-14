(function() {

  var MIN_HEIGHT = 30;
  var MIN_WIDTH = 30;
  var MAX_HEIGHT = 350;
  var MAX_WIDTH = 350;

  var PATH_TO_SONG = "//dl.dropbox.com/u/1749642/harlem-shake.mp3";

  var CSS_CLASS = "mw-harlem_shake_me"
  var PATH_TO_CSS = "//dl.dropbox.com/u/1749642/harlem-shake-style.css";
  var CSS_FILE_CLASS = "mw-added-css"

  function addCSS() {
    var css = document.createElement("link");
    css.setAttribute("type", "text/css");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", PATH_TO_CSS);
    css.setAttribute("class", CSS_FILE_CLASS);

    document.body.appendChild(css);
  }

  function size(node) {
    return {
      height: node.offsetHeight,
      width: node.offsetWidth
    }
  }

  function withinBounds(node) {
    var nodeFrame = size(node);
    return (nodeFrame.height > MIN_HEIGHT &&
            nodeFrame.height < MAX_HEIGHT &&
            nodeFrame.width > MIN_WIDTH &&
            nodeFrame.width < MAX_WIDTH);
  }

  function playSong() {
    var audioTag = document.createElement("audio");
    audioTag.src = PATH_TO_SONG;
    audioTag.loop = false;

    audioTag.addEventListener("play", function() {
      // song started, start shaking first item
      setTimeout(function() {
        shake(firstNode);
      }, 3000);

      // setTimeout 15s
      setTimeout(function() {
        stopShakeAll();
        for (var i=0; i<allShakeableNodes.length; i++) {
          shake(allShakeableNodes[i]);
        }
      }, 16500);
    }, true);
    
    audioTag.addEventListener("ended", function() {
      stopShakeAll();
      document.body.removeChild(document.getElementsByClassName(CSS_FILE_CLASS)[0]);
    }, true);

    audioTag.innerHTML = "<p>If you are reading this, it is because your browser does not support the audio element.</p>"

    document.body.appendChild(audioTag);
    audioTag.play();
  }

  function shake(node) {
    node.className += " "+CSS_CLASS;
  }

  function stopShake(node) {
    node.className = node.className.replace(CSS_CLASS,"");
  }

  function stopShakeAll() {
    console.log("STOP ALL");
    
    var shakingNodes = document.getElementsByClassName(CSS_CLASS);
    for (var i=0; i<shakingNodes.length; i++) {
      shakingNodes[i].className = shakingNodes[i].className.replace(CSS_CLASS, "");
    }
  }

  // get first item
  var allNodes = document.getElementsByTagName("*");
  var firstNode = null;
  for (var i=0; i<allNodes.length; i++) {
    var thisNode = allNodes[i];
    if (withinBounds(thisNode)) {
      firstNode = thisNode;
      break;
    }
  }

  if (thisNode === null) {
    console.warn("Could not find a node of size > 50x50. Please try a different page.");
    return;
  }

  // insert CSS
  addCSS();

  // play song
  playSong();

  var allShakeableNodes = [];

  for (var i=0; i<allNodes.length; i++) {
    var thisNode = allNodes[i];
    if (withinBounds(thisNode)) {
      allShakeableNodes.push(thisNode);
    }
  }

})();
