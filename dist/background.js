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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return piazzaURLGetter; });
//
// piazzaURLGetter.js
// Creates and exports the object `piazzaURLGetter` with information
// on university courses that support dynamic fetching of their current
// Piazza URL.
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

class Course {
  /**
   * Creates a new Course with the given course name and Piazza URL Getter.
   * @param {string} course_name 
   * @param {function(function(string))} getPiazzaLinkFn 
   */
  constructor(course_name, getPiazzaLinkFn) {
    this.course_name = course_name;
    this.getPiazzaLink = getPiazzaLinkFn;
  }
}

class University {
  /**
   * Creates a new empty University with the given name.
   * 
   * University objects implement the Iterable interface, so it is possible
   * to iterate over the courses in a University object using a `for...of`
   * loop.
   * @param {string} university_name 
   */
  constructor(university_name) {
    this.university_name = university_name;
    this._courseList = [];
    this[Symbol.iterator] = function* () {
      for (var i = 0; i < this._courseList.length; ++i) {
        yield this._courseList[i];
      }
    };
  }

  /**
   * Returns a course in the University object with the specified 
   * `course_name`.
   * @param {string} course_name 
   * @returns {Course}
   * @throws Will throw an error message if no course with the given
   * `course_name` can be found.
   */
  getCourse(course_name) {
    for (var i = 0; i < this._courseList.length; ++i) {
      if (this._courseList[i].course_name === course_name) {
        return this._courseList[i];
      }
    }
    throw "Could not find course name ("
      + course_name 
      + ") in university (" 
      + this.university_name 
      + ")";
  }

  /**
   * Creates a new course with the given name and url getter function.
   * @param {string} course_name 
   * @param {function(function(string))} getPiazzaLinkFn 
   * @returns {University} Returns this university object.
   */
  addCourse(course_name, getPiazzaLinkFn) {
    this._courseList.push(new Course(course_name, getPiazzaLinkFn));
    return this;
  }
}

class PiazzaURLGetter {
  constructor() {
    this._universityList = [];
    this[Symbol.iterator] = function* () {
      for (let i = 0; i < this._universityList.length; ++i) {
        yield this._universityList[i];
      }
    };
  }

  /**
   * Returns a university in this PiazzaURLGetter object with the specified
   * `university_name`.
   * @param {string} university_name 
   * @returns {University}
   * @throws Will throw an error message if no university with the given
   * `university_name` can be found.
   */
  getUniversity(university_name) {
    for (var i = 0; i < this._universityList.length; ++i) {
      if (this._universityList[i].university_name === university_name) {
        return this._universityList[i];
      }
    }
    throw "Could not find university name ("
      + university_name 
      + ")";
  }

  /**
   * Creates a new University object with the given name and
   * adds it to this PiazzaURLGetter object.
   * @param {string} university_name 
   * @returns {void}
   *//**
   * Adds the given University object to this PiazzaURLGetter.
   * @param {University} university
   * @returns {void}
   */
  addUniversity(university) {
    if (typeof university === "string") {
      this._universityList.push(new University(university));
    }
    else if (university instanceof University) {
      this._universityList.push(university);
    }
    else {
      throw {
        message: "Invalid input to addUniversity in PiazzaURLGetter: ", 
        university
      };
    }
  }
}

piazzaURLGetter = new PiazzaURLGetter;



/* UMICH */
let _umich = new University('University of Michigan');
piazzaURLGetter.addUniversity(_umich);

let _eecs280_getter = callback => {
  _ajaxRequest(
    "http://eecs280.org/data/links.json",
    // "http://0.0.0.0:8000/data/links.json",
    jsonText => {
      let dynamicContent = JSON.parse(jsonText);
      callback(dynamicContent.links.piazza);
    }
  );
};
_umich.addCourse('EECS 280', _eecs280_getter);

let _eecs485_getter = callback => {
  _ajaxRequest(
    "https://eecs485staff.github.io/eecs485.org/",
    text => {
      let matchResults = text.match(/https:\/\/piazza\.com\/class\/[0-9A-Za-z]*/);
      if (matchResults.length < 1) {
        return '';
      }
      callback(matchResults[0]);
    }
  );
};
_umich.addCourse('EECS 485', _eecs485_getter);


/* TEST */
// let _test = new University('Test');
// piazzaURLGetter.addUniversity(_test);
// _test.addCourse('Test 281', callback => callback('https://piazza.com/class/test_uni'));



