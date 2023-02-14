import { getParam } from "./utils.mjs";


function showBreadCrumb(){
    let crumbs = window.location.pathname.split("/");
    let prodCatagory = getParam('product');

    for(let index=0; index<crumbs.length-1; index++){
        let text = crumbs[index];
        if(index==0) { 
            text = "Home";
        }
       
       document.getElementById('breadCrumbLinks').append(("<li><a class='crumb"+ (index==crumbs.length-2? "active" : "") +"' href='"+buildLink(crumbs.length-index)+"'>"+ text +"</a></li>"));
    }
    
}

function buildLink(level)
{
    level = level - 1;
    let link="";
    for (let i=1; i<level; i++)
    {
        link=link+ "../"; //Used to navigate one level up towards parent
    }
    return link;
}

showBreadCrumb();