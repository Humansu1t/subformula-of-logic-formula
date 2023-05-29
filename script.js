var constants = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '0'];
var operations = ['~', '-' , '>', '\\', '/', '!'];
var formula;

function findInArray(array, temp) {
    for (var index = 0; index < array.length; index++) {
        if (array[index].toString() == temp.toString()) {
            return true;
        }
    }
    return false;
}

function getSubFormula(memory, subFormulas) {
    var open = 0;
    var close = 0;
    var subFormula = new Array();

    for (var index = memory; index < formula.length; index++) {
        subFormula.push(formula[index]);
        if (formula[index] == '(') {
            open++;
        }

        if (formula[index] == ')') {
            close++;
        }

        if (open == close) {
            if(findInArray(subFormulas,subFormula) == false) {
                subFormulas.push(subFormula);
            }
            return;
        }
    }
}

function findSubformulas(subFormulas) {
    var numOfOpen = 0;
    var numOfClose = 0;
    for (var index = 0; index < formula.length; index++) {
        if (formula[index] == '(') {
            getSubFormula(index, subFormulas);
        }  else if (findInArray(constants, formula[index]) && !findInArray(subFormulas, formula[index]) && !findInArray(operations, formula[index])) {
            subFormulas.push(formula[index]);        
    }
}
}

function start() {
    var input = document.getElementById("form");    
    var subFormulas = new Array();
    formula = input.elements[0].value;

    if (formula==""){
        alert("Empty field! Please, enter formula!")
        return;
    }

    for (var index = 0; index < formula.length; index++) {
        if (!findInArray(constants, formula[index]) && !findInArray(operations, formula[index]) && formula[index] != '(' && formula[index] != ')') {
            alert("Error: Invalid character detected in formula!");
            return;
        }
    }

    findSubformulas(subFormulas);
    var body = document.querySelector("body");    
    var newDiv = document.createElement("div");
    var ol = document.createElement("ol");
    var mainDiv = document.getElementById("gener_div");
    mainDiv.innerHTML = "";

    newDiv.setAttribute("class","div_with_ol");
    
    for (index1 = 0; index1 < subFormulas.length; index1++){
        var str = '';
        for (index2 = 0; index2 < subFormulas[index1].length; index2++){
            str += subFormulas[index1][index2];            
        }
        var content = document.createTextNode(str);
        var li = document.createElement("li");
        li.appendChild(content);
       ol.appendChild(li);
    }
    newDiv.appendChild(ol);
    mainDiv.appendChild(newDiv);

    var answer = document.createElement("p");
    var answerContent = document.createTextNode("Answer: " + subFormulas.length + ".");
    answer.appendChild(answerContent);
    mainDiv.appendChild(answer);
}
