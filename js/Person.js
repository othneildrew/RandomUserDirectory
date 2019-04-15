/***
  * Employee.js - Class
  *
**/
class Person {

  constructor () {
    this.current = null;
  }


  showNext () {


  }


  showPrevious () {


  }


  formatDate (date) {
    date = new Date(date);
    return new Intl.DateTimeFormat('en-US').format(date);
  }

}
