/******************************************
Treehouse Techdegree:
FSJS Project 5 - Public API Requests
******************************************/
const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
let directory;
let person = new Person();

init();















// FUNCTIONS

/***
  * Fetches and return json formatted data from a given url
  **/
function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
}


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








// EVENT LISTENERS

//document.querySelector('#').addEventListener();
