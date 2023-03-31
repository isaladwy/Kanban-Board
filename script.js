// DOM
const blocks = Array.from(document.querySelectorAll('.task-block'));
const boxs = Array.from(document.querySelectorAll('.box'));
const addButtons = Array.from(document.querySelectorAll('.add-task'));
const editButtons = Array.from(document.querySelectorAll('.edit-btn'));
const deleteButtons = Array.from(document.querySelectorAll('.delete-btn'));
let body = document.querySelector('body');

let i = 8;
let drag = null;

// getDataFromLocalStorage();

addButtons.forEach((button) => {
  button.addEventListener('click', function () {
    // Creating task block
    let taskBlock = document.createElement('div'); // the main div block
    taskBlock.className = 'task-block'; // setting the class of the div to 'task-block'
    taskBlock.setAttribute('draggable', 'true'); // allowing the block to be draggable
    // Adding elements to the task block created
    taskBlock.innerHTML = `<input type="text" value="Task ${i}" disabled />
    <ion-icon name="create-outline" class="edit-btn"></ion-icon>
    <ion-icon name="trash-outline" class="delete-btn"></ion-icon>`;
    let boxs = this.parentElement.children[0];
    boxs.appendChild(taskBlock);
    i++;
    EditButtons();
    DeleteButtons();
    updateLocalStorage();
  });
});

// Edit Button
function EditButtons() {
  editButtons.forEach((button) => {
    button.addEventListener('click', function () {
      let parentTask = this.parentElement.children[0];
      parentTask.toggleAttribute('disabled');
      parentTask.focus();
      // parentTask.value = '';
      updateLocalStorage();
    });
  });
}

// Delete Button
function DeleteButtons() {
  deleteButtons.forEach((button) => {
    button.addEventListener('click', function () {
      let parentTask = this.parentElement;
      parentTask.remove();
      updateLocalStorage();
    });
  });
}

// Drag Function
function dragBlock() {
  blocks.forEach((block) => {
    block.addEventListener('dragstart', function () {
      drag = block;
    });

    block.addEventListener('dragend', function () {
      drag = null;
    });

    boxs.forEach((box) => {
      box.addEventListener('dragover', function (e) {
        e.preventDefault();
        box.style.backgroundColor = '#03463a';
      });
      box.addEventListener('dragleave', function () {
        box.style.backgroundColor = '#023939';
      });

      box.addEventListener('drop', function () {
        box.append(drag);
        box.style.backgroundColor = '#023939';
      });
    });
  });
  // updateLocalStorage();
}

// Update localStorage with html structure
const updateLocalStorage = () => {
  localStorage.setItem('pageStructure', body.innerHTML);
  // getDataFromLocalStorage();
};

function getDataFromLocalStorage() {
  body.innerHTML = localStorage.getItem('pageStructure');
  // console.log(body.innerHTML);
}

dragBlock();
EditButtons();
DeleteButtons();
// updateLocalStorage();
