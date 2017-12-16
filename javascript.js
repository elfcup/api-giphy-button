console.log("Hello");

var pokemonPlural = ["squirtle", "bulbasaur", "pikachu", "wooper", "quagsire", "tyranitar", "dragonite", "chansey", "blissey", "vaporeon", "flareon", "jolteon", "igglybuff", "jigglypuff"]

//var apiKey = H0bDz50QfL5oZpokFDJJlHK5KtdHfaIQ

function displayPokemonInfo() {
    var pokemon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        pokemon + "&api_key=H0bDz50QfL5oZpokFDJJlHK5KtdHfaIQ&limit=10";
  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {

            var pokemonDiv = $("<div>");
            var p = $("<p>");
            var rating = results[i].rating;          
            var pokemonStill = results[i].images.fixed_height_still.url;
            var pokemonMoving = results[i].images.fixed_height.url;
            var pokemonImage = $("<img>");      

            p.text(results[i].rating);      

            pokemonImage.attr("src", pokemonStill);
            pokemonImage.addClass("pokemonGiphy");
            pokemonImage.attr("data-state", "still");
            pokemonImage.attr("data-still", pokemonStill);
            pokemonImage.attr("data-move", pokemonMoving);
            pokemonDiv.append(p);
            pokemonDiv.append(pokemonImage);
            $("#pokemon-view").prepend(pokemonDiv);
            //not sure if there is a way to condense the above stuff...
        }
    });

}

function renderButtons() {
    // the empty thingy makes sure there are not repeat buttons
    $("#buttons-view").empty();

    for (var i = 0; i < pokemonPlural.length; i++) {
        var a = $("<button>");
        a.addClass("pokemon");
        a.attr("data-name", pokemonPlural[i]);
        a.text(pokemonPlural[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-pokemon").on("click", function(event) {
    event.preventDefault();
    var pokemon = $("#pokemon-input").val().trim();
    pokemonPlural.push(pokemon);
    renderButtons();
});

$(document).on("click", ".pokemon", displayPokemonInfo);
// below tells the renderButtons function to run, which will
// display the intial buttons from my array
renderButtons();
$(document).on("click", ".pokemonGiphy", pausePlayGifs);
//this will make the next function run, allowing the gifs to pause and unpause


//this is super confusing, and I kinda know how it works but kinda not...
function pausePlayGifs() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-move"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}