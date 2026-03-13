let hls;

function openPlayer(url){

const modal=document.getElementById("playerModal");
const video=document.getElementById("playerFrame");

modal.style.display="flex";

if(hls){
hls.destroy();
}

if(Hls.isSupported()){

hls=new Hls({

enableWorker:true,
lowLatencyMode:true,

backBufferLength:120,
maxBufferLength:150,
maxMaxBufferLength:300,

liveSyncDurationCount:3,
liveMaxLatencyDurationCount:5,

manifestLoadingMaxRetry:8,
levelLoadingMaxRetry:8,
fragLoadingMaxRetry:10,

startFragPrefetch:true,
capLevelToPlayerSize:true

});

hls.loadSource(url);
hls.attachMedia(video);

hls.on(Hls.Events.MANIFEST_PARSED,function(){
video.play();
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

else if(video.canPlayType('application/vnd.apple.mpegurl')){

video.src=url;
video.play();

}

}

function closePlayer(){

const modal=document.getElementById("playerModal");
const video=document.getElementById("playerFrame");

video.pause();
video.removeAttribute("src");
video.load();

if(hls){
hls.destroy();
}

modal.style.display="none";

}
