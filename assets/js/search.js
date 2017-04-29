$(function(){
	//$("#search").on("click", function(){
		$.ajax({
			method: "POST",
			url: "http://192.168.43.49:8000/top_result/",
			success: function(result){
				console.log(result);
			},
			data: { 
				localization_x : "52.238",
				localization_y : "21.015",
				max_time : "9999",
				min_solary : "0",
				max_solary : "1000000",
				position : "6",
				is_worker : true,
				transport: "1"
			},
			dataType: "json"//,
			//contentType: "json"
		});
		
	//});
	/*	
	//$("#show_offers").on("click", function(){
		$.ajax({
			method: "GET",
			url: "http://192.168.43.49:8000/offers/1/",
			success: function(result){
				console.log(result);
			},
			data: {  },
			dataType: "json"//,
			//contentType: "json"
		});
		*/
	//});
});

/*
location_x : 52.238
location_y : 21.015
max_salary : 2000
min_salary : 1000
name : "Sage"
street : "Tadeusza Czackiego 19, Warszawa, Poland"
time : 0
url : "lol"
*/