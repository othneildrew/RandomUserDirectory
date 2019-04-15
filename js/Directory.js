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

    document.querySelector('#search-input').addEventListener('mouseup', (e) => {
      // Code adapted by: https://stackoverflow.com/questions/14498396/event-fired-when-clearing-text-input-on-ie10-with-clear-icon#14498921
      let oldValue = this.value;

      setTimeout(() => {
        let newValue = e.target.value;
        if (newValue.length === 0) {
          this.clearFilter();
        }
      }, 1);
    });
  }


  displayRandomEmployees() {
    // Loop through all employees, show card with user info
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


      // Add event listener to card
      employeeCard.addEventListener('click', (e) => {
        //directory.showModal();
        let target = e.target.parentNode.parentNode.getAttribute('class');
        let modalID;

        // DOM traversal based on target that triggered event
        if (target === 'card') {
          modalID = e.target.parentNode.parentNode.getAttribute('employee');
        }
        else if (target === 'card-info-container') {
          modalID = e.target.parentNode.parentNode.parentNode.getAttribute('employee');
        } else if (target === 'gallery') {
          modalID = e.target.parentNode.getAttribute('employee');
        } else if (target === null) {
          modalID = e.target.getAttribute('employee');
        }

        person.current = modalID;
        this.updateModal();
        this.showModal();
      });;
    });
  }


  createModal () {

    let modal = document.createElement('div');
    modal.className = 'modal-container';

    let html =
      `<div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                  <h3 id="name" class="modal-name name cap">name</h3>
                  <p class="modal-text email">email</p>
                  <p class="modal-text city cap">city</p>
                  <hr>
                  <p class="modal-text phone">(555) 555-5555</p>
                  <p class="modal-text address">123 Portland Ave., Portland, OR 97204</p>
                  <p class="modal-text birthday">Birthday: 10/21/2015</p>
              </div>
          </div>

          // IMPORTANT: Below is only for exceeds tasks
          <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
          </div>`;

    modal.innerHTML = html;
    gallery.append(modal);

    // Add modal event listeners
    document.querySelector('#modal-close-btn').addEventListener('click', (e) => {
      this.hideModal();
    });



  }


  updateModal() {

    let current = person.current;

    console.log(this.employees[current]);

    document.querySelector('.modal-img').setAttribute('src', this.employees[current].picture.large);

    document.querySelector('.modal-name').textContent =
      `${this.employees[current].name.title}. ${this.employees[current].name.first} ${this.employees[current].name.last}`;

    document.querySelector('.modal-text.email').textContent = this.employees[current].email;

    document.querySelector('.modal-text.city').textContent = this.employees[current].location.city;

    document.querySelector('.modal-text.phone').textContent = this.employees[current].cell;

    document.querySelector('.modal-text.address').textContent = this.employees[current].cell;

    document.querySelector('.modal-text.address').textContent =
      `${this.employees[current].location.street}, ${this.employees[current].location.city}, ${this.employees[current].location.state} ${this.employees[current].location.postcode}`;

    document.querySelector('.modal-text.birthday').textContent =
      `Birthday: ${person.formatDate(this.employees[current].dob.date)}
      (${this.employees[current].dob.age} yrs)`;
  }


  showModal() {
    document.querySelector('.modal-container').style.display = 'block';
  }


  hideModal () {
    document.querySelector('.modal-container').style.display = 'none';
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
    // Display cards that has matching index of array values
    let cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
      if (array.includes(index)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }


  clearFilter () {
    this.search('');
    document.querySelector('#search-input').value = '';
  }

}
