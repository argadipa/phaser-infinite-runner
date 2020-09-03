export const getResolution = () => {
  let isMobile = navigator.userAgent.indexOf("Mobile");
  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }
  let w = 720;
  let h = 1200;
  if (isMobile !== -1) {
    w = window.innerWidth;
    h = window.innerHeight;
  }

  return { width: w, height: h };
};

export const shuffleArray = (array: Array<any>) => {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const getRandomInt = (min:number, max:number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
