

if (localStorage.getItem("auth-uuid")) {

    $.ajax({
        type: "GET",
        url: "https://script.google.com/macros/s/AKfycbyGKdY8PhShHp3qvPE9QqELU3boi75y50SLbvRA8K5dL2d472rM6rM2MRsXezWgutFcng/exec",
        data: { "type": "read_user", "haruharumail": localStorage.getItem("h-mail"), "uuid": localStorage.getItem("auth-uuid") },
        async: true
    }).done(function (data) {
       
        var infod = data.split(",");
    
    if(infod[4] !== ""){ 
        var newDiv = document.createElement("div");
        newDiv.style.border = "2px orangered solid";
        newDiv.style.padding = "20px";
        newDiv.style.margin = "5px";
        newDiv.style.userSelect = "none";
        var boldText = document.createElement("div");
        boldText.style.fontWeight = "bold";
        boldText.style.color = "orangered";
        boldText.style.fontSize = "20px";
        boldText.textContent = "i 災害情報";
        newDiv.appendChild(boldText);
        var paragraph = document.createElement("p");
        newDiv.appendChild(paragraph);
        paragraph.innerHTML = infod[4];
        var link = document.createElement("a");
        link.href = "https://www.data.jma.go.jp/multi/quake/index.html?lang=jp";
        link.style.fontWeight = "bold";
        link.style.color = "#000";
        link.style.textAlign = "center";
        link.style.display = "block";
        link.style.backgroundColor = "wheat";
        link.style.padding = "20px";
        link.style.borderRadius = "50px";
        link.style.textDecoration = "none";
        link.textContent = "気象庁のホームページで詳細を確認する";
        newDiv.appendChild(link);
        var targetDiv = document.getElementById("tdiv");
        targetDiv.appendChild(newDiv);
        }else{
            console.log("災害情報なし");
      }
    });

} else {

    if (getParam("UNM")) {
        var uname = getParam("UNM");
    } else {
        var uname = "guest user";

    }
    console.log(uname);
    $.ajax({
        type: "POST",
        url: "https://script.google.com/macros/s/AKfycbza4Dw5hgx8weXWJRcVVKpgN873zA90qEIcGKl4E1MK9QbFI5-iHFJ6xsd92Qwxj8iBsw/exec",
        data: { field1: uname, field2: navigator.userAgent },
        async: true
    }).done(function (data) {
        var parmdata = data.split('|');
        localStorage.setItem("auth-uuid", parmdata[0]);
        localStorage.setItem("h-mail", parmdata[1]);
        localStorage.setItem("usemail", "yes");
    });
}

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
