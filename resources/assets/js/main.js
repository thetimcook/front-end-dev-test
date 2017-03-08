

//Fix animation on hamburger button
$('.hamburger').on('click', function() {
	if ($(this).hasClass('collapsed')) $(this).addClass('is-active');
	else $(this).removeClass('is-active');
});

//Non handlebar method
function displayCats(images){	
	$.each(images, function(index, item) {
	    $("#image-grid").append("<img id='"+item['id']+"' alt='"+item['source_url']+"' src='"+item['url']+"' onerror='imgError(this);' />");
	});
}

function getCats(){
	var images = [];
	$.get( "http://thecatapi.com/api/images/get?format=xml&results_per_page=20", function( data ) {
		$(data).find("image").each(function(i) {
			var newObject = {
				url: $(this).find("url").text(),
				id: $(this).find("id").text(),
				source_url: $(this).find("source_url").text()
			};
			images.push(newObject);
	    }).promise().done(function () { 
		    displayCats(images);
		});
	});
// 	return images;
}
getCats();

Handlebars.registerHelper('placeCats', function() {
	var url = Handlebars.escapeExpression(this.url),
		id = Handlebars.escapeExpression(this.id),
		source_url = Handlebars.escapeExpression(this.source_url);
      
	return new Handlebars.SafeString(
		"<img id='"+id+"' alt='"+source_url+"' src='"+url+"'/>"
	);
});

// var items = getCats();
var source   = $("#display-cats").html();
var template = Handlebars.compile(source);

// $('.container').append (template(items));

//Remove missing images
function imgError(image) {
    image.onerror = "";
    image.remove();
    return true;
}



