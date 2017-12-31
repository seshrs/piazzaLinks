/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = hide;
/* harmony export (immutable) */ __webpack_exports__["k"] = show;
/* harmony export (immutable) */ __webpack_exports__["a"] = disable;
/* harmony export (immutable) */ __webpack_exports__["b"] = enable;
/* harmony export (immutable) */ __webpack_exports__["j"] = selectOption;
/* harmony export (immutable) */ __webpack_exports__["h"] = removeChildren;
/* harmony export (immutable) */ __webpack_exports__["i"] = saveToChromeStorage;
/* harmony export (immutable) */ __webpack_exports__["c"] = generateSamplePiazzaURL;
/* harmony export (immutable) */ __webpack_exports__["d"] = getNetworkIDFromPiazzaURL;
/* harmony export (immutable) */ __webpack_exports__["e"] = getParameterByName;
/* unused harmony export extractHostname */
/* unused harmony export extractRootDomain */
/* harmony export (immutable) */ __webpack_exports__["f"] = getSavedPiazzaNetworkID;
//
// utility.js
// Standalone module exporting utility functions.
//

/* COPYRIGHT AND LICENSE NOTICE
 * 
 * Copyright (C) 2018  Sesh Sadasivam
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Hides a DOM element by setting its display style to `none`.
 * @param {HTMLElement} el sdfsdf
 */
function hide(el) {
  let hidden = el.style.display;
  if (!hidden || hidden !== "none") {
    el.style.display = "none";
  }
}
/**
 * Makes a DOM element visible by changing its display style.
 * Its display style is changed to `table-row` by default, or to `block`
 * if `displayAsBlock` is set to `true`.
 * @param {HTMLElement} el 
 * @param {boolean} [displayAsBlock=false] If set to true, the element's display style will be changed to block.
 */
function show(el, displayAsBlock=false) {
  let hidden = el.style.display;
  if (hidden && hidden === "none") {
    el.style.display = (displayAsBlock ? "block" : "table-row");
  }
}

/**
 * Disables a DOM element by setting its `disabled` property to `true`.
 * @param {HTMLElement} el 
 */
function disable(el) {
  el.disabled = true;
}
/**
 * Enables a DOM element by setting its `disabled` property to `false`.
 * @param {HTMLElement} el 
 */
function enable(el) {
  el.disabled = false;
}

/**
 * Selects option with value `optionValue` in HTML select element `selectEl`. 
 * @param {HTMLElement} selectEl selectEl is the HTML DOM element representing the element with the select tag.
 * @param {string} optionValue optionValue is the value of the option that must be selected in selectEl.
 */
function selectOption(selectEl, optionValue) {
  // Based on: https://stackoverflow.com/questions/7373058/changing-the-selected-option-of-an-html-select-element
  for (var opt, j = 0; opt = selectEl.options[j]; ++j) {
    if (opt.value === optionValue) {
      selectEl.selectedIndex = j;
      break;
    }
  }
}

/**
 * Removes all nodes in the DOM tree that are children of `el`.
 * @param {HTMLElement} el 
 */
function removeChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}


// CHROME STORAGE

/**
 * Saves key-value pairs contained in `data` to Chrome Storage. Triggers a `save_option_success` event on success.
 * @param {Object} data data contains the key-value pairs to be saved to Chrome storage.
 * @param {boolean} [suppressEvent=false] If suppressEvent is set to false, the save_options_success event is not triggered.
 */
function saveToChromeStorage(data, suppressEvent = false) {
  chrome.storage.sync.set(data, () => {
    if (!suppressEvent) {
      document.dispatchEvent(new Event('save_options_success'));
    }
  });
}


// NETWORK

/**
 * Generates a URL to the course page of the course with the given `network_id`.
 * @param {string} network_id 
 */
function generateSamplePiazzaURL(network_id) {
  return 'https://piazza.com/class/' + network_id
}

/**
 * Extracts the network ID from the given `url` if it is a properly formatted URL from a Piazza course.
 * @param {string} url 
 * @returns {string} network ID extracted from Piazza url.
 */
function getNetworkIDFromPiazzaURL(url) {
  let piazzaURLBegin = 'https://piazza.com/class/';
  if (url.indexOf(piazzaURLBegin) !== 0) {
    return '';
  }
  let network_id = url.substr(piazzaURLBegin.length);
  // Sanitize any query parameters
  let positionOfQuery = network_id.indexOf('?');
  if (positionOfQuery !== -1) {
    network_id = network_id.substr(0, positionOfQuery);
  }
  return network_id.replace(/[^a-zA-Z0-9]/g, '');
}


