const TERMS_CACHE_KEY = "taxonomyCache"

function validateTag() {
  var capital = document.getElementById("capital");
  var singular = document.getElementById("singular");
  var charLength = document.getElementById("exists");
  removeValidInvalid(capital);
  removeValidInvalid(singular);
  removeValidInvalid(charLength);

  var tagInput = document.getElementById("tag");
  var tagValue = tagInput.value;
  checkifLowerCase(tagValue, capital);
  checkIfSingular(tagValue, singular);
  checkCharacterLength(tagValue, charLength);

  validationCheck();
}

// Checks for the existence of validation id and runs if valid
function validationCheck() {
  var invalid = document.querySelectorAll('p.invalid')
  var valid = document.querySelectorAll('p.valid')
  var caution = document.querySelectorAll('p.caution')

  if (valid.length == 3 || caution.length == 1 && invalid.length == 0) {
    check();
    document.querySelector("div").removeAttribute("id", "hidden");
  }

  if (invalid.length >= 1) {
    document.querySelector("div").removeAttribute("id", "hidden");
  }
}

// Removes the classes from the given element
function removeValidInvalid(elementName) {
  elementName.classList.remove("valid");
  elementName.classList.remove("invalid");
  elementName.classList.remove("caution");
}

// Checks if the given value is lowercase and assigns a valid or invalid class
function checkifLowerCase(tagValue, elementName) {
  if (tagValue.charAt(0) === tagValue.charAt(0).toLowerCase()) {
    elementName.classList.add("valid");
  } else {
    elementName.classList.add("invalid")
  }
}

// Checks the given input last letter for an s value and assigns a valid or caution class
function checkIfSingular(tagValue, elementName) {
  if (tagValue.charAt(tagValue.length - 1) === "s") {
    elementName.classList.add("caution");
  } else {
    elementName.classList.add("valid")
  }
}

// Checks the length of the given input value and assigns a valid or invalid class
function checkCharacterLength(tagValue, elementName) {
  if (tagValue.length < 2) {
    elementName.classList.add("invalid");
  } else {
    elementName.classList.add("valid");
  }
}

function check() {

  // Retrieve the existing list from localStorage
  const existingListString = localStorage.getItem(TERMS_CACHE_KEY);

  // Convert the string back to an array
  const existingList = JSON.parse(existingListString) || [];

  // Create a new JSON object to add to the list
  const fruitList = {
    term: document.getElementById("tag").value,
    definition: document.getElementById("definition").value,
    scopeNote: document.getElementById("scope-note").value
  };

  // Add the new JSON object to the existing list
  existingList.push(fruitList);

  // Convert the updated list to a string
  const updatedListString = JSON.stringify(existingList);

  // Store the updated list in localStorage
  localStorage.setItem(TERMS_CACHE_KEY, updatedListString);
}

function resetList() {
  const resetListString = `[
    {
      "term": "lime",
      "definition": "Green citrus fruit",
      "scopeNote": "Used as Garnish"
    },
    {
      "term": "lemon",
      "definition": "Yellow citrus fruit",
      "scopeNote": "Used as a flavor enhancer"
    },
    {
      "term": "strawberry",
      "definition": "Red aggregate fruit",
      "scopeNote": "Great for smoothies"
    }
  ]`;

  // Override the localStorage
  localStorage.setItem(TERMS_CACHE_KEY, resetListString);
}