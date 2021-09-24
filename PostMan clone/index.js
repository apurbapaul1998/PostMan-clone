console.log("postman clone");

// utility functions:

//1. function to get dom element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;

}



//initialise no. of parameters
let addedParamCount = 0;

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
    let string = ` <div class="form-row my-2">
<label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
<div class="col-md-4">
    <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
</div>
<div class="col-md-4">
    <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}"
        placeholder="Enter Parameter ${addedParamCount + 2} Value">
</div>
<button class="btn btn-primary deleteParam">-</button>
</div>
<div id="params"></div>
</div>`;

    //convert the element string to dom node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    //add an eventListener to delete a param on clicking -
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            //add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})


//if the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // document.getElementById('responseJsonText').value = "please wait...Fetching response";
    document.getElementById('responsePrism').innerHTML="please wait...Fetching response";

    //fetch all the values,user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    //log all the values in the console for debugging
    //   console.log("url is",url);
    //   console.log("requestType is",requestType);
    //   console.log("content type is",contentType);
    //if user has used params option inseatd of json coolect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined){ //if we delete a custom parameter, it shouldn't throw error
                let key = document.getElementById('parameterKey' + (i + 1)).value;
            let value = document.getElementById('parameterValue' + (i + 1)).value;
            data[key] = value;
        }
    }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestjsonText').value;
    }
    console.log("url is", url);
    console.log("requestType is", requestType);
    console.log("content type is", contentType);
    console.log("data is", data);

//if the request type is post, invoke fech api to create a post request

    if(requestType=='GET'){
        fetch(url,{
            method:'GET',
        })
        .then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value=text;
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                "Content-type":"application/json;charset=UTF-8"
            }
        })
        .then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value=text;
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
        });
    }

})
