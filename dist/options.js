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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
    }, (items) => {
      if (!items.links_enabled || !items.network_id) return;
      callback(chrome.runtime.lastError ? null : items['network_id']);
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
//

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
    //"http://eecs280.org/data/links.json",
    "http://0.0.0.0:8000/data/links.json",
    jsonText => {
      let dynamicContent = JSON.parse(jsonText);
      callback(dynamicContent.links.piazza);
    }
  );
};
_umich.addCourse('EECS 280', _eecs280_getter);


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
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piazzaURLGetter_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_js__ = __webpack_require__(0);
//
// options.js
//




/**
 * Creates and returns a new DOM node with tag name `option` with given value
 * and text content.
 * @param {string} value 
 * @param {string} text 
 * @param {boolean=} [disabled=false] 
 * @param {boolean=} [selected=false] 
 * @returns {HTMLElement}
 */
function createOptionElement(value, text, disabled=false, selected=false) {
  let option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  option.disabled = disabled;
  option.selected = selected;
  return option;
}

//
// POPULATE CLASS LIST
//
function populateUniversityList(items) {
  let universitySelect = document.getElementById('piazza_university');
  // Remove all options from select
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["h" /* removeChildren */](universitySelect);
  // Add the default option
  universitySelect.appendChild(
    createOptionElement("", "Choose a university", true, true)
  );
  // Add universities
  for (let university of __WEBPACK_IMPORTED_MODULE_0__piazzaURLGetter_js__["a" /* piazzaURLGetter */]) {
    universitySelect.appendChild(
      createOptionElement(
        university.university_name,
        university.university_name,
      )
    );
  }
  // Add "Other" option
  universitySelect.appendChild(
    createOptionElement("_other", "Other")
  );
  // NOW: Check if the user had selected something before
  if (typeof items === "object" && items.university_name) {
    // Select the university
    __WEBPACK_IMPORTED_MODULE_1__utility_js__["j" /* selectOption */](universitySelect, items.university_name);
    changedUniversity(items);
  }
}
// Run it when the document has been loaded
document.addEventListener(
  'DOMContentLoaded', 
  () => {
    chrome.storage.sync.get(
      {
        university_name: "",
        course_name: "",
      },
      populateUniversityList,
    );
  }
);
// Listen to changes
document.getElementById('piazza_university')
  .addEventListener('change', changedUniversity);


function changedUniversity(items) {
  let universitySelect = document.getElementById('piazza_university');
  // First hide all other fields
  hideCourseList();
  hideNetworkInputs();
  hideOtherInfoBox();
  disablePiazzaURLInput();
  // Get the new selected university
  let university_name = universitySelect.value;
  if (university_name === "_other") {
    return userSelectedOtherUniversity(items);
  }
  let university = __WEBPACK_IMPORTED_MODULE_0__piazzaURLGetter_js__["a" /* piazzaURLGetter */].getUniversity(university_name);
  // Clear the course list
  let courseSelect = document.getElementById('piazza_course');
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["h" /* removeChildren */](courseSelect);
  // Add the default option
  courseSelect.appendChild(
    createOptionElement("", "Choose a course", true, true)
  );
  // Add the courses
  for (let course of university) {
    courseSelect.appendChild(
      createOptionElement(
        course.course_name,
        course.course_name,
      )
    );
  }
  // Add "Other" option
  courseSelect.appendChild(
    createOptionElement("_other", "Other")
  );
  // Show the course list
  showCourseList();
  //hideNetworkInputs();
  // Finally, save the selection to storage
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["i" /* saveToChromeStorage */]({
    university_name,
  });
  // REALLY FINALLY: Check if the user had selected something before
  if (typeof items === "object" && items.course_name) {
    // Select the course
    __WEBPACK_IMPORTED_MODULE_1__utility_js__["j" /* selectOption */](courseSelect, items.course_name);
    userSelectedCourse(items);
  }
  // else {
  //   return userSelectedOtherCourse(items);
  // }
}
// Listen to changes
document.getElementById('piazza_course')
  .addEventListener('change', userSelectedCourse);


function userSelectedCourse(items) {
  let university_name = document.getElementById('piazza_university').value;
  let course_name = document.getElementById('piazza_course').value;
  hideOtherInfoBox();
  disablePiazzaURLInput();
  if (course_name === "_other") {
    return userSelectedOtherCourse();
  }
  let course = __WEBPACK_IMPORTED_MODULE_0__piazzaURLGetter_js__["a" /* piazzaURLGetter */].getUniversity(university_name).getCourse(course_name);
  // Show the network options
  showNetworkInputs();
  // And get the piazza URL
  course.getPiazzaLink(populatePiazzaURL);
  // And finally, save the selection to storage
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["i" /* saveToChromeStorage */]({
    course_name,
  });
}


