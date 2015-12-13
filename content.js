"use strict";
chrome.storage.local.remove("tracks");
chrome.storage.local.remove("SCHistory");


var hist = [];

var songObserver = new MutationObserver(
    function (muts) {
        var title;
        for(var i = 0; i < muts.length; i++) {
            if (muts[i].target.classList.contains("playbackSoundBadge")) {
                var cur = muts[i].target.getElementsByClassName("playbackSoundBadge__title sc-truncate")[0];
                title = cur.childNodes[1].innerHTML.slice(15);
                break;
            }
        }
        if (title !== undefined) {
            var all;
            chrome.storage.local.get("SCHistory", function (items) {
                console.log(items);
                if (items.SCHistory === undefined) items.SCHistory = [];

                items.SCHistory.push(title);
                chrome.storage.local.set({"SCHistory": items.SCHistory});
                console.log("done");
            });
        }
    }
);

var player = document.getElementsByClassName("playControls__soundBadge")[0];

songObserver.observe(player, {childList: true, characterData: true, subtree: true});
