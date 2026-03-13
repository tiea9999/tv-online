async function loadM3U(file){

const response = await fetch(file);
const text = await response.text();

const lines = text.split("\n");

let name="";
let logo="";

const container=document.getElementById("channels");

for(let i=0;i<lines.length;i++){

const line=lines[i].trim();

if(line.startsWith("#EXTINF")){

const nameMatch=line.match(/,(.*)/);
if(nameMatch) name=nameMatch[1];

const logoMatch=line.match(/tvg-logo="(.*?)"/);
if(logoMatch) logo=logoMatch[1];

}

if(line.startsWith("http")){

const url=line;

const card=document.createElement("div");
card.className="channel-card";

card.innerHTML=`

<img src="${logo}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'">

<div onclick="openPlayer('${url}')">${name}</div>

`;

container.appendChild(card);

}

}

}
