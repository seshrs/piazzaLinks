//
// options.js
// This script file powers the interactivity of the extension's Options page.
// It's included in options.html.
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

import {piazzaURLGetter} from './piazzaURLGetter.js';
import * as utility from './utility.js';

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
  utility.removeChildren(universitySelect);
  // Add the default option
  universitySelect.appendChild(
    createOptionElement("", "Choose a university", true, true)
  );
  // Add universities
  for (let university of piazzaURLGetter) {
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
    utility.selectOption(universitySelect, items.university_name);
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
  let university = piazzaURLGetter.getUniversity(university_name);
  // Clear the course list
  let courseSelect = document.getElementById('piazza_course');
  utility.removeChildren(courseSelect);
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
  utility.saveToChromeStorage({
    university_name,
  });
  // REALLY FINALLY: Check if the user had selected something before
  if (typeof items === "object" && items.course_name) {
    // Select the course
    utility.selectOption(courseSelect, items.course_name);
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
  let course = piazzaURLGetter.getUniversity(university_name).getCourse(course_name);
  // Show the network options
  showNetworkInputs();
  // And get the piazza URL
  course.getPiazzaLink(populatePiazzaURL);
  // And finally, save the selection to storage
  utility.saveToChromeStorage({
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
  utility.saveToChromeStorage({
    university_name: '_other',
    course_name: '',
  });
}

function userSelectedOtherCourse(items) {
  showNetworkInputs();
  showOtherInfoBox();
  enablePiazzaURLInput();
  utility.saveToChromeStorage({
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
  utility.hide(document.getElementById('piazza_course_tr'));
}
function showCourseList() {
  utility.show(document.getElementById('piazza_course_tr'));
}


function hideNetworkInputs() {
  utility.hide(document.getElementById('network_id_tr'));
  utility.hide(document.getElementById('piazza_url_tr'));
}
function showNetworkInputs() {
  utility.show(document.getElementById('network_id_tr'));
  utility.show(document.getElementById('piazza_url_tr'));
}

function disablePiazzaURLInput() {
  utility.disable(document.getElementById('piazza_url'));
}
function enablePiazzaURLInput() {
  utility.enable(document.getElementById('piazza_url'));
}


function hideOtherInfoBox() {
  utility.hide(document.getElementById('piazza_other_tr'));
}
function showOtherInfoBox() {
  utility.show(document.getElementById('piazza_other_tr'));
}


//
// SAVE and RESTORE
//


// Saves options to chrome.storage
function save_options() {
  var network_id = document.getElementById('network_id').value;
  var links_enabled = document.getElementById('links_enabled').checked;
  var omnibox_enabled = document.getElementById('omnibox_enabled').checked;
  utility.saveToChromeStorage({
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
    document.getElementById('piazza_url').value = utility.generateSamplePiazzaURL(items.network_id);
    document.getElementById('links_enabled').checked = items.links_enabled;
    document.getElementById('omnibox_enabled').checked = items.omnibox_enabled;
  });
}


//
// Network ID and Piazza URLs
//

function updateNetworkID() {
  let new_url = document.getElementById('piazza_url').value;
  document.getElementById('network_id').value = utility.getNetworkIDFromPiazzaURL(new_url);
  // Save the option
  save_options();
}


function updatePiazzaExampleLink() {
  for (var i = 1; i <= 2; ++i) {
    let el = document.getElementById('link_example_' + i);
    utility.removeChildren(el);
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
