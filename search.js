const TERMS_CACHE_KEY = "taxonomyCache"
const HEADER_FIELDS = ["Term", "Definition", "Scope Notes", "Delete"];
const JSON_KEY_NAMES = ["term", "definition", "scopeNote"];

window.onload = function() {

// Array to store parsed JSON data
const termData = localStorage.getItem(TERMS_CACHE_KEY) || "[]";
const termJasonData = JSON.parse(termData);

// Get the reference to the JSON container in the HTML
const jsonContainer = document.getElementById('list-table');

// Clear the existing content of the JSON container
jsonContainer.innerHTML = '';

// Flush and Rebuild header
let row = document.createElement('tr');
HEADER_FIELDS.forEach(headerName => {
  let header = document.createElement('th');
  header.textContent = headerName;
  row.appendChild(header);
})
jsonContainer.appendChild(row);

// Iterate over the parsed JSON data and create HTML elements for each item
termJasonData.forEach(jsonData => {
  // Create a data element
  let row = document.createElement('tr');
  row.setAttribute("id", jsonData.term)
  JSON_KEY_NAMES.forEach(jsonKey => {
    const dataItem = document.createElement('td');
    dataItem.textContent = jsonData[jsonKey];
    row.appendChild(dataItem);
  })
  // Create delete button
  const button = document.createElement("button")
  button.addEventListener("click", deleteRow)
  const text = document.createTextNode("Delete")
  button.appendChild(text)
  button.setAttribute("id", jsonData.term)

  // Create table data for button
  const buttonItem = document.createElement('td');
  buttonItem.appendChild(button);
  row.appendChild(buttonItem);
  // Append the data element to the JSON container
  jsonContainer.appendChild(row);
});
}

// Search functionality
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase();
  table = document.getElementById("list-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function deleteRow() {
  // Array to store parsed JSON data
  const termData = localStorage.getItem(TERMS_CACHE_KEY) || "[]";
  const termJasonData = JSON.parse(termData);

  // Find index of term being deleted.
  var index;
  for (index = 0; termJasonData.length; index++) {
    if (termJasonData[index].term == this.id) {
      break;
    }
  }

  // Delete term from local storage and html
  termJasonData.splice(index, 1);
  localStorage.setItem(TERMS_CACHE_KEY, JSON.stringify(termJasonData));
  document.getElementById(this.id).remove();
}

