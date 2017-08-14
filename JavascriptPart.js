 //Global Variables
 var computerSelection = ["Dunkirk", "Overlord", "Midway", "Hedgerows", "Kursk"];
    var blankLines = ["-------", "--------", "------", "---------", "-----"];
    var textClue =
        [
            "This place was the site of a massive evacuation that the Western Allies performed. It is often times refered to as a miracle.",
            "This is the name of the operation that began the liberation of France.",
      "This naval battle ensured the security of the island's namesake and marked the turning point of the respective theatre.",
      "These obsticles made the push through North Western France very difficult. They were almost impassible by vehicles and provided very useful cover.",
      "This Russian city is the sight of the world's largest tank battle. Thousands of armored vehicles were involved in the fighting on both the German and Russian sides."
    ];
    
    var toBeGuessed = [''];
    var alreadyGuessed = [''];
    var badGuessed = [""];

    var readyToEngage = true;

    var guesses;
    var display;
    var correct;
    var hintGiven;
    
    var wins = 0;
    var losses = 0;
    var primeNumber = -1;

    
    //
    // Start Button Code
    //

    document.getElementById("start-button").addEventListener("click", function(event) {

      if (readyToEngage === true && (primeNumber < computerSelection.length - 1)) {

        var word = computerSelection[primeNumber += 1]

        console.log(word);
        
        guesses = 10;
        correct = 0;
        hintGiven = false;

        toBeGuessed = word.split('');
        
        alreadyGuessed.splice(0,alreadyGuessed.length);
        for (i = 0; i < toBeGuessed.length; i++) {
            alreadyGuessed.push('_');
        }
        
        badGuessed.splice(0,badGuessed.length);
        

        var textualClue = textClue[primeNumber];
        console.log(textualClue);

        display = "";

        for (j = 0; j < alreadyGuessed.length; j++) {
            display = display + alreadyGuessed[j] + " ";
        }

        document.getElementById("display").innerHTML = (display);
        document.getElementById("guessed-letters").innerHTML = ('');
        document.getElementById("hinting").innerHTML = ("Click the Text Clue button to recieve a hint. <br> However, it will cost you 3 attempts.");        
        document.getElementById("remaining-guesses").innerHTML = (guesses + ' Guesses Remaining  |  ' + wins + " Wins  |  " + losses + " Losses");

        readyToEngage = false;

    } else if (readyToEngage === true) {
        document.getElementById("display").innerHTML = ("Refresh page to play again.");
    } else {
        document.getElementById("hinting").innerHTML = ("Finish current word or give up to start a new word.");
    }

    });
    
    //
    // Text Clue Button Code
    //
    
    document.getElementById("text-hint-button").addEventListener("click", function(event) {
        if(readyToEngage === false && guesses > 3){
            guesses -= 3;
            document.getElementById("hinting").innerHTML = (textClue[primeNumber]);
            document.getElementById("remaining-guesses").innerHTML = (guesses + " Guesses Remaining  |  " + wins + " Wins  |  " + losses + " Losses");
            hintGiven = true;          
        } else if ( readyToEngage === false && hintGiven ) {
            document.getElementById("hinting").innerHTML = (textClue[primeNumber]);
        } else if ( readyToEngage === false ) {
            document.getElementById("hinting").innerHTML = ("Not enough guesses remaining... Good luck!");
        }
        
    });

    //
    // Give Up Button Code
    //
    
    document.getElementById("loser-button-XD").addEventListener("click", function(event) {
            if (!readyToEngage) {
                document.getElementById("display").innerHTML = ("Better luck next time! Press Start to try the next word!");
                losses ++;
                document.getElementById("remaining-guesses").innerHTML = (guesses + " Guesses Remaining  |  " + wins + " Wins  |  " + losses + " Losses");
                readyToEngage = true;
            }
    });
    
    //
    // Key Press Code
    //
    
    document.addEventListener("keyup", function(event) {
        if (!readyToEngage && event.key.match(/^[a-zA-Z()]$/)) {
            var keyInWord = false;
            var keyAlreadyGuessed = false;
            
            for ( i = 0; i < toBeGuessed.length; i++ ) {
                if ( event.key.toUpperCase() === toBeGuessed[i].toUpperCase() ) {
                    keyInWord = true;
                }
            }
            
            for ( i = 0; i < alreadyGuessed.length; i++ ) {
                if ( event.key.toUpperCase() === alreadyGuessed[i].toUpperCase() ) {
                    keyAlreadyGuessed = true;
                }
                
            }        
            
           for ( i = 0; i < badGuessed.length; i++ ) {
                if ( event.key.toUpperCase() === badGuessed[i].toUpperCase() ) {
                    keyAlreadyGuessed = true;
                }
                
            }        
        
            if ( keyInWord ) {
            
                for ( i = 0; i < toBeGuessed.length; i++) {
                    if ( event.key.toUpperCase() === toBeGuessed[i].toUpperCase() ) {
                        correct ++;
                        alreadyGuessed[i] = toBeGuessed[i];
                        toBeGuessed[i] = '';
                    }
                }
            
                display = "";

                for (j = 0; j < alreadyGuessed.length; j++) {
                    display = display + alreadyGuessed[j].toUpperCase() + " ";
                }

                document.getElementById("display").innerHTML = (display);
                
                if ( correct >= alreadyGuessed.length ) {
                    document.getElementById("hinting").innerHTML = ("Congrats! You won!");
                    wins ++;
                    document.getElementById("remaining-guesses").innerHTML = (guesses + " Guesses Remaining  |  " + wins + " Wins  |  " + losses + " Losses");
                    readyToEngage = true;
                }
        
            } else if ( !keyAlreadyGuessed ) {
            
                if ( guesses <= 1 ) {
                    guesses --;
                    document.getElementById("display").innerHTML = ("Good Try! Press Start to try a new word.");
                    losses ++;
                    document.getElementById("remaining-guesses").innerHTML = (guesses + " Guesses Remaining  |  " + wins + " Wins  |  " + losses + " Losses");
                    readyToEngage = true;
                } else {
                    badGuessed.push(event.key.toUpperCase());
                    guesses --;
                    document.getElementById("remaining-guesses").innerHTML = (guesses + " Guesses Remaining  |  " + wins + " Wins  |  " + losses + " Losses");
                    
                    var bad = "";

                    for (j = 0; j < badGuessed.length; j++) {
                        bad = bad + badGuessed[j].toUpperCase() + " ";
                    }

                    document.getElementById("guessed-letters").innerHTML = (bad);
                }
            }
        }
    });

    function updateData() {
        document.getElementById("remaining-guesses").innerHTML = (guesses + " Guesses Remaining  |  " + wins + " Wins  |  " + losses + " Losses");
    }
