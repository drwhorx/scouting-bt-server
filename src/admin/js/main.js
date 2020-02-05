function convert() {
    let arr = [];
    let recur = (obj) => {
        if (!obj.children || obj.children.length == 0)
            return arr.push(obj);
        obj.children.forEach(recur);
    };
    table.forEach(recur);
    arr = arr.map(item => {
        let copy = Object.assign({}, item);
        delete copy.children;
        return copy;
    });
    return arr;
}

function uploadColumns() {
    let columns = convert();
    socket.emit("upload", columns);
}

function edit(element) {
    if (element.children.length > 0) return;
    let value = element.innerText;
    let input = document.createElement("input");
    input.type = "text";
    input.value = value;
    element.innerText = "";
    element.appendChild(input);
    let confirm = document.createElement("button");
    confirm.innerText = "✓";
    confirm.classList.add("confirm");
    let event = (function (item) {
        return {
            call: () => concur(item)
        }
    })(input);
    confirm.onclick = event.call;
    element.appendChild(confirm);
}

function concur(element) {
    let parent = element.parentNode;
    let value = element.value;
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    parent.innerText = value;
}

function insertRow() {
    let table = document.getElementById("table");
    let row = table.insertRow(table.rows.length - 1);
    let del = row.insertCell();
    let button = document.createElement("button");
    let event = (function (item) {
        return {
            call: () => deleteRow(item)
        }
    })(row);
    button.onclick = event.call;
    button.classList.add("delete");
    button.innerText = "X";
    del.appendChild(button);
    let headers = document.getElementById("headers");
    for (let i = 0; i < headers.children.length - 1; i++) {
        let element = row.insertCell();
        let event = (function (item) {
            return {
                call: (e) => {
                    if (e.target !== item) return;
                    edit(item);
                }
            }
        })(element);
        $(element).click(event.call);
    }
}

function deleteRow(row) {
    let table = document.getElementById("table");
    table.removeChild(row);
}

function sort(element) {
    let table = document.getElementById("table");
    let headers = document.getElementById("headers");
    let arr = [];
    let index = Array.from(headers.children).findIndex(e => e.innerText == element.innerText);
    let lastSorted = sessionStorage.getItem("lastSorted");
    let ascending;
    if (lastSorted == index)
        ascending = sessionStorage.getItem("ascending") != "true";
    else {
        ascending = true;
        if (lastSorted) headers.children[lastSorted].style.color = null;
        headers.children[index].style.color = "red";
    }
    let algorithm;
    if (ascending)
        algorithm = (a, b) => {
            if (b.children[index].innerText > a.children[index].innerText)
                return -1;
            else if (a.children[index].innerText > b.children[index].innerText)
                return 1;
            else
                return 0;
        };
    else
        algorithm = (a, b) => {
            if (b.children[index].innerText > a.children[index].innerText)
                return 1;
            else if (a.children[index].innerText > b.children[index].innerText)
                return -1;
            else
                return 0;
        };
    while (table.children.length > 2) {
        arr.push(table.removeChild(table.children[1]));
    }
    arr = arr.sort(algorithm);
    for (let row of arr) {
        table.insertBefore(row, table.lastChild);
    }
    sessionStorage.setItem("lastSorted", index);
    sessionStorage.setItem("ascending", ascending);
}
function resetData() {
    let conf = confirm("Are you sure you want to erase all data?");
    if (!conf) return;
    socket.emit("clear");
    let table = document.getElementById("table");
    while (table.children.length > 2) {
        table.removeChild(table.children[1]);
    }
}
function getData() {
    socket.emit("get");
    socket.on("catch", (data) => {
        if (data.length == 0) return alert("No data");
        let table = document.getElementById("table");
        table.innerHTML = "<tr id=\"headers\"></tr>";
        let headers = document.getElementById("headers");
        headers.insertCell();
        for (let title in data[0]) {
            let td = document.createElement("td");
            td.innerText = title;
            headers.appendChild(td);
            let event = (function (item) {
                return {
                    call: () => sort(item)
                }
            })(td);
            td.onclick = event.call
        }
        for (let row of data) {
            let rowElement = table.insertRow();
            let del = rowElement.insertCell();
            let button = document.createElement("button");
            let event = (function (item) {
                return {
                    call: () => deleteRow(item)
                }
            })(rowElement);
            button.onclick = event.call;
            button.classList.add("delete");
            button.innerText = "X";
            del.appendChild(button);
            for (let item in row) {
                let element = rowElement.insertCell();
                element.innerText = row[item];
                let event = (function (item) {
                    return {
                        call: (e) => {
                            if (e.target !== item) return;
                            edit(item);
                        }
                    }
                })(element);
                $(element).click(event.call);
            }
        }
        let button = document.createElement("button");
        button.onclick = insertRow;
        button.classList.add("add");
        button.innerText = "+";
        table.insertRow().insertCell().appendChild(button);
    })
}
window.onload = () => {

};