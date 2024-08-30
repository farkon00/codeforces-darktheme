// ==UserScript==
// @name         Codeforces dark mode
// @version      1.2.5
// @description  Improved dark mode for Codeforces
// @author       Gaurang Tandon & fork by David
// @match        https://codeforces.com/*
// @match        http://codeforces.com/*
// @match        https://calendar.google.com/calendar/embed*
// @match        https://www.facebook.com/v2.8/plugins/like.php*
// @resource     desertCSS  https://github.com/farkon00/codeforces-darktheme/raw/master/desert.css
// @resource     darkthemecss https://github.com/farkon00/codeforces-darktheme/raw/master/darktheme.css
// @resource     monokaithemecss https://github.com/farkon00/codeforces-darktheme/raw/master/monokai-theme.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-start
// ==/UserScript==

(function () {
	"use strict";

	var colors = {
		tableGreyRow: "#181818",
		whiteTextColor: "rgb(240, 240, 240)",
		inputBoxBackgroundBorderColor: "#383838",
		redColorJustPassesA11Y: "#ff0000",
		genericLinkBlueColor: "#00a6ff"
	};

	function overrideStyleAttribute(elm, prop, value) {
		elm.setAttribute("style", elm.getAttribute("style") + `; ${prop}: ${value} !important; `);
	}

	if (window.self != window.top && /calendar\.google\.com/.test(window.self.location.hostname)) {
		// cannot add the other styles as they interfere with
		// calendar's elements (since the selectors are so generic)
		GM_addStyle(`
/* google calendar logo, see #13 */
div.logo-plus-button {
    filter: invert(1) hue-rotate(180deg);
}`);
		// rest of the google calendar has already been inverted
		// so return
		return;
	}

	var style = GM_getResourceText("darkthemecss"),
		desertCSS = GM_getResourceText("desertCSS"),
		monokaiEditorThemeCSS = GM_getResourceText("monokaithemecss");

	GM_addStyle(style);
	GM_addStyle(desertCSS);

	// to avoid long FOUT duration
	function applyFuncWhenElmLoaded(sel, func) {
		var elm = document.querySelectorAll(sel);
		if (!elm || elm.length == 0) return setTimeout(applyFuncWhenElmLoaded, 100, sel, func);
		for (let i = 0, len = elm.length; i < len; i++) func(elm[i]);
	}

	// some properties are added via element.style
	// need to override them via javascript

	// div div h3 a = the top header "@user's blog" whose color property is added via js
	applyFuncWhenElmLoaded(
		"#pageContent div div h3 a, .comment-table.highlight-blue .right .ttypography p, .comment-table.highlight-blue .right .info",
		function (elm) {
			var obs = new MutationObserver(function (mutationList, observer) {
				mutationList.forEach(function (mutation) {
					if (mutation.type == "attributes" && mutation.attributeName == "style") {
						elm.setAttribute("style", elm.getAttribute("style") + "; color: white !important; ");
					}
				});
			});
			overrideStyleAttribute(elm, "color", "white");

			obs.observe(elm, { attributes: true });
		}
	);

	applyFuncWhenElmLoaded(".datatable div:nth-child(5)", function (elm) {
		elm.classList.add("dark");
	});

	// in this case !important doesn't workthrough css stylesheet
	applyFuncWhenElmLoaded(".unread td", function (elm) {
		elm.style.backgroundColor = "#13203a !important";
	});

	(function detect404Page() {
		applyFuncWhenElmLoaded("body > h3", function (elm) {
			if (elm.innerText.startsWith("The requested URL was not found on this server.")) {
				document.body.classList.add("notfoundpage");
			}
		});
	})();

	(function fixLavaMenu() {
		applyFuncWhenElmLoaded(".second-level-menu-list li.backLava", function (elm) {
			elm.style.backgroundImage =
				"url(https://github.com/farkon00/codeforces-darktheme/raw/master/imgs/lava-right2.png)";
			elm.firstElementChild.style.backgroundImage =
				"url(https://github.com/farkon00/codeforces-darktheme/raw/master/imgs/lava-left2.png)";
		});
	})();

	(function fixAceEditor() {
		applyFuncWhenElmLoaded("#editor", function (elm) {
			var aceChromeClass = "ace-chrome";
			GM_addStyle(monokaiEditorThemeCSS);
			elm.classList.remove(aceChromeClass);
			elm.classList.add("ace-monokai");

			// using a mutationobserver to revert addition of class ace-chome
			// goes into an infinite loop, presumably because the script run
			// by codeforces adds it back
			function checkAceClassRemoved() {
				if (elm.classList.contains(aceChromeClass)) {
					elm.classList.remove(aceChromeClass);
				}
			}
			setInterval(checkAceClassRemoved, 10);
		});
	})();

    (function fixImageBackgrounds() {
		applyFuncWhenElmLoaded("#header > div:nth-child(1) > a > img", function (elm) {
			elm.src="https://github.com/farkon00/codeforces-darktheme/raw/master/imgs/logo.png";
		});
		applyFuncWhenElmLoaded(".header-bell__img", function (elm) {
			overrideStyleAttribute(elm, "background-image",
								   "url(https://github.com/farkon00/codeforces-darktheme/raw/master/imgs/bell.png)");
		});
		applyFuncWhenElmLoaded("#footer img[alt=\"TON\"]", function (elm) {
			elm.src="https://github.com/farkon00/codeforces-darktheme/raw/master/imgs/ton-logo.png";
		});
	})();

	(function fixColorRedGreenContrast() {
		if (document.readyState != "complete") {
			return setTimeout(fixColorRedGreenContrast, 100);
		}

		var elms = document.querySelectorAll("*");
		for (let i = 0, len = elms.length; i < len; i++) {
			if (getComputedStyle(elms[i]).color == "rgb(0, 128, 0)") {
				overrideStyleAttribute(elms[i], "color", "#00c700");
			}
		}

		elms = document.querySelectorAll("font");
		for (let i = 0, len = elms.length; i < len; i++) {
			if (elms[i].getAttribute("color") == "red") {
				elms[i].setAttribute("color", colors.redColorJustPassesA11Y);
			}
		}
	})();

	(function fixBlackTextInRightTableDuringContest() {
		applyFuncWhenElmLoaded(".rtable span", function (elm) {
			if (elm.style && elm.style.color == "rgb(0, 0, 0)"){
				overrideStyleAttribute(elm, "color", colors.whiteTextColor);
            }
		});
	})();

	// cannot override through css since specifity issue
	(function improveLinkColorInGreenAlerts() {
		applyFuncWhenElmLoaded("div.alert-success a", function (elm) {
			overrideStyleAttribute(elm, "color", "#004794");
		});
	})();
})();
