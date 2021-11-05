// todos:
// customize cards' background

const gameContainer = document.getElementById("game");

// pair is used to store two colors
let pair=[]
// matchedColors is used to keep track of matched colors 
let matchedColors=[]
localStorage.setItem("matchedColors", JSON.stringify(matchedColors))
// initialize current steps
let steps=0
let stepSpan=document.querySelector("#steps")
stepSpan.innerHTML=steps
// initalize best scores
let bestScoreSpan=document.querySelector("#bestScore")
let bestScore=localStorage.getItem('bestScore')

if(bestScore){
  bestScoreSpan.innerHTML=bestScore
}else{
  bestScoreSpan.innerHTML='0'
}

// initalize start button
let restartBtn =document.querySelector("#restart")
restartBtn.addEventListener('click', function(e){
  handleRestart()
})

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
 
let shuffledColors = shuffle(COLORS);
console.log("cheating!", shuffledColors)

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  console.log("^^^^",pair)
  // increment steps by 1 and update span display 
  steps+=1
  stepSpan.innerHTML=steps
   
 
  let matchedColors=JSON.parse(localStorage.getItem("matchedColors"))

  // display and update colors in pair 
  if(pair.length <2){
    // prevent the same card clickable twice 
    event.target.removeEventListener("click", handleCardClick)
    // get the color name of the card
    const color=event.target.className
    // set the card in the color
    event.target.style.backgroundColor=color
    // add the color to the pair
    pair.push(color)
 
  }

  // evaluate two colors
  if(pair.length===2){
    // get all cards
    let divs=document.querySelectorAll('#game div')
    // disable cards 
    for(let div of divs){
      // disable cards by remvoing eventListener
      div.removeEventListener("click", handleCardClick)
     }
   
 

    // check the two colors in pair are a match
    if(pair[0]===pair[1]){
      matchedColors.push(pair[0])
      localStorage.setItem("matchedColors", JSON.stringify(matchedColors))
    }
    // flip cards after one second
    setTimeout(function(){
      
      // reset cards 
      for(let div of divs){
        const tColor=div.className
        // check if the card is in the matchedColors 
        if(!matchedColors.includes(tColor)){
          // remove style of the unmatched cards
          div.removeAttribute("style");
          // add eventListener back
          div.addEventListener("click", handleCardClick);
          counter=0
        }

      }
      if(matchedColors.length===COLORS.length/2){
          handleScores()
        }
      // reset pair container
      pair=[]
    },1000)
  }
  console.log("######",pair)
}

// when the DOM loads
createDivsForColors(shuffledColors);

 
// compare and store the best score 
function handleScores(){
  console.log("test test: ", bestScore, steps)
  if(bestScore==='0'){
    localStorage.setItem('bestScore', steps)
  }else{
    if(parseInt(bestScore)>parseInt(steps)){
      localStorage.setItem('bestScore', steps)
    }
  }
}

// restart the game
function handleRestart(){
  // remove every each child inside div 
  let divs=document.querySelectorAll('#game div')
  for(let div of divs){
    gameContainer.removeChild(div)
  }
  // shuffle and realize cards 
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  // reset values
  pair=[]
  localStorage.setItem("matchedColors", JSON.stringify([]))
  // check if all cards have been matched, if it does compare and update best score
  if(matchedColors.length===COLORS.length/2){
    handleScores()
    bestScore=localStorage.getItem('bestScore')
    bestScoreSpan.innerHTML=bestScore
  }else{ //otherwise, reuse the privious best score
    bestScore=localStorage.getItem('bestScore')
    bestScoreSpan.innerHTML=bestScore
  }

 
  steps=0
  stepSpan.innerHTML=steps
}

 