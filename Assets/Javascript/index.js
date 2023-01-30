var winCount = 0;
var photo = 1;
var chanceCount = 13;
var guessedWords = ["naruto", "kokushibo", "akaza", "light", "johan"];
var UserChoice;
var arrForUserChoice = [];
var guessedWord = "";

function replaceAt(str, index, newChar) {
  function replacer(origChar, strIndex) {
    if (strIndex === index) return newChar;
    else return origChar;
  }
  return str.replace(/./g, replacer);
}

function char_count(str, letter) {
  var letter_Count = 0;
  for (var position = 0; position < str.length; position++) {
    if (str.charAt(position) == letter) {
      letter_Count += 1;
    }
  }
  return letter_Count;
}

function randomChoice() {
  var index = Math.floor(Math.random() * guessedWords.length);
  return guessedWords[index];
}

guessedWord = randomChoice();
document.getElementById("guess").src = `./Assets/Photoes/${guessedWord}.jpg`;
var hiddenWord = "_".repeat(guessedWord.length);
hiddenWord =
  "_" + hiddenWord.substring(1, hiddenWord.length).replaceAll("_", " _");

document.getElementById("hidden_word").innerText = hiddenWord;
console.log(guessedWord);

window.onkeyup = function (e) {
  if (guessedWord.includes(e.key)) {
    var UserChoice = e.key;
    var countOfChar = char_count(guessedWord, UserChoice);

    if (countOfChar > 1) {
      for (var i = 0; i < countOfChar; i++) {
        var indexTrue = guessedWord.indexOf(UserChoice, indexTrue + 1);
        hiddenWord = replaceAt(hiddenWord, indexTrue * 2, UserChoice);
        document.getElementById("hidden_word").innerText = hiddenWord;
      }
    } else {
      var indexTrue = guessedWord.indexOf(UserChoice, 0);
      console.log(indexTrue);
      hiddenWord = replaceAt(hiddenWord, indexTrue * 2, UserChoice);
      document.getElementById("hidden_word").innerText = hiddenWord;
    }
    if (!hiddenWord.includes("_")) {
      winCount++;
      document.getElementById("wins_count").innerText = winCount.toString();
      guessedWord = randomChoice();
      document.getElementById(
        "guess"
      ).src = `./Assets/Photoes/${guessedWord}.jpg`;
      hiddenWord = "_".repeat(guessedWord.length);
      hiddenWord =
        "_" + hiddenWord.substring(1, hiddenWord.length).replaceAll("_", " _");

      document.getElementById("hidden_word").innerText = hiddenWord;
      photo = 1;
      document.getElementById("meme").src = `./Assets/Photoes/${photo}.png`;
      document.getElementById("user_guess").innerText = "";
      chanceCount = 13;
      document.getElementById("chance").innerText = chanceCount.toString();
      arrForUserChoice = [];
    }

    console.log(hiddenWord);
  } else {
    if (!guessedWord.includes(e.key) && !arrForUserChoice.includes(e.key)) {
      arrForUserChoice.push(e.key);
    }
    console.log(arrForUserChoice);
    if (!arrForUserChoice.includes(e.key)) {
      arrForUserChoice.push(e.key);
    }
    if (
      photo < 9 &&
      !document.getElementById("user_guess").innerText.includes(e.key)
    ) {
      photo++;
    }

    document.getElementById("meme").src = `./Assets/Photoes/${photo}.png`;

    if (
      chanceCount > 0 &&
      !document.getElementById("user_guess").innerText.includes(e.key)
    ) {
      document.getElementById("user_guess").innerText = arrForUserChoice.join();
      chanceCount--;
      document.getElementById("chance").innerText = chanceCount.toString();
    } else if (chanceCount <= 0) {
      alert("You Lost The Game!");
    }
  }
};
