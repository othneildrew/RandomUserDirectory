/***
  * The Directory class accepts an array
  *
**/
class Directory {
  constructor (employees) {
    this.employees = employees;
  }

  addSearchInput() {
    searchContainer.innerHTML = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Start typing to search...">
        <!--<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">-->
    </form>`;

    document.querySelector('#search-input').addEventListener('keyup', () => {
      let searchValue = document.querySelector('#search-input').value;
      this.search(searchValue);
    });
  }

  displayRandomEmployees() {
    // Loop through all employees and show as card with user information
    this.employees.forEach((employee, index) => {
      let employeeCard = document.createElement('div');
      employeeCard.className = 'card';
      employeeCard.setAttribute('employee', index);

      let html =
        `<div class="card-img-container">
          <img class="card-img" src="${employee.picture.large}" alt="Profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>`;

      employeeCard.innerHTML = html;
      gallery.append(employeeCard);
    });
  }

  showModal() {



  }

  hideModal () {

  }

  search (query) {

    let matchedArray = Array();

    let cardName = document.querySelectorAll('.card .card-name');


    cardName.forEach((name) => {
      console.log(name);
      if(name.textContent.match(query)) {
        //name.parentNode.querySelector('.card').style.display = 'none';
        let highlighted = name.textContent.replace(query, '<span style="background-color: yellow;">'+ query +'</span>');
        name.innerHTML = highlighted;
        console.log(cardName);
      }



    });




    console.log(cardName);




  }

  filter () {

  }



}
