let controlPlay = false
let controlSet = false
let controlPomo = false
let counter = 0
let time = 1.5
let hours = 0
let minutes = 0
let seconds = 0
let showTimer = '00:00:00'
let shortTime = '00:05:00'
let longTime = '00:15:00'
let focusTime = '00:25:00'
let pomodoro = [focusTime,shortTime,focusTime,shortTime,focusTime,shortTime,focusTime,longTime]
let warning = ['FOCUS TIME','SHORT TIME','FOCUS TIME','SHORT TIME','FOCUS TIME','SHORT TIME','FOCUS TIME','LONG TIME']
let i=0
// variavel para armazenar o setInterval na raiz e poder usar o cleanInterval dentro da função Play e usar depois na função Stop
// tarefa: criar um objeto com o construtor para armazenar as funções setInterval e clearInterval como metodos
let runTimer = ()=>{}

let consoleLog = ()=>{
    console.log("----------------------------------------")
    console.log("controlPlay:" + controlPlay)
    console.log("controlSet:" + controlSet)
    console.log("controlPomo:" + controlPomo)
}

let running = ()=> {
    counter = counter - .25
    document.querySelector('.showTimer').value = 
    Math.floor(counter/(60*60)).toString().padStart(2,'0') + ':' +
    Math.floor(counter/60).toString().padStart(2,'0') + ':' + 
    Math.floor(counter%60).toString().padStart(2,'0')
    //console.log('running counter = ' + counter)
}

const changePlayPause = ()=> {
    controlPlay = !controlPlay
    let contentPlay = document.querySelector('.buttonPlay')
    if(controlPlay){
        contentPlay.textContent = 'PAUSE'
        document.querySelector('.buttonSet').disabled= true
        document.querySelector('.buttonPomo').disabled= true
        document.querySelector('.buttonShort').disabled= true
        document.querySelector('.buttonLong').disabled= true
        document.querySelector('.buttonFocus').disabled= true
    }else{
        contentPlay.textContent = 'PLAY'
/*         document.querySelector('.buttonSet').disabled= false
        document.querySelector('.buttonPomo').disabled= false
        document.querySelector('.buttonShort').disabled= false
        document.querySelector('.buttonLong').disabled= false
        document.querySelector('.buttonFocus').disabled= false */
    }
    //controlPlay ? contentPlay.textContent = 'PAUSE' : contentPlay.textContent = 'PLAY'
    
    consoleLog()
}

const changeSetTimer = ()=> {
    controlSet = !controlSet
    let contentSet = document.querySelector('.buttonSet')
    controlSet ? contentSet.textContent = 'CONFIRM TIMER' : contentSet.textContent = 'SET TIMER'
    consoleLog()
}

const calculations = ()=> {
    hours = Number.parseFloat(showTimer.substring(0,2))
    minutes = Number.parseFloat(showTimer.substring(3,5))
    seconds = Number.parseFloat(showTimer.substring(6,8))
    time = (60*60*hours + 60*minutes + seconds)
    counter = time
    //console.log('calculations counter = ' + counter)
} 

const loopPomo = ()=>{
    if (controlPlay == false ){
        clearInterval(runTimer)
    }else{

        //consoleLog()
        console.log('entrou no loopPomo')
        console.log('pomodoro: ' + pomodoro[i])
        //showTimer = pomodoro[i]
        //document.querySelector('.showTimer').value = showTimer
        showTimer = document.querySelector('.showTimer').value

        //console.log('counter = ' + counter)
        //console.log('time = ' + counter)
        if(counter != time){
            console.log('entrou no calculations')
            calculations()
        }
        runTimer = setInterval(()=>{
            console.log('entrou no runTimer')
            running()
            if (counter <= 0) {
                //console.log('entrou no clearInterval')
                clearInterval(runTimer)
                playAlarm()
                i = i + 1
                //console.log('i = ' + i)
                if(i<8){
                    console.log('entrou no setTimeout')
                    setTimeout(loopPomo,4000)
                    showTimer = pomodoro[i]
                    document.querySelector('.mode').textContent = warning[i]
                }else{
                    clearInterval(runTimer)
                    console.log('entrou no clearInterval')
                }
            }
    /*         if (controlPlay == false ){
                clearInterval(runTimer)
            } */
        },250)
    }
}

