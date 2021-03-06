/******************************************
Treehouse Techdegree:
FSJS Project 5 - Public API Requests
******************************************/
const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
let matchedArray = Array();
let directory;
let person = new Person();


init();


// FUNCTIONS

/***
  * Initalizes the program and sets any default values
  **/
function init() {
  // Fetch 12 random users and create new directory
  fetchData('https://randomuser.me/api/?results=12&exc=login,registered,id&nat=us&noinfo')
    .then(data => {
      directory = new Directory(data.results);
      directory.addSearchInput();
      directory.displayRandomEmployees();
      directory.createModal();
    })
    .catch((error) => console.log('An error occurred while fetching the data: ', error.message))
}


/***
  * Fetches and return json formatted data from a given url
  **/
function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
}


/***
  * Fill the modal with user information
  **/
function addModalInfo(selector, value) {
  document.querySelector(selector).innerHTML = value;
}


/***
  * Disable/Enable a given button based on 'disabled' boolean value
  **/
function disableBtn(selector, disabled) {
  if (disabled) {
    document.getElementById(selector).disabled = true;
    document.getElementById(selector).className = `btn ${selector} btn-disabled`;
  } else {
    document.getElementById(selector).disabled = false;
    document.getElementById(selector).className = `btn ${selector}`;

  }
}
