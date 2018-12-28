// Storage controller

// Item controller

const ItemCtrl = (function(){
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //data structure /state 
  const data = {
    items: [
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookie', calories: 1200},
      // {id: 2, name: 'Eggs', calories: 300},
    ],
    currentItem: null,
    totalCalories: 0
  }

  // public methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories){
      let ID;
      // create ID 
      if (data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // calories to number
       calories = parseInt(calories);

      //  create new item
      newItem = new Item(ID, name, calories);
      // add to items array
      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories: function(){
      let total = 0;
      // loop thru items and add cals
      data.items.forEach(function(items) {
        total += items.calories;
      })
      // set total cal in data structure
      data.totalCalories = total;

      // return total
      return data.totalCalories;
    },
    logData: function() {
      return data;
    }
  }
})();

// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn:'.delete-Btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'

  }
  // public methods
  return {
    populateItemList: function(items){
      let html ='';

      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>`
      });

      // insert list items
      document.querySelector(UISelectors.itemList). innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item){
      // show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // create Li element
      const li = document.createElement('li');
      // add class
      li.className = 'collection-item';
      // add ID
      li.id = `item-${item.id}`;
      // add HTMl
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
      // insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)

    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(total) {
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },
    clearEditState: function() {
      UICtrl.clearInput();
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
})();
// App Controller
const App =(function(ItemCtrl, UICtrl) {
  // load event listeners
  const loadEventListeners = function() {
    // get ui selectors
    const UISelectors = UICtrl.getSelectors();

    // add item event
  document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }
  // add item submit
  const itemAddSubmit = function(e) {
    // get form input from UI Controller
    const input = UICtrl.getItemInput();
    
    // check for name and calories input
    if(input.name !== '' && input.calories !== '') {
      //add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // add item to UI list
      UICtrl.addListItem(newItem);
      // get total calories
      const total = ItemCtrl.getTotalCalories();
      // add total calories to UI
      UICtrl.showTotalCalories(total);
      //Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }
  // public methods
  return {
    init: function(){

      // fetch items from data structure
      const items = ItemCtrl.getItems();
      //check if any items
      if(items.length === 0) {
        UICtrl.hideList();
      } else {
      // populate list with items
      UICtrl.populateItemList(items);
      }

      // get total calories
      const total = ItemCtrl.getTotalCalories();
      // add total calories to UI
      UICtrl.showTotalCalories(total);
      // load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

// init 
App.init();