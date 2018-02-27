console.log("ready!");
var topics = ["raccoon", "cat", "dog", "pig", "squirrel", "bear", "frog", "goat", "bat", "owl", "fish", "rabbit", "panda", "rat", "mouse"];
var gifNum = 10;
console.log(topics.length)
var animal;
var results;
var state;
renderButton(topics);

function renderButton(arr) {
    $("#buttons").empty();
    for (var i = 0; i < arr.length; i++) {
        var b = $("<button>");
        b
            .addClass("btn btn-info animals")
            .attr("data-name", arr[i])
            .text(arr[i]);
        $("#buttons").append(b);
    }
}

function renderGifs(aData) {
    $("#gifs").empty();
    for (let i = 0; i < aData.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = aData[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animalImage = $("<img class='gify'>");
        animalImage
            .attr("src", aData[i].images.fixed_width_still.url)
            .attr("data-still", aData[i].images.fixed_width_still.url)
            .attr("data-animate", aData[i].images.fixed_width.url)
            .attr("data-state", "still").attr("id", 'gif' + i);
        gifDiv.append(p);
        gifDiv.append(animalImage);
        $("#gifs").prepend(gifDiv);
    }
}
$(document).ready(function() {
    $(document).on("click", ".gify", function() {
        state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    renderButton(topics);
    $(document).on("click", ".animals", function(event) {
        animal = $(this).attr("data-name");
        console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=" + gifNum + "&api_key=dc6zaTOxFJmzC";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            results = response.data;
            renderGifs(results);
        }).fail(function() {
            $(".gify").empty();
            $(".gify").text("Something went wrong....");
        });

    });
    $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        $("#instruction").empty();
        var newAnimal = $("#animalInput")
            .val()
            .trim();
        $("#animalInput").val("");
        if (topics.indexOf(newAnimal) > -1) {
            var inst = $("<p>").text("This button alredy exist.");
            $("#instruction").append(inst)
        } else if (newAnimal === "") {
            var inst = $("<p>").text("This is empty field.");
            $("#instruction").append(inst);
        } else {
            topics.push(newAnimal);
            renderButton(topics);
        }
    })
});