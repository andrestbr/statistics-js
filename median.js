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
    
    var step1 = document.getElementById("countValues");
    step1.onclick = countValues;      //calls the function sumValues if triggered by the form element with the id "countValues" 
    
    var step2 = document.getElementById("checkEven");
    step2.onclick = checkEven;    //calls the function checkEven if triggered by the form element with the id "checkEven"
    
    var step3 = document.getElementById("sortValues");
    step3.onclick = sortValues;   //calls the function sortValues if triggered by the form element with the id "sortValues"
    
    var step4 = document.getElementById("calculateMedian");
    step4.onclick = calculateMedian;   //calls the function calculateMedian if triggered by the form element with the id "calculateMedian"
}
    
function addValues() {
    var valuesInput = document.getElementById("values");    //reads the content of the form element with the id "values"
    var number = valuesInput.value;                         
    numbers.push(number);                                   //numbers.push(valuesInput.value); does it as well
    
    var span = dom.domR("span", number, "class", "values");
    dom.domW("showValues", span);
}

function countValues() {
    var spanNumbers = dom.domR("span", numbers.join(" ") + " = ", null, null);
    //------- creates a span element to store the values in the form (value value ... value =) -----------

    var spanCount = dom.domR("span", count(numbers), "class", "results");
    
    dom.domC("showCount");
    dom.domW("showCount", spanNumbers);
    dom.domW("showCount", spanCount);
}

function checkEven() {
    countValues();
    //if new values are entered and step3 is called before step1 or step2, this will update them and show the previous calculations
   
    if (count(numbers)%2 === 0){
        var evenThing = "even";
    }
    else {
        var evenThing = "odd";
    }
    
    var spanEven = dom.domR("span", "the number of values is " + evenThing, null, null);
    //------- creates a span element to show if the value is odd or even -----------
    
    dom.domC("showEven");
    dom.domW("showEven", spanEven);
}

function sortValues() {
    checkEven();
    //if new values are entered and step3 is called before step1 or step2, this will update them and show the previous calculations
   
    var sorted = numbers.sort(function(a,b){return a-b});
    
    var spanSort = dom.domR("span", sorted.join(" ") , null, null);
    //------- creates a span element to show the sorted values -----------
    
    dom.domC("showSorted");
    dom.domW("showSorted", spanSort);
    numbers = sorted;
}

function calculateMedian() {
    sortValues();
    //if new values are entered and step3 is called before step1 or step2, this will update them and show the previous calculations
    var n = count(numbers);
    if (n%2 === 0) { 
        dom.domC("step4");
        var spanThing = document.getElementById("step4");
        spanThing.innerHTML = "because the number of values is even, the median is calculated as the arithmetic mean of the two central values " + numbers[(n/2)-1] + " and " + numbers[n/2];
        var medianThing = (parseFloat(numbers[(n/2)-1]) + parseFloat(numbers[n/2])) / parseFloat(2);
    }
    else {
        dom.domC("step4");
        var spanThing = document.getElementById("step4");
        spanThing.innerHTML = "because the number of values is odd, just pick the central value";
        var medianThing = (numbers[(n + 1) / 2 - 1]);
    }
    
    var spanMedian = dom.domR("span", medianThing, null, null);
    //------- creates a span element to show the calculated median -----------
    
    dom.domC("showMedian");
    dom.domW("showMedian", spanMedian);
}



