//initial button array
var produce = ["Eggplant", "Apples", "Peppers", "Cherries"];

//function to query Giphy and display GIF images
function displayProducePics() {
  //clear anything from GIF display div
  $("#produce-view").empty();
  //assign variables for giphy query url
  var  produceName =$(this).attr("data-name");
  var apiKey = "501521d55ee145d2ac15cae5afb60001";
  var imageLimit = 10;
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+apiKey+"&limit="+imageLimit+"&q="+produceName;
  //Use ajax call to obtain images asychronously
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){
    var results = response.data;
    //loop through images returned and assign attributes and display settings to GIF images
    for (var i = 0; i < results.length; i++) {
      //create divs to hold images
      var cardDiv =$("<div class='cardDiv'>");
      var gifDiv = $("<div>");
      //obtain image rating from response
      var rating = results[i].rating;
      var p = $("<h4>").text("Rating: " + rating.toUpperCase());
      var produceImage = $("<img>");
      //assign image source initially as still image but include animated as attribute
      produceImage.attr("src", results[i].images.fixed_height_still.url);
      produceImage.attr("data-still",results[i].images.fixed_height_still.url);
      produceImage.attr("data-animate",results[i].images.fixed_height.url);
      produceImage.attr("data-state","still");
      produceImage.addClass("gif");
      gifDiv.prepend(p);
      gifDiv.prepend(produceImage);
      cardDiv.prepend(gifDiv);
      //prepend GIF images to div
      $("#produce-view").prepend(cardDiv);
    }
  });
}

//function to render buttons for all array elements of produce array
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < produce.length; i++) {
    var a = $("<button>");
    a.addClass("produce btn new-btns");
    a.attr("data-name", produce[i]);
    a.text(produce[i]);
    $("#buttons-view").append(a);
  }
}

//assign click event to add new produce input submit button
$("#add-produce").on("click", function(event) {
  event.preventDefault();
  //get value of text submitted in space by user
  var newProduce = $("#produce-input").val().trim();
  //prevent addition of empty buttons
  if(newProduce==""){
    return;
  }
  //add new produce to produce array
  produce.push(newProduce);
  //re-render all buttons in produce array
  renderButtons();
  //clear input space
  $("#produce-input").val("");
});


//assign click event to all images with class gif
$(document).on("click",".gif", function() {
  var state = $(this).attr("data-state");
  //if image is in still state, then animate
  if(state == "still"){
    $(this).attr("src",$(this).attr("data-animate"));
    $(this).attr("data-state","animate");
  }
  //if image is in animate state, then still
  else if(state == "animate"){
    $(this).attr("src",$(this).attr("data-still"));
    $(this).attr("data-state","still");
  }
});

//assign click event to all buttons with class produce
$(document).on("click", ".produce", displayProducePics);

//call function to render buttons
renderButtons();
