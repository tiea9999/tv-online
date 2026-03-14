import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req,res)=>{
res.send("TIEA IPTV PROXY RUNNING");
});

app.get("/proxy", async (req,res)=>{

const url=req.query.url;

if(!url){
return res.status(400).send("No url");
}

try{

const response=await fetch(url,{
headers:{
"Referer":"https://24playerhd.com/",
"User-Agent":"Mozilla/5.0"
}
});

res.set("Access-Control-Allow-Origin","*");

response.body.pipe(res);

}catch(err){

res.status(500).send(err.toString());

}

});

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("Proxy running on port "+PORT);
});
