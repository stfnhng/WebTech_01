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
console.log(header);
console.log(body);
console.log(sections);
console.log(articles);
console.log(footer);

var element_collection = [header,body,sections,articles,footer];
//console.log(element_collection);
console.log("")
for (i = 0; i<element_collection.length;i++){
    
    for(var bruh of element_collection[i])
         console.log(bruh)
    
}

// for (var bruh of element_collection){
//     for(var bruh2 of bruh ){console.log(bruh2);}
//     console.log(bruh.id);
//     var option = document.createElement("option");
//     var optiontext = document.createTextNode(bruh.id);
//     //console.log(option.innerHTML);
//     option.appendChild(optiontext);
//     select.appendChild(option);
// }
function select_element(){
    var index = select.selectedIndex;
    //window.scrollTo(0, document.getElementById(filler))
    //window.scrollTo(100, document.getElementById(select[index].innerHTML));
    //document.getElementById(select[index].innerHTML).scrollIntoView();
    document.querySelectorAll("section")[index].scrollIntoView(-100);
    
    console.log(document.getElementById(select[index].innerHTML));
}

function change_styling() {
    document.querySelectorAll("section")[index].childNodes[1].style.fontSize="3em";
    var test = document.querySelectorAll("section")[index];
    console.log(test.childNodes[0]);
}


