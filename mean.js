window.onload = init;

var numbers = [];   //Initializes an empty array to store the values

//-------- little helpers ------------------

function sum(summand) {
    var sumResult = 0;
    for (i in summand) {
        sumResult += parseInt(summand[i]);
    }
    return sumResult;
}

function count(toCount) {
    var count = 0;
    for (i in toCount) {
        count += 1;
    } 
    return count;
}


//-------- little dom helpers ------------------

//object literal storing functions to interact with the dom elements
var dom = {
    
    //creates an HTML element to store the value(s)
    domR: function (anyTag, tagContent, tagAttribute, attributeValue) {  
    
    //parameter "anyTag" is used to create the HTML element 
    //parameter "tagContent" is used for the content
    //if setAttribute is to be used, "tagAttribute" and "attributeValue" are passed as parameters
    
        var tagThings = document.createElement(anyTag);                       
        tagThings.innerHTML = tagContent;                       
    
        if (tagAttribute && attributeValue) {                       
            tagThings.setAttribute(tagAttribute, attributeValue);   
        }
        return tagThings;
        },
    
        //clears the div from any content it may have
        domC: function (divId) {                                    
        var divThing = document.getElementById(divId);
        divThing.innerHTML = "";                                    
        },

        //inserts an element as a child in a div
        domW: function (divId, tagThingsOutput) {
        var divThing = document.getElementById(divId);
        divThing.appendChild(tagThingsOutput);                      
        }
}

//--- end 
    
    
//this function listens to the input buttons. 
//One for entering the values, and three more for step 1, 2 and 3 respectively   

function init() {
    var step0 = document.getElementById("addValues");
    step0.onclick = addValues;     //calls the function addValues if triggered by the form element with the id "addValues"
    
    var step1 = document.getElementById("sumValues");
    step1.onclick = sumValues;      //calls the function sumValues if triggered by the form element with the id "sumValues" 
    
    var step2 = document.getElementById("countValues");
    step2.onclick = countValues;    //calls the function countValues if triggered by the form element with the id "countValues"
    
    var step3 = document.getElementById("divideValues");
    step3.onclick = divideValues;   //calls the function divideValues if triggered by the form element with the id "divideValues"
}
    
function addValues() {
    var valuesInput = document.getElementById("values");    //reads the content of the form element with the id "values"
    var number = valuesInput.value;                         
    numbers.push(number);                                   //numbers.push(valuesInput.value); does it as well
    
    var span = dom.domR("span", number, "class", "values");
    dom.domW("showValues", span);
}

function sumValues() {
    
    var spanNumbers = dom.domR("span", numbers.join(" + ") + " = ", null, null);
    //------- creates a span element to store the values in the form (value + value + ... + value =) -----------
    
    var span = dom.domR("span", sum(numbers), "class", "results");
    //------- creates a span element to store the result -----------
    
    dom.domC("showSum");
    dom.domW("showSum", spanNumbers);
    dom.domW("showSum", span);
}

function countValues() {
    sumValues();                
    //if new values are entered and step2 is called before step1, this will update them and show the previous calculations 
    
    var spanNumbers = dom.domR("span", numbers.join(" ") + " = ", null, null);
    //------- creates a span element to store the values in the form (value value ... value =) -----------

    var spanCount = dom.domR("span", count(numbers), "class", "results");
    
    dom.domC("showCount");
    dom.domW("showCount", spanNumbers);
    dom.domW("showCount", spanCount);
}

function divideValues() {
    countValues();
    //if new values are entered and step3 is called before step1 or step2, this will update them and show the previous calculations
    
    var spanDivision = dom.domR("span", sum(numbers) + " / " + count(numbers) + " = ", null, null);
    //------- creates a span element to store the division to be evaluated (sum / count =) -----------
    
    var spanResult = dom.domR("span", sum(numbers) / count(numbers), "class", "results");
    
    dom.domC("showDivision");
    dom.domW("showDivision", spanDivision);
    dom.domW("showDivision", spanResult);
}