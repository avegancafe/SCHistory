document.addEventListener('DOMContentLoaded', function() {
    var xs;
    chrome.storage.local.get("SCHistory", function (items) {
        xs = items.SCHistory;
        if (xs) {
            var hist = document.getElementById("history");
            var parNode = document.createElement("div");
            for (var i = 0; i < xs.length; i++) {
                var item = document.createElement("div");
                item.innerHTML = xs[i];
                parNode.appendChild(item);
            }
            hist.appendChild(parNode);
        }
    });
});
