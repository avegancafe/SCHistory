document.addEventListener('DOMContentLoaded', function() {
    var xs;
    chrome.storage.local.get("SCHistory", function (items) {
        xs = items.SCHistory;
        var hist = document.getElementById("history");
        if ( xs && xs.length > 0) {
            var parNode = document.createElement("div");
            for (var i = 0; i < xs.length; i++) {
                var wrapper = document.createElement("div");
                wrapper.classList.add("song");
                var item = document.createElement("a");
                var img = document.createElement("span");
                img.setAttribute("style", xs[i].img);
                item.href = xs[i].url;
                item.innerHTML = xs[i].title;
                item.setAttribute("target", "_blank");
                wrapper.appendChild(img);
                wrapper.appendChild(item);
                parNode.appendChild(wrapper);
            }
            hist.appendChild(parNode);
        } else {
            var noneStuff = document.createElement("div");
            noneStuff.innerHTML = "Get some tunes bumping!";
            hist.appendChild(noneStuff);
        }
    });
});
