var mobile = {

rand: 0,    //create a random number to select a random index from array
moviesArray: ["the_shape_of_water", "moonlight","spotlight","birdman", "12_years_a_slave", "argo", "the_artist", "the_hurt_locker", "slumdog_millionaire", "no_country_for_old_men", "the_departed", "crash", "chicago", "a_beautiful_mind", "gladiator", "american_beauty", "shakespeare_in_love", "titanic", "the_english_patient", "braveheart", "forrest_gump", "unforgiven", "the_silence_of_the_lamb", "dances_with_wolves", "driving_miss_daisy", "rain_man", "the_last_emperor", "platoon", "out_of_africa", "amadeus", "terms_of_endearment", "gandhi", "chariots_of_fire", "ordinary_people" ],
randMovie: "",
underArray: [],
underString: "",
lettersArray : ["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",],
selectedArray: [],
lives: 5,
wins: 0,
triedArray: [],
triedString: "",


pick_movie: function () {
    this.rand = Math.floor(Math.random() * this.moviesArray.length);
    this.randMovie = this.moviesArray[this.rand];
},

display_underscores: function (){
    this.underArray.length = 0;
    
    for (i=0 ; i<this.randMovie.length ; i++ ) {
        if (this.randMovie[i] !== "_") {
            this.underArray.push("__ ")
        } else {
            this.underArray.push("&nbsp;" + "&nbsp;" + "&nbsp;");
        }
    }
    this.underString = this.underArray.join("");
    $("#underscores").html(this.underString);
    console.log(this.randMovie);

},

display_letters: function (){
    var newBtn = "" ;
    $("#letterHolder0").empty();
    $("#letterHolder1").empty();
    $("#letterHolder2").empty();
    $("#letterHolder3").empty();
    for(i=0 ; i < this.lettersArray.length ; i++) {
        if (i<10){
            newBtn = $('<button>');
            newBtn.attr("id", "btn-" + this.lettersArray[i]);
            newBtn.text(this.lettersArray[i]);
            $('#letterHolder0').append(newBtn);
        }
        else if (i>9 && i<20) {
            newBtn = $('<button>');
            newBtn.text(this.lettersArray[i]);
            $('#letterHolder1').append(newBtn);
        } 
        else if (i>19 && i<29){
            newBtn = $('<button>');
            newBtn.text(this.lettersArray[i]);
            $('#letterHolder2').append(newBtn);
        } else {
            newBtn = $('<button>');
            newBtn.text(this.lettersArray[i]);
            $('#letterHolder3').append(newBtn);
        }
    }
    

}, 

display_lives: function () {
    $("#lives").text(this.lives + "  Remaining lives");
},

display_tried: function () {
    
    $("#tried").html("You have tried: " + this.triedString);
},

display_wins: function() {
    if (this.wins == 1){
    $("#wins").text(this.wins + "  Win");
    } else {
    $("#wins").text(this.wins + "  Wins");
    }
},

game_logic: function(event) {
    var userGuess = event.target.innerText;
    var boolGuess = true;
    $("#lives").text(this.lives + "Remaining lives");
    for (i=0; i<this.randMovie.length; i++) {
        if ((userGuess == this.randMovie.charAt(i)) && (this.selectedArray.indexOf(userGuess)<0)) {
            this.underArray[i] = userGuess;
            this.underString = this.underArray.join ("");
            $("#underscores").html(this.underString);
            boolGuess = false;
            this.display_lives();
            
        }
    }

    if (boolGuess) {
        this.lives-=1;
        this.display_lives();
        this.triedArray.push(userGuess + "&nbsp;" );
        this.triedString = this.triedArray.join("")
        this.display_tried();
        
    }

    if (this.lives == 0) {
        alert("L O S E R");
        this.start_game();
    }
    
    if (this.underArray.indexOf("__ ")<0){
        alert("You WON!!");
        this.wins++;
        this.display_wins();
        this.start_game();
    }
},

start_game: function(event) {
    this.triedArray.length = 0;
    this.triedString = "";
    this.pick_movie();
    this.display_underscores();
    this.display_letters();
    this.wins = 0;
    this.display_lives();
    this.display_wins();
    this.display_tried();
}

};

$(document).ready(function() {

    $('#newGame').on("click", function() {
        mobile.start_game(event);
    
    });

    $("#gameArea").on("click", function(event) {
        if (mobile.lettersArray.indexOf(event.target.innerText) != -1){
            $(event.target).hide();
            mobile.game_logic(event);
        
        }
        
    });
});