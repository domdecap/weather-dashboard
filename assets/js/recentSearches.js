let getButtonValue = function (value) {
    let buttonValue = value.innerHTML;
    locationApiCall(buttonValue);
};

let buttonCreation = function (content) {
    let citybtn = document.createElement('button');
    citybtn.textContent = content;
    citybtn.onclick = function () { getButtonValue(this); };
    return citybtn
}