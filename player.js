let hls=null;

function play(url){

const video=document.getElementById("player");

if(hls){
hls.destroy();
hls=null;
}

video.pause();
video.removeAttribute("src");
video.load();

if(Hls.isSupported()){

hls=new Hls({
enableWorker:true,
lowLatencyMode:true,
backBufferLength:90,
maxBufferLength:30
});

hls.loadSource(url);
hls.attachMedia(video);

hls.on(Hls.Events.MANIFEST_PARSED,function(){
video.muted=false;
video.play().catch(()=>{});
});

hls.on(Hls.Events.ERROR,function(event,data){

if(data.fatal){

switch(data.type){

case Hls.ErrorTypes.NETWORK_ERROR:
hls.startLoad();
break;

case Hls.ErrorTypes.MEDIA_ERROR:
hls.recoverMediaError();
break;

default:
hls.destroy();
break;

}

}

});

}
else if(video.canPlayType("application/vnd.apple.mpegurl")){

video.src=url;
video.play();

}
else{

video.src=url;

}

window.scrollTo({top:0,behavior:"smooth"});

}
