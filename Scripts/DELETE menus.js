//get all off the elements
var header = document.querySelectorAll("header");
var body = document.querySelectorAll("body");
var sections = document.querySelectorAll("section");
var articles = document.querySelectorAll("article");
var footer = document.querySelectorAll("footer");

// make an array of arrays to make create options for all the tags in just one go
var element_collection = [header,body,sections,articles,footer];

//get the select element for the first menu
var first_menu = document.getElementById("first_menu");
//get the property form the second menu needed to be changed
var element_property = document.getElementById("second_menu");

//create a option tag for all the elements that we want to be able to changed.
for (var part_of_page of element_collection){
    //for every nodelist inside the nodelist element_collection we iterate 
    //to create option tags for the select element in the footer
    for(var element_of_page of part_of_page){
        //create an option
        var option = document.createElement("option");
        //give text and value to the option tag
        var option_text = document.createTextNode(element_of_page.id);
        option.setAttribute("value",element_of_page.id);
        //make this text and value a childe node of the option tag
        option.appendChild(option_text);
        //make this option tag a child of the menu
        first_menu.appendChild(option);
    }
}

//the function that runs when the button next to the menus is pressed
function select_element(){
    //get the element that is selected
    var element = document.getElementById(first_menu.value);
    //ask for a value for the selected style
    var stylevalue = prompt(`change the appearance of : ${element.id}`);
    
    if(element_property.value=="fontSize"){
        element.style.fontSize = stylevalue+"px";
    }
    else if(element_property.value== "color"){
        element.style.color = stylevalue;
    }
}