var mobile = {

rand: 0,    //create a random number to select a random index from array
moviesArray: ["the_shape_of_water", "moonlight","spotlight","birdman", "12_years_a_slave", "argo", "the_artist", "the_hurt_locker", "slumdog_millionaire", "no_country_for_old_men", "the_departed", "crash", "chicago", "a_beautiful_mind", "gladiator", "american_beauty", "shakespeare_in_love", "titanic", "the_english_patient", "braveheart", "forrest_gump", "unforgiven", "the_silence_of_the_lamb", "dances_with_wolves", "driving_miss_daisy", "rain_man", "the_last_emperor", "platoon", "out_of_africa", "amadeus", "terms_of_endearment", "gandhi", "chariots_of_fire", "ordinary_people" ],
randMovie: "",
underArray: [],
underString: "",
lettersArray : ["a ","b ","c ","d ","e ","f ","g ","h ","i ","j ","k ","l ","m ","n ","o ","p ","q ","r ","s ","t ","u ","v ","w ","x ","y ","z",],
selectedArray: [],

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
    $("#letterHolder1").empty();
    $("#letterHolder2").empty();
    $("#letterHolder3").empty();
    for(i=0 ; i < this.lettersArray.length ; i++) {
        if (i<10){
            newBtn = $('<button>');
            newBtn.attr("id", "btn-" + this.lettersArray[i]);
            newBtn.text(this.lettersArray[i]);
            $(newBtn).attr("margin-right", "40px");
            $('#letterHolder1').append(newBtn);
        }
        else if (i>9 && i<19) {
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
game_logic: function(event) {
    var userGuess = event.target.innerText;
    var btnClicked = ("btn-" + event);
    for (i=0; i<this.randMovie.length; i++) {
        if ((userGuess == this.randMovie.charAt(i)) && (this.selectedArray.indexOf(userGuess)<0)) {
            this.selectedArray.push(userGuess);
            this.underArray[i] = userGuess;
            this.underString = this.underArray.join ("");
            $("#underscores").html(this.underString);
            $("#"+btnClicked).attr("disabled", "disabled");
            

            
        }
    }
},

start_game: function(event){
    this.pick_movie();
    this.display_underscores();
    this.display_letters();

}
};

$(document).ready(function() {

    $('#newGame').on("click", function() {
        mobile.start_game(event);
    
    });

    $("#gameArea").on("click", function(event) {
        console.log(event);
        mobile.game_logic(event);
        
    });
});