function buttonPlay(){
    consoleLog()
    if(controlPomo == true){
        changePlayPause()
        loopPomo()
         
    }else{
        showTimer = document.querySelector('.showTimer').value
        if(showTimer == '' || showTimer == '00:00:00'){
            alert('Digite o tempo corretamente.')
            document.querySelector('.showTimer').value = '00:00:00'
        } else {
            changePlayPause()
            if (controlPlay == true){
                if(counter != time){
                    calculations()
                }
                runTimer = setInterval(()=>{
                    running()
                    if (counter <= 0) {
                        clearInterval(runTimer)
                        changePlayPause()
                        playAlarm()
                    }
                    if (controlPlay == false ){
                        clearInterval(runTimer)
                    }
                    },250)
            }
        }
    }
}

function buttonStop(){
    clearInterval(runTimer)
    controlPlay = false
    controlPomo = false
    document.querySelector('.buttonSet').disabled= false
    document.querySelector('.buttonPomo').disabled= false
    document.querySelector('.buttonShort').disabled= false
    document.querySelector('.buttonLong').disabled= false
    document.querySelector('.buttonFocus').disabled= false
    document.querySelector('.buttonPlay').textContent = 'PLAY'   
    document.querySelector('.showTimer').value = "00:00:00"
    document.querySelector('.buttonPomo').style.background = 'none'
    document.querySelector('.mode').textContent = 'TIMER'
    consoleLog()
}

function playAlarm() {
    const alarm = new Audio('alarm.mp3')
    let bip=0
    const pauseAlarm = setInterval(()=>{
        alarm.play()
        bip = bip + 1
        if (bip==3){clearInterval(pauseAlarm)}
    },1000)
}

/* new Date(1.79 * 3600 * 1000).toISOString().substr(11, 8) */

function buttonShort(){
    shortTime = document.querySelector('.labelShort').textContent    
    if(controlSet == true){
        showTimer = document.querySelector('.showTimer').value
        if (showTimer == '' || showTimer == '00:00:00'){
            alert('Digite um valor corretamente')
        }else{
            shortTime = showTimer
            document.querySelector('.labelShort').textContent = shortTime
        }
    }else{
        document.querySelector('.showTimer').value = shortTime
    }
}

function buttonLong(){
    longTime = document.querySelector('.labelLong').textContent  
    if(controlSet == true){
        showTimer = document.querySelector('.showTimer').value
        if (showTimer == '' || showTimer == '00:00:00'){
            alert('Digite um valor corretamente')
        }else{
            longTime = showTimer
            document.querySelector('.labelLong').textContent = longTime
        }
    }else{
        document.querySelector('.showTimer').value = longTime
    }
}

function buttonFocus(){
    focusTime = document.querySelector('.labelFocus').textContent 
    if(controlSet == true){
        showTimer = document.querySelector('.showTimer').value
        if (showTimer == '' || showTimer == '00:00:00'){
            alert('Digite um valor corretamente')
        }else{
            focusTime = showTimer
            document.querySelector('.labelFocus').textContent = focusTime
        }
    }else{
        document.querySelector('.showTimer').value = focusTime
    }
}

function buttonSet(){
    changeSetTimer()
    if (controlSet == true){
        document.querySelector('.buttonPomo').disabled= true
        document.querySelector('.buttonPlay').disabled= true
        document.querySelector('.buttonStop').disabled= true
        document.querySelector('.labelShort').textContent = '--:--:--'
        document.querySelector('.labelLong').textContent = '--:--:--'
        document.querySelector('.labelFocus').textContent = '--:--:--'
    }else{
        document.querySelector('.buttonPomo').disabled= false
        document.querySelector('.buttonPlay').disabled= false
        document.querySelector('.buttonStop').disabled= false
        document.querySelector('.labelShort').textContent = shortTime
        document.querySelector('.labelLong').textContent = longTime
        document.querySelector('.labelFocus').textContent = focusTime
    }
}

function buttonPomo(){
    controlPomo = !controlPomo
    if(controlPomo == true){
        clearInterval(runTimer)
        controlPlay = false
        document.querySelector('.buttonSet').disabled = true
        document.querySelector('.buttonPlay').textContent = 'PLAY'
        document.querySelector('.buttonPomo').style.background = '#c55151'
        document.querySelector('.mode').textContent = 'FOCUS TIME'
        document.querySelector('.showTimer').value = focusTime
        pomodoro = [focusTime,shortTime,focusTime,shortTime,focusTime,shortTime,focusTime,longTime]
    }else{
        clearInterval(runTimer)
        controlPlay = false
        document.querySelector('.buttonSet').disabled = false
        document.querySelector('.buttonPlay').textContent = 'PLAY'
        document.querySelector('.buttonPomo').style.background = 'none'
        document.querySelector('.mode').textContent = 'TIMER'
        document.querySelector('.showTimer').value = showTimer
    }
    consoleLog()
}