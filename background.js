browser.contextMenus.create({
    id: "postey-share-to-facebook",
    title: "Share page to Facebook",
});
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "postey-share-to-facebook") {

        // First, get the (encoded) URL for the current tab
        var encodedURI = encodeURIComponent(tab.url);
        //console.log("encodedURI: " + encodedURI);

        // Then, create a popup to share this URL on Facebook
        browser.windows.create({
            url: "http://www.facebook.com/sharer.php?u=" + encodedURI
            //type: "popup",
        }).catch((error) => {
            // This could happen if the extension is not allowed to run code in
            // the page, for example if the tab is a privileged page.
            console.error("Failed to share Facebook link: " + error);
        });
    }
});

// https://gist.github.com/Rob--W/ec23b9d6db9e56b7e4563f1544e0d546
function escapeHTML(str) {
    // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
    // Most often this is not the case though.
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}