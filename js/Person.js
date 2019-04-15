/***
  * Employee.js - Class
  *
**/
class Person {

  constructor () {
    this.current = null;
  }


  showPrev () {
    // Show employee info with index value before current if the index is anything, but less than 0
    if (matchedArray.length > 0) {
      // Use 'matchedArray' if it isn't empty from search
      let index = matchedArray.indexOf(this.current);

      if (index !== 0) {
        let newIndex = matchedArray.indexOf(this.current) - 1;
        this.current = matchedArray[newIndex];
        directory.updateModal();
      }

    } else {
      // If no search performed, use Directory.employees
      let employeeID = this.current - 1;

      if (employeeID >= 0) {
        this.current = employeeID;
        directory.updateModal();
      }
    }
    directory.handleModalButtonState();
  }


  showNext () {
    // Show employee info with index value after current if the index is anything, but greater than the specified length
    if (matchedArray.length > 0) {
      // Use 'matchedArray' if it isn't empty from search
      let index = matchedArray.indexOf(this.current);

      if (index !== matchedArray.length - 1) {
        let nextIndex = matchedArray.indexOf(this.current) + 1;
        this.current = matchedArray[nextIndex];
        directory.updateModal();
      }

    } else {
      // If no search performed, use Directory.employees
      let employeeID = this.current + 1;

      if (employeeID <= directory.employees.length - 1) {
        this.current = employeeID;
        directory.updateModal();
      }
    }
    directory.handleModalButtonState();
  }


  formatDate (date) {
    // Formats date: MM/DD/YYYY
    date = new Date(date);
    return new Intl.DateTimeFormat('en-US').format(date);
  }

}
