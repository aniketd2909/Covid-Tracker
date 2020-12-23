require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
	res.sendFile(__dirname+"/public/index.html");
  });



app.post("/",function(req,res){



	const query=req.body.countryName;
	const options = {
	"method": "GET",
	"hostname": "covid-19-data.p.rapidapi.com",
	"port": null,
	"path": "/country?name="+query,
	"headers": {
		"x-rapidapi-key": KEY,
		"x-rapidapi-host": HOST,
		"useQueryString": true
	}
	};

	
	https.get(options,function(response){
	  


	  response.on("data",(data)=>{
		const covidData=JSON.parse(data);
		const covidConfirmed=covidData[0].confirmed;
		const covidRecovered=covidData[0].recovered;
		const covidCritical=covidData[0].critical;
		const covidDeaths=covidData[0].deaths;
		const covidLastUpdate=covidData[0].lastUpdate;


		res.setHeader("Content-Type", "text/html");
		res.write("<h1> Confirmed Cases :"+covidConfirmed+"</h2>");
		res.write("<h1> Recovered Cases :"+covidRecovered+"</h2>");
		res.write("<h1> Critical Cases :"+covidCritical+"</h2>");
		res.write("<h1> Death Cases :"+covidDeaths+"</h2>");
		res.write("<h1> Last Updated :"+covidLastUpdate+"</h2>");
		
		res.end()

	  })
	})
  })
  


app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000.");
})
