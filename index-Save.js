// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
//** D3 Select BTNS for Clicks **/
var   $btnReLoad  =   d3.select("#load");
var   $btnSearch  =   d3.select("#search"); 
var   $btnNext    =   d3.select("#next");
var   $btnPrev    =   d3.select("#prev");
//

//** Search Fields */

var   $date       =  d3.select("#date_time");
var   $city       =  d3.select("#city");     
var   $state      =  d3.select("#state");    
var   $country    =  d3.select("#country");  
var   $shape      =  d3.select("#shape");    


var filteredData = data;
var pageNum = 0;

// Click Next 
$btnNext.on("click", function clickNext() {
    pageNum++;
    renderTable();
});

// Click Prev 
$btnPrev.on("click", function clickPrev() {
    pageNum--;
    renderTable();
});



// renderTable renders the filteredData to the tbody
function renderTable() {

    if (pageNum < 0){pageNum = 0;};
    if (pageNum >= (filteredData.length/10)){pageNum = pageNum-1;};

    $tbody.innerHTML = "";

    for (var i = 0; i < 10; i++) {
        // Get get the current item object and its fields
        var item = filteredData[i+(pageNum * 10)];
        var fields = Object.keys(item);
        // Create a new row in the tbody, set the index to be i + startingIndex

        var $row = $tbody.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = item[field];
        }
    }
}


// Click search 
$btnSearch.on("click", function searchBtn() {
    // Search Tearms 
    var filterDate    =  $date   .property("value");
    var filterCity    =  $city   .property("value").toLowerCase();
    var filterState   =  $state  .property("value").toLowerCase();
    var filterCountry =  $country.property("value").toLowerCase();
    var filterShape   =  $shape  .property("value").toLowerCase();


    // Set filtered to an array of all datae" matches the filter

    if (filterDate != "") {
        filteredData = filteredData.filter(function (date) {
        var dataDate = date.datetime;
        //console.log(dataDate)

        // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return dataDate === filterDate;
    });

    }

    // Set filtered to an array of all datae" matches the filter

    if (filterCity != "") {
        filteredData = filteredData.filter(function (city) {
        var dataCity = city.city;
        //console.log(dataCity)

        // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
        return dataCity === filterCity;
    });
    }

    if (filterState != "") {
        filteredData = filteredData.filter(function (state) {
            var dataState = state.state;
      
            return dataState === filterState;
        });
    }

    if (filterCountry != "") {
        filteredData = filteredData.filter(function (country) {
            var dataCountry = country.country;

            return dataCountry === filterCountry;
        });
    }

    if (filterShape != "") {
        filteredData = filteredData.filter(function (shape) {
            var dataShape = shape.shape;

            return dataShape === filterShape;
        });
    }

    renderTable();
});


// Click reLoad //  
$btnReLoad.on("click", function reloadBtn() {

    filteredData = data;
    $date   .property("value", '');
    $city   .property("value", '');
    $state  .property("value", '');
    $country.property("value", '');
    $shape  .property('value', '');

    renderTable();
});


// Render the table for the first time on page load
renderTable();