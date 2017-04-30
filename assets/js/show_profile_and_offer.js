$(function() {

var url = "http://192.168.43.49:8000/";

$("body").on("click", "#test_01", function(e){
	
	var id = currentOfferId;
	$("#Profile, #Offer").hide();
	
	$.ajax({
		method: "GET",
		url: url+"account/"+id+"/",
		success: function(result){
			//if(result.is_worker){
			//	user
			
			console.log(result);
			
				var el = $("#Profile");
				var img = el.find("#user_photo");
				var experience = el.find("#experience_cont");
				var skills = el.find("#skills_cont");
				var desc = el.find("#desc_cont");
				var links = el.find("#links_cont");
				var i;
				
				img.attr("src", url + result.picture_url);
				experience.html("");
				var temp_array = JSON.parse(result.experience);
				console.log(temp_array);
				for(i = 0; i < temp_array.length; i++){
					experience.append("<p>" + temp_array[i].years + " - " + temp_array[i].name + "</p>");
				}
				skills.html("");
				var temp_array = JSON.parse(result.skills);
				for(i = 0; i < temp_array.length; i++){
					skills.append("<p> - " + temp_array[i] + "</p>");
				}
				desc.html(result.description);
				links.html("");
				var temp_array = JSON.parse(result.url);
				var icon = ["linkedin", "github"];
				for(i = 0; i < temp_array.length; i++){
					links.append("<p><i class=\"fa fa-" + icon[i] + "\" aria-hidden=\"true\"></i><a href='" + temp_array[i] + "'>" + temp_array[i] + "</a></p>");
				}
				
				
				el.show();
				
			//}else{
			// offer
			
			//}
		},
		dataType: "json"
	});
	
});

$("body").on("click", "#test_02", function(e){
	
	var id = currentOfferId;
				$("#Profile, #Offer").hide();
	
	$.ajax({
		method: "GET",
		url: url+"offers/"+id+"/",
		success: function(result){
			//if(result.is_worker){
			//	user
			console.log(result);
				var el = $("#Offer");
				var img = el.find("#offer_photo");
				var position = el.find("#offer_position_cont");
				var salary = el.find("#offer_salary_cont");
				var address = el.find("#offer_address_cont");
				var desc = el.find("#offer_desc_cont");
				var i;
				
				img.attr("src", url + result.account_entity.picture_url);
				position.html(result.position);
				salary.html(result.min_salary + " PLN - " + result.max_salary + " PLN");
				address.html(result.address);
				desc.html(result.account_entity.description);
				
				el.show();
			//}else{
			// offer
			
			//}
		},
		dataType: "json"
	});
	
});

});



