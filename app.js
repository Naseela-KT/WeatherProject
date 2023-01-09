const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})

app.post("/",function(req,res){
    const city=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=304f30b014c5c6fc8aaf357edac33627";

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const img="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is "+desc+"</p>");
            res.write("<h1>Temp in "+city+" is "+temp+"</h1>");
            res.write("<img src="+img+">");
            res.send();
        })
    })
})

app.listen(3000);

