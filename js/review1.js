//const inputName = document.querySelector('#input-full-name');
const inputElem = document.querySelector('#input-name');
const form = document.querySelector('#form');
const listElem = document.querySelector('#review');
const buttonElem = document.querySelector('#to-do-list button');

//const nameArray = JSON.parse(localStorage.getItem('input-full-name')) || [];
const reviewArray = JSON.parse(localStorage.getItem('review1')) || [];

function updateList(){
  listElem.innerHTML = '';

  for (const key in reviewArray) {
    const li = document.createElement('p');
    

    const span = document.createElement('section');
    span.innerText = reviewArray[key];

    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.setAttribute('key',key); 
    button.classList.add('delete');

    li.appendChild(span);
    li.appendChild(button);
    listElem.appendChild(li);
  }

  localStorage.setItem('review1',JSON.stringify(reviewArray));
}

function addToList(value){
  if (value === '') return;

  reviewArray.push(value);

  updateList();
  inputElem.value = '';
  inputElem.focus();
}

function deleteFromList(key){

  reviewArray.splice(Number(key),1);

  updateList();
  inputElem.value = '';
  inputElem.focus();
}


form.addEventListener('submit', e => {
  e.preventDefault();
  addToList(inputElem.value);
});

document.addEventListener('click', e => {
  const el = e.target;
  if (el.classList.contains('delete')){ 
    deleteFromList(el.getAttribute('key'));
  }
});

updateList();