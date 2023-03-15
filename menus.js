//get the header element
var header = document.querySelectorAll("header");
//get the body element
var body = document.querySelectorAll("body");
//get all the section elements
var sections = document.querySelectorAll("section");
//get all the articles
var articles = document.querySelectorAll("article");
//get the footer element
var footer = document.querySelectorAll("footer");

//check what elements appear in these variables above
console.log(header);
console.log(body);
console.log(sections);
console.log(articles);
console.log(footer);

console.log("");
// make an array of arrays to make create options for all the tags in just one go
var element_collection = [header,body,sections,articles,footer];

//get the select element for the first menu
var first_menu = document.getElementById("first_menu");
//get the property form the second menu needed to be changed
var element_property = document.getElementById("second_menu");
//check if we got the right element
console.log(first_menu);
console.log(element_property);


console.log("");
//create a option tag for all the elements that we want to be able to changed.
for (var part_of_page of element_collection){
    
    for(var element_of_page of part_of_page){
        
        var option = document.createElement("option");
        var option_text = document.createTextNode(element_of_page.id);
        option.setAttribute("value",element_of_page.id.toLowerCase());
        option.appendChild(option_text);
        first_menu.appendChild(option);
        console.log(element_of_page);
    }
}


//first_menu.addEventListener("change", select_element);

//the function that runs when the button next to the 
function select_element(){
    //get the element that is selected
    var element = document.getElementById(first_menu.value);
    console.log(element);

    //ask for a value for the selected style
    var stylevalue = prompt(`change the appearance of : ${element.id}`);
    
    if(element_property.value=="fontSize"){
        element.style.fontSize = stylevalue+"px";
    }
    else if(element_property.value== "color"){
        element.style.color = stylevalue;
    }
    console.log(stylevalue);
    
}