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
    </form>`;

    document.querySelector('#search-input').addEventListener('keyup', () => {
      let searchValue = document.querySelector('#search-input').value;
      this.search(searchValue);
    });
  }

  displayRandomEmployees() {
    // Loop through all employees, show card with user info
    this.employees.forEach((employee, index) => {
      let employeeCard = document.createElement('div');
      employeeCard.className = 'card';
      employeeCard.setAttribute('employee', index);

      // Add vent listener to card
      employeeCard.addEventListener('click', (e) => {
        //directory.showModal();
        console.log(e.target.parentNode);
      });;

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
    let cardName = document.querySelectorAll('.card .card-name');
    let matchedArray = Array();

    cardName.forEach((name, index) => {

      if(name.textContent.indexOf(query) !== -1) {
        // Highlight matching keywords in card names
        let highlighted = name.textContent.replace(query, `<span class="highlighted">${query}</span>`);
        name.innerHTML = highlighted;
        // Add cards with matching names to matchedArray
        matchedArray.push(index);
      }
    });
    this.filter(matchedArray);
  }

  filter (array) {
    let cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
      card.style.display = 'none';
      if (array.includes(index)) {
        card.style.display = 'flex';
      }
    });
  }

  clearFilter () {
    let cards = document.querySelectorAll('.card');

    cards.forEach((card) => card.style.display = 'flex');

  }

}
