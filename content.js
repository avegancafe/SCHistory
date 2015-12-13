"use strict";

var hist = [];

var songObserver = new MutationObserver(
    function () {
        console.log("New song");
    }
);

var player = document.getElementsByClassName("playControls__soundBadge")[0];

songObserver.observe(player, {childList: true, characterData: true, subtree: true});