//
// OTHER
//

function userSelectedOtherUniversity(items) {
  hideCourseList();
  showNetworkInputs();
  enablePiazzaURLInput();
  showOtherInfoBox();
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["i" /* saveToChromeStorage */]({
    university_name: '_other',
    course_name: '',
  });
}

function userSelectedOtherCourse(items) {
  showNetworkInputs();
  showOtherInfoBox();
  enablePiazzaURLInput();
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["i" /* saveToChromeStorage */]({
    course_name: '_other',
  });
}


// NETWORK Stuff

function populatePiazzaURL(url) {
  document.getElementById('piazza_url').value = url;
  updateNetworkID();
}


// Wrappers around utilities


function hideCourseList() {
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["g" /* hide */](document.getElementById('piazza_course_tr'));
}
function showCourseList() {
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["k" /* show */](document.getElementById('piazza_course_tr'));
}


function hideNetworkInputs() {
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["g" /* hide */](document.getElementById('network_id_tr'));
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["g" /* hide */](document.getElementById('piazza_url_tr'));
}
function showNetworkInputs() {
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["k" /* show */](document.getElementById('network_id_tr'));
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["k" /* show */](document.getElementById('piazza_url_tr'));
}

function disablePiazzaURLInput() {
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["a" /* disable */](document.getElementById('piazza_url'));
}
function enablePiazzaURLInput() {
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["b" /* enable */](document.getElementById('piazza_url'));
}


function hideOtherInfoBox() {
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["g" /* hide */](document.getElementById('piazza_other_tr'));
}
function showOtherInfoBox() {
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["k" /* show */](document.getElementById('piazza_other_tr'));
}


//
// SAVE and RESTORE
//


// Saves options to chrome.storage
function save_options() {
  var network_id = document.getElementById('network_id').value;
  var links_enabled = document.getElementById('links_enabled').checked;
  var omnibox_enabled = document.getElementById('omnibox_enabled').checked;
  __WEBPACK_IMPORTED_MODULE_1__utility_js__["i" /* saveToChromeStorage */]({
    network_id,
    links_enabled,
    omnibox_enabled,
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    network_id: '',
    links_enabled: true,
    omnibox_enabled,
    course_name: '',
    university_name: '',
  }, function(items) {
    document.getElementById('network_id').value = items.network_id;
    document.getElementById('piazza_url').value = __WEBPACK_IMPORTED_MODULE_1__utility_js__["c" /* generateSamplePiazzaURL */](items.network_id);
    document.getElementById('links_enabled').checked = items.links_enabled;
    document.getElementById('omnibox_enabled').checked = items.omnibox_enabled;
  });
}


//
// Network ID and Piazza URLs
//

function updateNetworkID() {
  let new_url = document.getElementById('piazza_url').value;
  document.getElementById('network_id').value = __WEBPACK_IMPORTED_MODULE_1__utility_js__["d" /* getNetworkIDFromPiazzaURL */](new_url);
  // Save the option
  save_options();
}


function updatePiazzaExampleLink() {
  for (var i = 1; i <= 2; ++i) {
    let el = document.getElementById('link_example_' + i);
    __WEBPACK_IMPORTED_MODULE_1__utility_js__["h" /* removeChildren */](el);
    el.textContent = "@6";
  }
}

//
// EVENTS
//

// Update network_id every time piazza_url is updated
document.getElementById('piazza_url')
  .addEventListener('keyup', updateNetworkID);

// Select entire Piazza URL when clicked (so that it can easily be replaced).
// Inspiration: https://stackoverflow.com/q/4067469/5868796
(function () {
  var focusedElement;
  document.getElementById('piazza_url')
    .addEventListener('focus', function () {
      if (focusedElement == this) return; //already focused, return so user can now place cursor at specific point in input.
      focusedElement = this;
      setTimeout(function () { document.execCommand("selectall", null, false) }, 50); //select all text in any field on focus for easy re-entry. Delay sightly to allow focus to "stick" before selecting.
  });
  document.getElementById('piazza_url')
    .addEventListener('blur', function () {
      focusedElement = null;
  });
})();

// Autosave
document.getElementById('network_id').addEventListener('change', save_options);
document.getElementById('links_enabled').addEventListener('change', save_options);
document.getElementById('omnibox_enabled').addEventListener('change', save_options);
document.addEventListener('save_options_success', updatePiazzaExampleLink);

// Restore Options
document.addEventListener('DOMContentLoaded', restore_options);


// TODO: Privacy policy
document.getElementById('privacy_policy_link').href = "#";


/***/ })
/******/ ]);