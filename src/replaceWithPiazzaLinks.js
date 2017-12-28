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

import * as utility from './utility.js';

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
  return network_id => findAllPiazzaRefs(network_id, el);
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

setInterval(() => utility.getSavedPiazzaNetworkID(checkForLinks(document)), 3000);
