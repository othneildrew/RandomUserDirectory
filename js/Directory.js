/***
  * The Directory class accepts an array
  *
**/
class Directory {
  constructor (employees) {
    this.employees = employees;
  }


  addSearchInput() {
    searchContainer.innerHTML =
      `<form action="#" method="GET">
        <input type="search" id="search-input" class="search-input" placeholder="Search by name...">
        <p class="search-errors"></p>
      </form>`;


    // Add event listeners to search input
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

        person.current = Number(modalID);
        this.updateModal();
        this.showModal();
        this.handleModalButtonState();
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
              <h3 id="name" class="modal-name name cap"></h3>
              <p class="modal-text email"></p>
              <hr>
              <p class="modal-text phone"></p>
              <p class="modal-text address cap"></p>
              <p class="modal-text birthday"></p>
          </div>
      </div>

      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="btn modal-prev">Prev</button>
        <button type="button" id="modal-next" class="btn modal-next">Next</button>
      </div>`;

    modal.innerHTML = html;
    gallery.append(modal);

    // Add event listeners for modal buttons
    document.querySelector('#modal-close-btn').addEventListener('click', (e) => {
      this.hideModal();
    });

    document.querySelector('.modal-btn-container').addEventListener('click', (e) => {
      let btnID = e.target.getAttribute('id');

      if (btnID === 'modal-prev') {
        person.showPrev();
      } else if (btnID === 'modal-next') {
        person.showNext();
      }
    });
  }


  updateModal() {

    let current = person.current;

    document.querySelector('.modal-img').setAttribute('src', this.employees[current].picture.large);

    addModalInfo('.modal-name', `${this.employees[current].name.title}. ${this.employees[current].name.first} ${this.employees[current].name.last}`);

    addModalInfo('.modal-text.email', this.employees[current].email);

    addModalInfo('.modal-text.phone', this.employees[current].cell);

    addModalInfo('.modal-text.address', `${this.employees[current].location.street}, ${this.employees[current].location.city}, ${this.employees[current].location.state} ${this.employees[current].location.postcode}`);

    addModalInfo('.modal-text.birthday', `<strong>Birthday:</strong> ${person.formatDate(this.employees[current].dob.date)}
      (${this.employees[current].dob.age} yrs)`);
  }


  showModal() {
    document.querySelector('.modal-container').style.display = 'block';
  }


  hideModal () {
    document.querySelector('.modal-container').style.display = 'none';
  }


  handleModalButtonState() {
    let modalBtns = document.querySelectorAll('.modal-btn-container > .btn');




    modalBtns.forEach(button => {
      console.log(button);

      console.log(matchedArray);

      let current = person.current;

      if (matchedArray.length > 0) {
        let index = matchedArray.indexOf(current);

        if ((index - 1) < 0) {
          document.querySelector('.btn.modal-prev').disabled = true;
          document.querySelector('.btn.modal-prev').className = 'btn modal-prev btn-disabled';
        } else {
          document.querySelector('.btn.modal-prev').disabled = false;
          document.querySelector('.btn.modal-prev').className = 'btn modal-prev';
        }

        if ((index + 1) > matchedArray.length - 1) {
          document.querySelector('.btn.modal-next').disabled = true;
          document.querySelector('.btn.modal-next').className = 'btn modal-next btn-disabled';
        } else {
          document.querySelector('.btn.modal-next').disabled = false;
          document.querySelector('.btn.modal-next').className = 'btn modal-next';
        }
      } else {

        if ((current - 1) < 0) {
          document.querySelector('.btn.modal-prev').disabled = true;
          document.querySelector('.btn.modal-prev').className = 'btn modal-prev btn-disabled';
        } else {
          document.querySelector('.btn.modal-prev').disabled = false;
          document.querySelector('.btn.modal-prev').className = 'btn modal-prev';
        }

        if ((current + 1) > this.employees.length - 1) {
          document.querySelector('.btn.modal-next').disabled = true;
          document.querySelector('.btn.modal-next').className = 'btn modal-next btn-disabled';
        } else {
          document.querySelector('.btn.modal-next').disabled = false;
          document.querySelector('.btn.modal-next').className = 'btn modal-next';
        }

      }

    });
  }


  search (query) {
    let cardName = document.querySelectorAll('.card .card-name');
    matchedArray = Array();

    // Check if card names match query. If so, add to matchedArray
    cardName.forEach((name, index) => {
      if(name.textContent.indexOf(query) !== -1) {
        matchedArray.push(index);
      }
    });

    this.filter(matchedArray);
  }


  filter (array) {
    let searchErrors = document.querySelector('.search-errors');

    if (array.length <= 0) {
      searchErrors.textContent = 'No results found';
    } else {
      searchErrors.textContent = '';
    }

    // Show those cards that have a matching index value from array
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
