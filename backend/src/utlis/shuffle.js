module.exports = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  //Enquanto existir elementos para serem sorteados . . . 
  while (currentIndex !== 0) {

    // Sorteie um elemento
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Troque a posição com o elemento atual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue

  }

  return array

}