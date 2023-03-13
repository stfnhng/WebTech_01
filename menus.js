//var test = document.getElementById("filler").childNodes[1].innerHTML;

//console.log(test);

var select = document.getElementById("select");
console.log(select)



var sections = document.querySelectorAll("section").length;
console.log(sections);

var specifiek = document.querySelectorAll("section");
for (var bruh of specifiek){
    console.log(bruh.id);
    var option = document.createElement("option");
    var optiontext = document.createTextNode(bruh.id);
    //console.log(option.innerHTML);
    option.appendChild(optiontext);
    select.appendChild(option);
}
function navigate(){
    var index = select.selectedIndex;
    //window.scrollTo(0, document.getElementById(filler))
    //window.scrollTo(100, document.getElementById(select[index].innerHTML));
    //document.getElementById(select[index].innerHTML).scrollIntoView();
    document.querySelectorAll("section")[index].scrollIntoView(-100);
    console.log(document.getElementById(select[index].innerHTML));
}