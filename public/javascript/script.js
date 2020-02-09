window.onscroll=function(){
    myfunction();
}
// DOM Select
var nav=document.querySelector(".navigation");
var features=document.querySelector(".section");
function myfunction(){
    var dftop=window.pageYOffset;
    if(dftop>features.offsetTop){
nav.classList.add("sticky")
    }
    else {
nav.classList.remove("sticky")
    }
}