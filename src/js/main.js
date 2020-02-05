function level(obj) {
    if (!obj.children || obj.children.length == 0) return 0;
    return 1 + Math.max(...obj.children.map(level))
}

const inc = (element) => {
    let el = document.createElement("button");
    let event = (function (item) {
        return {
            call: () => item.value++
        }
    })(element);
    el.onclick = event.call;
    el.innerText = "+";
    return el;
};
const dec = (element) => {
    let el = document.createElement("button");
    let event = (function (item) {
        return {
            call: () => item.value--
        }
    })(element);
    el.onclick = event.call;
    el.innerText = "-";
    return el;
};

function createDiv(obj) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    p.innerText = obj.title;
    div.appendChild(p);
    if (obj.type == "stack") {
        div.setAttribute("stack", true);
    } else if (obj.type == "number" || obj.type == "text") {
        let child = document.createElement("input");
        child.type = "text";
        child.setAttribute("id", obj.id);
        child.setAttribute("data", true);
        div.appendChild(child);
        if (obj.type == "number") {
            child.value = 0;
            div.appendChild(inc(child));
            div.appendChild(dec(child));
        }
    } else if (obj.type == "opts") {
        let opts = obj.opts;
        let child = document.createElement("select");
        child.setAttribute("id", obj.id);
        child.setAttribute("data", true);
        for (let a = 0; a < opts.length; a++) {
            let opt = document.createElement("option");
            opt.innerText = opts[a];
            child.appendChild(opt);
        }
        div.appendChild(child);
    }
    div.style.width = (200 + (level(obj) * 30)) + "px";
    return div;
}

const converted = [];

window.onload = function () {
    document.getElementById("items").hidden = true;

    function recur(obj) {
        if (!obj.children || obj.children.length == 0) {
            converted.push(obj);
            return createDiv(obj);
        }
        let div = createDiv(obj);
        let children = obj.children.map(recur);
        children.forEach(item => $(item).addClass("stacked"));
        div.append(...children);
        return div;
    }

    for (let obj of table) {
        document.getElementById("items").appendChild(recur(obj));
    }
    document.getElementById("items").hidden = false;
};

function submit() {
    let out = [];
    let data = $("[data='true']");
    for (let item of Array.from(data)) {
        let obj = converted.find(obj => obj.id == item.id);
        if (obj.optional === undefined && obj.type === "text" && item.value === "") {
            alert("Data entry for \"" + item.id + "\" is invalid!");
            return;
        }
        if (obj.type == "number" && (isNaN(Number(item.value)) || item.value === "")) {
            alert("Data entry for \"" + item.id + "\" is invalid!");
            return;
        }
        out.push(item.value);
    }
    socket.emit("receive", out);
    alert("Sent!");
}