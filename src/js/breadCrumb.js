function showBreadCrumb(){
    let crumbs = window.location.pathname.split("/");

    for(let index=0; index<crumbs.length-1; index++){
        let text = crumbs[index];
        if(index==0) text = "Home";
        document.getElementById("breadCrumbLinks").append((`<li>${text}</li>`));
        /*document.getElementById('breadCrumbLinks').append(("<li><a class='crumb"+ (index==crumbs.length-2? "active" : "") +"' href='"+buildRelativeLink(crumbs.length-index)+"'>"+ text +"</a></li>"));*/
    }
}

function buildRelativeLink(level)
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