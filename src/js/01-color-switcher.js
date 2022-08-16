
const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
};
let timerId = null;


const onClick = () => {
   timerId = setInterval(() => {
      function getRandomHexColor() {
     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    const backColor = getRandomHexColor();
        refs.body.style.backgroundColor = backColor;
      
    }, 1000);

    refs.startButton.setAttribute('disabled', 'disabled') 
    refs.stopButton.removeAttribute('disabled') 

};

if (onClick) {
    
}

const onStopClick = () => {
    clearInterval(timerId);
    refs.stopButton.setAttribute('disabled','disabled') 
    refs.startButton.removeAttribute('disabled') 
}
refs.startButton.addEventListener("click", onClick);
refs.stopButton.addEventListener("click", onStopClick);