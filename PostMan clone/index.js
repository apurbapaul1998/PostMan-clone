console.log("postman clone");

//initialise no. of parameters
let addedParamCount=0;

// parameters box should hide initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//if the user clicks on params box,hide the json
let paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';  //hiding the parameters box
    document.getElementById('parametersBox').style.display = 'block';   //block is the opposite of none, here showing the parametersbox only
})

//if the user clicks on json box,hide the params

let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//if the user clicks on + button, add more parameters
let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    let params = document.getElementById('params'); //taking the empty area to add
    let string = ` <div class="form-row">
<label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount+2}</label>
<div class="col-md-4">
    <input type="text" class="form-control" id="parameterKey${addedParamCount+2}" placeholder="Enter Parameter ${addedParamCount+2} Key">
</div>
<div class="col-md-4">
    <input type="text" class="form-control" id="parameterValue${addedParamCount+2}"
        placeholder="Enter Parameter ${addedParamCount+2} Value">
</div>
<button id="addParam" class="btn btn-primary">-</button>
</div>
<div id="params"></div>
</div>`
})