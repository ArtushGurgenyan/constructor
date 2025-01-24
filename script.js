let constructor = document.querySelector(".constructor");
let result = document.querySelector(".result");
let button = document.querySelector(".createBtn");
let select = document.querySelector("select");

let choosen = "div"; 
let constructorElements = new Map();  
let clickedElement = null;  
let data = []; 


select.addEventListener("change", (e) => {
    choosen = e.target.value;
});


function createDomElement(data) {
    const newElement = {
        id: data.length,
        type: "div",
        context: choosen,
        parentId: 1,  
    };

    data.push(newElement);  

    const item = data[data.length - 1]; 
    let el = document.createElement(item.type); 
    el.classList.add("option");              
    el.classList.add(item.context);         
    el.textContent = item.context;          
    el.dataset.id = item.id; 

    constructorElements.set(item.id, el); 
    constructor.appendChild(el); 


    el.addEventListener("mousedown", (e) => {
        clickedElement = el;  
    });
}


button.addEventListener("click", (e) => {
    e.preventDefault();

    createDomElement(data);  
});




constructor.addEventListener("mouseup", (e) => {
    e.stopPropagation();

    if (clickedElement) {

        if (!result.contains(clickedElement)) {
            result.appendChild(clickedElement);
            clickedElement.parentId = 2; 
        }
    }

    clickedElement = null;
});

result.addEventListener("mouseup", (e) => {
    e.stopPropagation();

    if (clickedElement) {
        let targetElem = e.target;
        console.log(targetElem)
        
        if (targetElem !== result && targetElem.classList.contains("div")) {
            targetElem.appendChild(clickedElement);
            clickedElement.parentId = 2; 
        }

    }

    clickedElement = null; 
});
