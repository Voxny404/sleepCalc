let timesMin = document.getElementById('timesMin');
let timesH = document.getElementById('timesH');
let offSet = document.getElementById('offSet');

function elementCreationLoopSelector(selectors) {
    for (let i = 0; i < 60; i++) {
        if (i < 10) createElement(i, '0'+i, 'min', selectors);
        else createElement(i, i, 'min', selectors);
    }

    for (let i = 0; i < 60; i++) {
        if (i < 10) createElement(i, '0'+i, 'offset', selectors);
        else createElement(i, i, 'offset', selectors);
    }
    
    for (let i = 1; i <= 24; i++) {
        if (i < 10) createElement(i, '0'+i, 'hours', selectors);
        else createElement(i, i, 'hours', selectors);
    }
}

function createElement(value, text, time, selectors) {
    let option = document.createElement("option");
    option.text = text;
    option.value = value;
    if (time === 'min') selectors[1].appendChild(option);
    if (time === 'hours') selectors[0].appendChild(option);
    if (time === 'offset') selectors[2].appendChild(option);
}

elementCreationLoopSelector([timesH, timesMin, offSet])
