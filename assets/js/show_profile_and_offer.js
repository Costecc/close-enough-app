var url = "http://192.168.43.49:8000/";

$("body").on("click", "#test_01", function(e){
	
	var id = 1;
	
	$.ajax({
		method: "GET",
		url: url+"account/"+id+"/",
		success: function(result){
			//if(result.is_worker){
			//	user
				var el = $("#Profile");
				var img = el.find("#user_photo");
				var expirience = el.find("#expirience_cont");
				var skills = el.find("#skills_cont");
				var desc = el.find("#desc_cont");
				var links = el.find("#links_cont");
				var i;
				
				img.attr("src", url + "account/" + result.pictuer);
				expirience.html("");
				for(i = 0; i < result.expirience.length; i++){
					expirience.append("<p>" + result.expirience[i].year + " - " + result.expirience[i].name + "</p>");
				}
				skills.html("");
				for(i = 0; i < result.skills.length; i++){
					skills.append("<p> - " + result.skills + "</p>");
				}
				desc.html(result.desc);
				links.html("");
				for(i = 0; i < result.links.length; i++){
					links.append("<p><span>icon</span><a href='" + result.links[i] + "'>" + result.links[i] + "</a></p>");
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
	
	var id = 1;
	
	$.ajax({
		method: "GET",
		url: url+"offer/"+id+"/",
		success: function(result){
			//if(result.is_worker){
			//	user
				var el = $("#Offer");
				var img = el.find("#user_photo");
				var position = el.find("#offer_position_cont");
				var salary = el.find("#offer_salary_cont");
				var address = el.find("#offer_address_cont");
				var desc = el.find("#offer_desc_cont");
				var i;
				
				img.attr("src", url + "offer/" + result.pictuer);
				position.html(result.position);
				salary.html(result.min_salary + " - " + result.max_salary);
				address.html(result.address);
				desc.html(result.desc);
				
				el.show();
			//}else{
			// offer
			
			//}
		},
		dataType: "json"
	});
	
});

