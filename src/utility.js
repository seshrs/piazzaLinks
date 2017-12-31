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
export function hide(el) {
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
export function show(el, displayAsBlock=false) {
  let hidden = el.style.display;
  if (hidden && hidden === "none") {
    el.style.display = (displayAsBlock ? "block" : "table-row");
  }
}

/**
 * Disables a DOM element by setting its `disabled` property to `true`.
 * @param {HTMLElement} el 
 */
export function disable(el) {
  el.disabled = true;
}
/**
 * Enables a DOM element by setting its `disabled` property to `false`.
 * @param {HTMLElement} el 
 */
export function enable(el) {
  el.disabled = false;
}

/**
 * Selects option with value `optionValue` in HTML select element `selectEl`. 
 * @param {HTMLElement} selectEl selectEl is the HTML DOM element representing the element with the select tag.
 * @param {string} optionValue optionValue is the value of the option that must be selected in selectEl.
 */
export function selectOption(selectEl, optionValue) {
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
export function removeChildren(el) {
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
export function saveToChromeStorage(data, suppressEvent = false) {
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
export function generateSamplePiazzaURL(network_id) {
  return 'https://piazza.com/class/' + network_id
}

/**
 * Extracts the network ID from the given `url` if it is a properly formatted URL from a Piazza course.
 * @param {string} url 
 * @returns {string} network ID extracted from Piazza url.
 */
export function getNetworkIDFromPiazzaURL(url) {
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
export function getParameterByName(name, url) {
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
export function extractHostname(url) {
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
export function extractRootDomain(url) {
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
export function getSavedPiazzaNetworkID(callback) {
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
