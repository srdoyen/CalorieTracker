//Storage Controller

//Item Controller
const ItemCtrl = (function() {
  //Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data Structure / State
  const data = {
    items: [],
    currentItem: null,
    totalCalories: 0
  };
  //Public Methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      //Create id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Calories to number
      calories = parseInt(calories);

      //Create new item
      newItem = new Item(ID, name, calories);

      data.items.push(newItem);
      return newItem;
    },
    getTotalCalories: function() {
      let total = 0;
      //Loop through items and add cals
      data.items.forEach(function(item) {
        total += item.calories;
      });
      data.totalCalories = total;

      //Return total
      return data.totalCalories;
    },
    logData: function() {
      return data;
    }
  };
})();

//UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    updateBtn: ".button-btn",
    deleteBtn: ".delete-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
  };
  return {
    populateItemList: function(items) {
      let html = "";
      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${items.id}">
        <strong>${item.name}</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a></li>`;
      });

      //Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item) {
      //Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      //Create li element
      const li = document.createElement("li");
      //Add class
      li.className = "collection-item";
      //Add id
      li.id = `item-${item.id}`;
      //Add HTML
      li.innerHTML = `<strong>${item.name}</strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
      <i class="edit-item fa fa-pencil"></i>
    </a>`;

      //Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearFields: function() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();

//App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
  //Load Event listeners
  const loadEventListeners = function() {
    //Get UI Selectors
    const UISelectors = UICtrl.getSelectors();
    //Add item Event
    document.querySelector(".add-btn").addEventListener("click", itemAddSubmit);
  };

  //Add Item Submit
  const itemAddSubmit = function(e) {
    //Get Form input from UI Controller
    const input = UICtrl.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      //Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      //Add item to UI List
      UICtrl.addListItem(newItem);
      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      //Clear fields
      UICtrl.clearFields();
    }
    e.preventDefault();
  };

  return {
    init: function() {
      //Fetch items from data structure
      const items = ItemCtrl.getItems();
      //Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //Populate List with Items
        UICtrl.populateItemList(items);
      }
      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      //Load Event Listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

//Initialize App
AppCtrl.init();
