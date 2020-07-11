// UI vars
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');


let items;
//load items
loadItems();
//call event listeners
eventListeners();

function eventListeners() {
  //submit event
  form.addEventListener('submit', addNewItem);

  //delete an item
  taskList.addEventListener('click', deleteItem);

  //delete all items
  btnDeleteAll.addEventListener('click', deleteAllItems);



}
function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}
//get items from local sorage
function getItemsFromLS() {
  if (localStorage.getItem('items') === null) {
    items = [];
  }
  else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  return items
}
//set item to local storage
function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem('items', JSON.stringify(items))
}

//delete an item for LS
function deleteItemFromLS(text) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1)

    }
  });
  localStorage.setItem('items', JSON.stringify(items));
}
//added checkbox
const yapildiD = document.querySelector('.yapildi');
const yapilmadiD = document.querySelector('.yapilmadi');

//yapımdı mı yapılmadı
yapildiD.addEventListener('click', yapildi);
//yapilmadi
yapilmadiD.addEventListener('click', yapilmadi);

//yapildi button


function yapildi() {
  document.getElementById("checkbox").checked = true;
}
function yapilmadi() {
  document.getElementById("checkbox").checked = false;
}




function createItem(text) {
  //create button

  const buton1 = document.createElement('button');
  const buton2 = document.createElement('button');
  buton1.className = "yapildi";
  buton2.className = "yapilmadi";
  buton1.textContent = "Yapıldı...";
  buton2.textContent = "Yapılmadı...";


  //create li
  const li = document.createElement('li');
  //create checkbox
  const checkBox = document.createElement('input');
  //create p
  const p = document.createElement('p');
  p.textContent = "Görevin Yapılma Durumu: ";
  checkBox.className = 'ml-3';
  checkBox.type = "checkbox";

  checkBox.setAttribute("id", "checkbox");

  li.appendChild(document.createTextNode(text))

  li.className = 'list-group-item list-group-item-secondary';
  //create a
  const a = document.createElement('a');
  a.classList = 'delete-item float-right';
  a.setAttribute('href', '#');
  a.innerHTML = '<i class="fas fa-times"></i>';
  //add li to p
  li.appendChild(p)
  //add li to button
  li.appendChild(buton1);
  li.appendChild(buton2);
  //add li to checkbox
  li.appendChild(checkBox);
  //add  a to li 
  li.appendChild(a);
  //add li to ul
  taskList.appendChild(li);
}


//add new item
function addNewItem(e) {
  if (input.value === '') {
    alert('Boş bir işi kaydedemezsiniz!!!')
  }
  else {
    //create item
    createItem(input.value);
    //save to LS
    setItemToLS(input.value);
    //clear input
    input.value = "";
    // console.log(li);
  }
  e.preventDefault();

}

//delete an item
function deleteItem(e) {
  if (e.target.className === 'fas fa-times') {
    if (confirm('Emin misiniz ? Bu Görev Silenecek... ')) {
      e.target.parentElement.parentElement.remove();
      //delete item from LS
      deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
  }
  e.preventDefault();
}
//delete all items
function deleteAllItems(e) {
  //1.yöntem
  if (confirm('Emin misiniz ? Bütün Görevler Silenecek... ')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  // taskList.innerHTML = '';
  //'.yöntem
  /*   if (confirm('Emin misiniz ?')) {
      taskList.childNodes.forEach(function (item) {
        if (item.nodeType === 1) {
          item.remove();
        }
      })
    }
   */
  e.preventDefault();
}

