const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const createStudentForm = $(".create_student__form");
const tableContent = $(".table-content");
const resetButton = $(".reset__button");

const app = {
  people: [],
  //render row
  renderRow: function () {
    const _this = this;
    return (tableContent.innerHTML = this.people
      .map((person, index) => {
        return `<div class="table-row" data-index=${index}>
                  <div class="table-data">${index + 1}</div>
                  <div class="table-data">${person.name}</div>
                  <div class="table-data">${person.age}</div>
                  <div class="table-data">${person.gender}</div>
                  <div class="table-data">${
                    person.hobbies ? person.hobbies : ""
                  }</div>
                </div>`;
      })
      .join(""));
  },
  handleEvents: function () {
    const _this = this;
    //onReset

    resetButton.addEventListener("click", () => {
      createStudentForm.reset();
    });

    //onSubmit
    createStudentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      var formData = new FormData(createStudentForm);
      const person = {};
      formData.forEach((value, key) => {
        // data is plain text
        if (!person[key]){
          person[key] = value;
        } 
        // data is array
        else if (person[key] && !Array.isArray(person[key])) {
          const temp = person[key];
          person[key] = [temp, value];
        } else {
          person[key].push(value);
        }
      });

      _this.people.unshift(person);
      _this.renderRow();
      createStudentForm.reset();
    });
    //onSelectData
    tableContent.addEventListener("click", (e) => {
      const dataRow = e.target.closest(".table-row");
      
      if (dataRow) {
        createStudentForm.reset();
        // Handle when clicking on the row
        const data = _this.people[Number(dataRow.dataset.index)];
        for (const key in data) {
          const input = document.getElementById(key);
          // handle radio data
          if (input === null && typeof data[key] === "string") {
            document.getElementById(data[key]).checked = true;
          // handle checkbox daata
          } else if (input === null && Array.isArray(data[key])) {
            data[key].forEach((data) => {
              document.getElementById(data).checked = true;
            });
          } 
          //handle plain text
          else {
            input.value = data[key];
          }
        }
      }
    });
  },
  start: function () {
    this.handleEvents();
  },
};

app.start();
