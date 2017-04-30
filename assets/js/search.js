
$(function() {
    $("#search").on("click", function() {

        $("#error_search").hide();

        var data_post = {
            location_x: $("#search_form").find("input[name='localization_x']").val(),
            location_y: $("#search_form").find("input[name='localization_y']").val(),
            max_time: $("#search_form").find("input[name='InputTime']").val(),
            min_salary: $("#slider-range").slider("values", 0),
            max_salary: $("#slider-range").slider("values", 1),
            position: $("#search_form").find("select[name='position']").val(),
            is_worker: true,
            transport: $("#search_form").find("select[name='transport']").val()
        };

        //console.log(data_post);

        // var error = "";
				//
        // if (!data_post.localization_x > 0 || !data_post.localization_y > 0)
        //     error = "Nie wybrano lokalizacji.<br />";
				//
        // if (!data_post.max_time > 0)
        //     error = "Nie wybrano limitu czasu na dojazd. <br />";
				//
        // if (error == "") {
            //console.log(data_post);

            const url = 'http://192.168.43.49:8000/top_result/';
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: {
									location_x: parseFloat(data_post.location_x),
									location_y: parseFloat(data_post.location_y),
									max_time: parseInt(data_post.max_time),
									min_salary: parseInt(data_post.min_salary),
									max_salary: parseInt(data_post.max_salary),
									position: data_post.position,
									is_worker: true,
									transport: data_post.transport.toLowerCase()
								}
            }).done(function(response) {
							var RADIUS = response.radius;
							$('#radius').text(RADIUS);
							console.log(RADIUS)
							markersToShow.forEach(marker => marker.setMap(null))
							offersArray=[]
							markersToShow=[]
                response.entities.forEach(result => offersArray.push(result));
                // console.log(response.entities);
                // console.log(offersArray)
								flag = !flag;
								// console.log(flag)




            }).fail(function(error) {
                console.log(error);
            });
        // }



    });
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
