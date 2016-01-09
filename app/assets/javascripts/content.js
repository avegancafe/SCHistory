"use strict";

var hist = [];

var songObserver = new MutationObserver(
    function (muts) {
        var song = {};
        for(var i = 0; i < muts.length; i++) {
            if (muts[i].target.classList.contains("playbackSoundBadge")) {
                var cur = muts[i].target.getElementsByClassName("playbackSoundBadge__title sc-truncate")[0];
                var posImg = muts[i].target.getElementsByClassName("sc-artwork")[0];
                var img;
                if (posImg.childNodes.length > 0) {
                    img = posImg.childNodes[1];
                } else {
                    img = posImg;
                }
                song.title = cur.title;
                song.url = cur.href;
                song.img = img.getAttribute("style").replace(" opacity: 0;", "");
                break;
            }
        }

        if (song.title !== undefined) {
            var all;
            chrome.storage.local.get("SCHistory", function (items) {
                if (items.SCHistory === undefined) items.SCHistory = [];

                var ind = 0;
                var found = items.SCHistory.filter(function (el, i, arr) {
                  if (el.title === song.title) {
                    ind = i;
                    return true;
                  }

                  return false;
                });

                if (found.length > 0) {
                  items.SCHistory.splice(ind, 1);
                }

                items.SCHistory.splice(0, 0, song);
                chrome.storage.local.set({"SCHistory": items.SCHistory.slice(0, 50)});
            });
        }
    }
);

var player = document.getElementsByClassName("playControls__soundBadge")[0];

songObserver.observe(player, {childList: true, characterData: true, subtree: true});
