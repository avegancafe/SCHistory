"use strict";
/*
chrome.storage.local.remove("tracks");
chrome.storage.local.remove("SCHistory");
*/

var hist = [];

var songObserver = new MutationObserver(
    function (muts) {
        var song = {};
        for(var i = 0; i < muts.length; i++) {
            if (muts[i].target.classList.contains("playbackSoundBadge")) {
                var cur = muts[i].target.getElementsByClassName("playbackSoundBadge__title sc-truncate")[0];
                var img = muts[i].target.getElementsByClassName("sc-artwork")[0].childNodes[1];
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

                items.SCHistory.push(song);
                chrome.storage.local.set({"SCHistory": items.SCHistory});
            });
        }
    }
);

var player = document.getElementsByClassName("playControls__soundBadge")[0];

songObserver.observe(player, {childList: true, characterData: true, subtree: true});