// Inspired by: https://stackoverflow.com/a/901144/5868796
/**
 * Extract URL parameter `name` from given `url`.
 * @param {string} name 
 * @param {string=} [url] If unspecified, will use the current window's URL.
 * @returns {string?}
 */
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// From: https://stackoverflow.com/a/23945027/5868796
/**
 * Extracts the full hostname (including subdomains) from a given URL.
 * @param {string} url 
 * @returns {string}
 */
function extractHostname(url) {
  let hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }
  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];
  return hostname;
}
/**
 * Extracts the hostname (stripping any subdomains).
 * @param {string} url 
 * @returns {string}
 */
function extractRootDomain(url) {
  var domain = extractHostname(url),
      splitArr = domain.split('.'),
      arrLen = splitArr.length;

  //extracting the root domain here
  //if there is a subdomain 
  if (arrLen > 2) {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 1].length == 2 && splitArr[arrLen - 1].length == 2) {
          //this is using a ccTLD
          domain = splitArr[arrLen - 3] + '.' + domain;
      }
  }
  return domain;
}


/**
 * Gets the saved network ID for Piazza Links.
 *
 * @param {function(string)} callback called with the saved network ID
 *     on success, or with a falsy value if no network ID is retrieved
 *     (or if the user has opted not to enable links).
 */
function getSavedPiazzaNetworkID(callback) {
  // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
  // for chrome.runtime.lastError to ensure correctness even when the API call
  // fails.
  chrome.storage.sync.get(
    {
      network_id: '',
      links_enabled: true,
      omnibox_enabled: true,
    }, (items) => {
      //if (!items.links_enabled || !items.network_id) return;
      callback(chrome.runtime.lastError ? null : items);
    }
  );
}


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_js__ = __webpack_require__(0);
//
// replaceWithPiazzaLinks.js
// This script is injected into all web pages. It periodically searches
// for text in the form of a Piazza post reference, and converts them
// into hyperlinks to the respective posts.
//

/* COPYRIGHT AND LICENSE NOTICE
 * 
 * Copyright (C) 2018  Sesh Sadasivam
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */



// Content Script that will replace text in the page with
// links to Piazza

// From: https://stackoverflow.com/a/29301739/5868796
var matchText = function(node, regex, callback, excludeElements) { 
  excludeElements || (excludeElements = ['script', 'style', 'iframe', 'canvas']);
  var child = node.firstChild;

  while (child) {
    switch (child.nodeType) {
    case 1:
      if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1)
        break;
      if (child.contenteditable) {
        console.log("COntent editable:", child);
      }
      matchText(child, regex, callback, excludeElements);
      break;
    case 3:
      var bk = 0;
      child.data.replace(regex, function(all) {
        var args = [].slice.call(arguments),
          offset = args[args.length - 2],
          newTextNode = child.splitText(offset+bk), tag;
        bk -= child.data.length + all.length;

        newTextNode.data = newTextNode.data.substr(all.length);
        tag = callback.apply(window, [child].concat(args));
        child.parentNode.insertBefore(tag, newTextNode);
        child = newTextNode;
      });
      regex.lastIndex = 0;
      break;
    }

    child = child.nextSibling;
  }

  return node;
};


function findAllPiazzaRefs(network_id, el) {
  el = el || document.getElementsByTagName("body")[0];
  if (!network_id) {
    console.log("Error retrieving network_id");
    return;
  }

  matchText(
    el,
    /@[1-9][0-9]*/g,
    (node, match, offset) => {
      let hlink = document.createElement("a");
      hlink.href = `https://piazza.com/class/${network_id}?cid=${match.substr(1)}`;
      hlink.textContent = match;
      hlink.target = "_blank";
      return hlink;
    }
  );
}

function checkForLinks(el) {
  return ({network_id, links_enabled}) => {
    if (links_enabled && network_id) {
      findAllPiazzaRefs(network_id, el);
    }
  };
}


// // The following is based on: https://stackoverflow.com/a/39334319/5868796
// // Found via: https://stackoverflow.com/a/39508954/5868796
// function onMutation(mutations) {
//   for (var i = 0, len = mutations.length; i < len; i++) {
//     var added = mutations[i].addedNodes;
//     for (var j = 0, lenAdded = added.length; j < lenAdded; j++) {
//       var node = added[j];
//       utility.getSavedPiazzaNetworkID(checkForLinks(node));
//     }
//   }
// }
// var observer = new MutationObserver(onMutation);
// observer.observe(document, {
//     childList: true, // report added/removed nodes
//     subtree: true,   // observe any descendant elements
// });

setInterval(() => __WEBPACK_IMPORTED_MODULE_0__utility_js__["f" /* getSavedPiazzaNetworkID */](checkForLinks(document)), 3000);


/***/ })
/******/ ]);