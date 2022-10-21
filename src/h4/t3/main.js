
async function getNames() {
    let url = 'names.json';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

//render first search bar
async function renderOptions() {
    let names = await getNames();
    let optionsElement = document.getElementById("datalistOptions1");
    for (let i = 0; i < names.length; i++) {
        option = document.createElement('option');
        option.value = names[i];
        optionsElement.appendChild(option);
    }
}

//render second search bar
async function renderForm(event) {

    //get names from json-file
    let names = await getNames();

    let ulElement = document.getElementById("searchOutput");
    const liElements = document.getElementById("searchOutput").children;

    if (event == "ArrowDown") {
        console.log(event);
        var found = false;
        if (liElements.length > 1) {
            for (let i = 0; i < liElements.length; i++) {

                if (liElements[i].className == "active") {
                    liElements[i].className = "";
                    i++;
                    if (i >= liElements.length) {
                        liElements[0].className = "active";
                    } else {
                        liElements[i].className = "active";
                    }
                    found = true;
                    break;
                }
            }
            if (found == false) {
                liElements[0].className = "active";
            }
        }

    } else if (event == "ArrowUp") {
        console.log(event);
        var found = false;
        if (liElements.length > 1) {
            for (let i = 0; i < liElements.length; i++) {

                if (liElements[i].className == "active") {
                    liElements[i].className = "";
                    i--;
                    if (i < 0) {
                        liElements[liElements.length - 1].className = "active";
                    } else {
                        liElements[i].className = "active";
                    }
                    found = true;
                    break;
                }
            }
            if (found == false) {
                liElements[liElements.length - 1].className = "active";
            }
        }

    } else if (event == "Enter") {
        console.log(event);

        for (let i = 0; i < liElements.length; i++) {

            if (liElements[i].className == "active") {
                input2.value = liElements[i].textContent;

                while (ulElement.firstChild) {
                    ulElement.removeChild(ulElement.lastChild);
                }
            }
        }

    } else if (event == "Escape") {
        console.log(event);

        input2.value = "";

        while (ulElement.firstChild) {
            ulElement.removeChild(ulElement.lastChild);
        }

    } else {
        //clear element
        while (ulElement.firstChild) {
            ulElement.removeChild(ulElement.lastChild);
        }
        if (input2.value) {
            for (let i = 0; i < names.length; i++) {
                var myStr = names[i];
    
                if (myStr.toLowerCase().startsWith(input2.value.toLowerCase())) {
                    li = document.createElement('li');
                    li.innerHTML = names[i];
                    li.setAttribute(
                        'style',
                        'padding-left: 5px;',
                    );
                    ulElement.appendChild(li);
                }
            }
        } 
    }
}

document.getElementById("input2").addEventListener("keyup", (event) => {
    renderForm(event.key);
}, true);

document.getElementById("searchOutput").addEventListener('click', function(e) {
    e = e ;
    var target = e.target 

    input2.value = target.textContent;
    let ulElement = document.getElementById("searchOutput");
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.lastChild);
    }
}, false);


function myScript() {
    const liElements = document.getElementById("searchOutput").children;

    if (liElements.length > 1) {
        for (let i = 0; i < liElements.length; i++) {

                liElements[i].className = "";
            }
        }
        event.target.className = "active";
}