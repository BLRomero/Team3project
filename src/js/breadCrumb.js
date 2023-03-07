import { getParam } from "./utils.mjs";

//function createBreadCrumbs() {
// Get the current URL and split it into an array of parts
/*var url = window.location.href;
var parts = url.split('/');
 
// Create a breadcrumb container and add a home link
var breadcrumb = document.createElement('div');
breadcrumb.className = 'breadcrumb';
breadcrumb.innerHTML = '<a href="/">Home</a>';
 
// Loop through the parts array and add a link for each part
var path = '/';
for (var i = 0; i < parts.length; i++) {
  if (parts[i] !== '') {
    // Add a separator and a link to the current part
    breadcrumb.innerHTML += ' / <a href="' + path + parts[i] + '">' + parts[i] + '</a>';
    path += parts[i] + '/';
  }
}
 
// Get the <main> element and insert the breadcrumb at the beginning
var main = document.querySelector('main');
if (main) {
  main.insertBefore(breadcrumb, main.firstChild);
}*/

/*let crumbsPath = window.location.pathname.split("/");
if (crumbsPath[0] === "") {
    crumbsPath.shift();
    crumbsPath.unshift("Home");
    crumbsPath.pop();
    let prodCatagory = getParam('product');
    //crumbs.push(`${prodCatagory}`);
    
}

const crumbs = [""];
let path = location.href.split('/').slice(3);

const linkPath = [{ "main": '127.0.0.1:5173/index.html', "link": '/' }];

for (let i = 0; i < path.length; i++) {
    const component = path[i];
    //const anchorText = decodeURIComponent(component).toUpperCase().split('.')[0];
   // const link = '/' + path.slice(0, i + 1).join('/');
   // linkPath.push({ "main": anchorText, "link": link });
}

let values = linkPath.map((part) => {
    return `<a href=" " + part.link + " ">` + part.main + '</a>'
}).join('<span style="margin: 5px">/</span>')

let element = document.getElementById("breadCrumbLinks");
element.innerHTML = values;*/

//}


//createBreadCrumbs();

function showBreadCrumb() {
    
    //let crumbs = window.location.pathname.split("/");
    //const crumbArray = ["home"];
    // console.log("crumbs: ", crumbs);
    let url = window.location.href;
    let parts = url.split('/').slice(3);

    let newElement = document.createElement('div');
    newElement.setAttribute('id', 'breadCrumbLinks');

    let breadcrumb = '<ul>'
    // breadcrumb += '<li><a href="/">Product Category</a></li>';
    let prodCatagory = getParam('product');
    //crumbs.push(`${prodCatagory}`);

    // let text = `<ul>`;
    for (let index = 0; index < parts.length - 1; index++) {
        if (index == 0) {
            breadcrumb += '<li><a href="/">Product Category</a></li>';
            continue;
        }

        breadcrumb += `<li>${prodCatagory}</li>`;

    }

    breadcrumb += '<ul>';

    document.getElementById('breadCrumbLinks').innerHTML = breadcrumb;

    // Get the <main> element and insert the breadcrumb at the beginning
    var main = document.querySelector('main');
    if (main) {
        main.insertBefore(newElement, main.firstChild);
    }
    
    /*
    for (let index = 0; index < crumbs.length - 1; index++) {
        if (index == 0) {
            const li = document.createElement("li");
            li.setAttribute("class", "crumbs");
            //let text = crumbs[index];
 
            let text = document.createTextNode("home");
            li.appendChild(text);
 
            const element = document.getElementById('breadCrumbLinks');
            element.appendChild(li);
        }
 
        const li = document.createElement("li");
        li.setAttribute("class", "crumbs");
        //let text = crumbs[index];
 
        let text = document.createTextNode(prodCatagory);
        li.appendChild(text);
 
        const element = document.getElementById('breadCrumbLinks');
        element.appendChild(li);
    }*/


    /* document.getElementById('breadCrumbLinks').append(("<li><a class='crumb"+ (index==crumbs.length-2? "active" : "") +"' href='"+buildLink(crumbs.length-index)+"'>"+ text +"</a></li>"));
    }*/




}

showBreadCrumb();