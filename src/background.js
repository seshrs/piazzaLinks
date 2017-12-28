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

import {piazzaURLGetter} from './piazzaURLGetter.js';
import * as utility from './utility.js';

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
  piazzaURLGetter
    .getUniversity(university_name)
    .getCourse(course_name)
    .getPiazzaLink(
      url => {
        utility.saveToChromeStorage({
          network_id: utility.getNetworkIDFromPiazzaURL(url),
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
    let cid = utility.getParameterByName('cid', url);
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
    var query = utility.getParameterByName('q', details.url).substr(1);
    // console.log("query:", query);
    utility.getSavedPiazzaNetworkID(
      network_id => {
        if (network_id) {
          let piazzaURL = `https://piazza.com/class/${network_id}?cid=${query}`;
          chrome.tabs.update({"url": piazzaURL});
        }
      }
    );
  },
  {"url": [{pathContains: "search", queryContains: "q=%40"}]}
);
