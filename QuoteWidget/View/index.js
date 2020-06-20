let request = require('request');	//create object of request

let url = "https://type.fit/api/quotes" //API's URL (endpoint)

request(url , function(err, response, body){ //The function is call-back function
	let bodyJson = JSON.parse(body);
	let quote = bodyJson[Math.floor(Math.random()*20)]['text']; //return 'text' field of random element of the array0-20
	
	document.getElementById("quote").innerHTML = quote; // sent the html tagged by ID to quote
	console.log(quote);
})

setInterval(function() { // calls the function every 5000ms
	request(url , function(err, response, body){ //The function is call-back function
	let bodyJson = JSON.parse(body);
	let quote = bodyJson[Math.floor(Math.random()*20)]['text']; //return 'text' field of random element of the array0-20
	
	document.getElementById("quote").innerHTML = quote; // sent the html tagged by ID to quote
	console.log(quote);
	})
}, 5000);