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
    //"http://eecs280.org/data/links.json",
    "http://0.0.0.0:8000/data/links.json",
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

export var piazzaURLGetter;
