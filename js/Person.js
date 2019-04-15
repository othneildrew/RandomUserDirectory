/***
  * Employee.js - Class
  *
**/
class Person {

  constructor () {
    this.current = null;
  }


  showPrev () {
    if (matchedArray.length > 0) {
      let index = matchedArray.indexOf(this.current);

      if (index !== 0) {
        let newIndex = matchedArray.indexOf(this.current) - 1;
        this.current = matchedArray[newIndex];
        directory.updateModal();
      }

    } else {
      let employeeID = this.current - 1;

      if (employeeID >= 0) {
        this.current = employeeID;
        directory.updateModal();
      }
    }
    directory.handleModalButtonState();
  }


  showNext () {
    if (matchedArray.length > 0) {
      let index = matchedArray.indexOf(this.current);

      if (index !== matchedArray.length - 1) {
        let nextIndex = matchedArray.indexOf(this.current) + 1;
        this.current = matchedArray[nextIndex];
        directory.updateModal();
      }

    } else {
      let employeeID = this.current + 1;

      if (employeeID <= directory.employees.length - 1) {
        this.current = employeeID;
        directory.updateModal();
      }
    }
    directory.handleModalButtonState();
  }


  formatDate (date) {
    date = new Date(date);
    return new Intl.DateTimeFormat('en-US').format(date);
  }

}