/* HELPERS */

/**
 * Asynchronously fetches content at `url`, and calls `callback` with the string
 * representation of the fetched content.
 * @param {string} url 
 * @param {function(string)} callback 
 * @returns {void}
 */
function _ajaxRequest(url, callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
      if (xmlhttp.status == 200) {
        callback(xmlhttp.responseText);
      }
      else if (xmlhttp.status == 400) {
        console.log("Could not load url:", url);
      }
      else {
        console.log('Could not load url, something else other than 200 was returned');
        console.log("URL:", url);
      }
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

var piazzaURLGetter;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piazzaURLGetter_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_js__ = __webpack_require__(0);
//
// background.js
// This is the background script that runs eternally. It:
//   - Checks for updates to the Piazza Network ID periodically, if applicable
//   - Enables and controls the page action button for relevant pages
//   - Listens to search queries in the omnibox and redirects queries for
//     Piazza Posts

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




//
// PART 0: OPTIONS
//         Open up the options tab the first time this extension is started.
//
chrome.runtime.onInstalled.addListener(
  object => {
    chrome.tabs.create(
      {url: chrome.extension.getURL("options.html")},
      tab => {
        console.log("Options launched in new tab");
      },
    );
  },
);


//
// PART 1: UPDATE
//         Check every week for updated class Piazza URL
//         This applies only if the user selected a class in the options.
//
function updateClassPiazzaURL({university_name, course_name}){
  if (university_name === "_other" || course_name === "_other") {
    // Nothing to do
    return;
  }
  __WEBPACK_IMPORTED_MODULE_0__piazzaURLGetter_js__["a" /* piazzaURLGetter */]
    .getUniversity(university_name)
    .getCourse(course_name)
    .getPiazzaLink(
      url => {
        __WEBPACK_IMPORTED_MODULE_1__utility_js__["i" /* saveToChromeStorage */]({
          network_id: __WEBPACK_IMPORTED_MODULE_1__utility_js__["d" /* getNetworkIDFromPiazzaURL */](url),
        });
      }
    );
}
// Do this every week
setInterval(
  () => {
    chrome.storage.sync.get(
      {
        university_name: '',
        course_name: '',
      },
      updateClassPiazzaURL
    );
  },
  1000 * 60 * 60 * 24 * 7, // 1 week
);



//
// PART 2: PAGE ACTION
//         Enable the page action on Piazza sites when a post has
//         been clicked. When the page action is clicked, the post
//         number is copied to the clipboard.
//

// When page action is clicked, copy the CID
chrome.pageAction.onClicked.addListener(
  tab => {
    let {url} = tab;
    let cid = __WEBPACK_IMPORTED_MODULE_1__utility_js__["e" /* getParameterByName */]('cid', url);
    if (cid) {
      var textarea = document.createElement("textarea");
      textarea.textContent = "@" + cid;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          //return false;
      } finally {
          document.body.removeChild(textarea);
      }
    }
  }
);


// Set listener to add rules for showing page action
let pageActionRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostContains: "piazza.com", queryContains: "cid="}
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

chrome.runtime.onInstalled.addListener(
  details => {
    chrome.declarativeContent.onPageChanged.removeRules(
      undefined,
      () => {
        chrome.declarativeContent.onPageChanged.addRules([pageActionRule]);
      }
    );
  }
);


//
// PART 3: OMNIBOX
//         Listen to Omnibox for search queries.
//         If the search query is a Piazza post, redirect there.

// Set a listener to redirect @[PostNumber] requests from omnibox
chrome.webNavigation.onBeforeNavigate.addListener(
  (details) => {
    // console.log("details", details);
    var query = __WEBPACK_IMPORTED_MODULE_1__utility_js__["e" /* getParameterByName */]('q', details.url).substr(1);
    // console.log("query:", query);
    __WEBPACK_IMPORTED_MODULE_1__utility_js__["f" /* getSavedPiazzaNetworkID */](
      ({network_id, omnibox_enabled}) => {
        console.log({network_id, omnibox_enabled});
        if (omnibox_enabled && network_id) {
          let piazzaURL = `https://piazza.com/class/${network_id}?cid=${query}`;
          chrome.tabs.update({"url": piazzaURL});
        }
      }
    );
  },
  {"url": [{pathContains: "search", queryContains: "q=%40"}]}
);


/***/ })
/******/ ]);