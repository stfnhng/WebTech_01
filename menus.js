//get the header element
var header = document.querySelectorAll("header")
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

//get the select elemnt for the first menu
var first_menu = document.getElementById("first_menu");
//check if we got the right element
console.log(first_menu);

//create a option tag for all the elements that we want to be able to changed.
console.log("");

for (var part_of_page of element_collection){
    
    for(var element_of_page of part_of_page){
        
        var option = document.createElement("option");
        var option_text = document.createTextNode(element_of_page.id);
        option.appendChild(option_text);
        first_menu.appendChild(option);
        console.log(element_of_page);
    }
}
//alleen deze wordt aangeroepen tot nu to 
//TODO: weghalen
function select_element(){
    var index = select.selectedIndex;
    //window.scrollTo(0, document.getElementById(filler))
    //window.scrollTo(100, document.getElementById(select[index].innerHTML));
    //document.getElementById(select[index].innerHTML).scrollIntoView();
    document.querySelectorAll("section")[index].scrollIntoView(-100);
    
    console.log(document.getElementById(select[index].innerHTML));
}
//TODO: weghalen
function change_styling() {
    document.querySelectorAll("section")[index].childNodes[1].style.fontSize="3em";
    var test = document.querySelectorAll("section")[index];
    console.log(test.childNodes[0]);
}


