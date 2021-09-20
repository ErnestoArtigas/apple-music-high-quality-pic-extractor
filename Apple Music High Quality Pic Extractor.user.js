// ==UserScript==
// @name         Apple Music High Quality Pic Extractor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Creates a link for getting a high quality jpg image from an Apple Music album. 1200x1200 seems to be the common highest quality picture.
// @author       LodocArt
// @git..........https://github.com/LodocArt/apple-music-high-quality-pic-extractor
// @match        https://music.apple.com/**/album/*/*
// @run-at       document-start
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==



// When accessing other albums from a fully loaded page it won't launch the script anymore. Need to refresh.
(function() {
    'use strict';
    // Loop to watch when the page fully loads (Open with Itunes button) to avoid loosing the new link.
    let checkExist = setInterval(function() {
        var element = document.getElementsByClassName("typography-body native-upsell__prompt")[0];
        if (typeof(element) != "undefined" && element != null) {
            console.log("found");
            main();
            clearInterval(checkExist);
        }
    }, 100);
})();


function main() {
    // Searching for the srcset element of the first source tag of the album picture.
    let picURL = document.querySelectorAll("picture")[0].firstElementChild.srcset;

    // Need to keep only one of the url, extract the default size in webp and replace it with the generic 1200 jpg.
    picURL = picURL.split(".webp")[0];
    let defaultSize = picURL.split("/").pop();
    picURL = picURL.replace(defaultSize, "1200x1200bf-60.jpg");

    let yearField = document.getElementsByClassName("product-meta typography-callout-emphasized")[0];
    let link = document.createElement("a");
    link.href = picURL;
    link.innerText = "Download high quality picture (middle click or open with right click)";
    yearField.insertBefore(link, yearField.firstChild);
}