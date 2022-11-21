// import { 
//     body,
//     baby1,baby2,
//     childrenX,
//     childrenY,
//     patchBabyHole,
//     score,
//     hits,
//     fails,
//     popUp,
//     popUpBackground,
//     popUpResult,
//     errorScreen,
//     succesIcons,
//     failIcons,
//     setRotate,
//     pauseRotation,
//     baby1DegreeCurrentValue,
//     baby2DegreeCurrentValue,
//     hitCounter,
//     failCounter,
//     showResultBehaviour
// } from './variables';
// import {catchDiv} from './functions.js';
// ------------------- VARIABLES -------------------------//
// -----------------------------------------------------------//

const body = document.querySelector( "body" ); 
const baby1 = document.getElementById( "baby1" );
const baby2 = document.getElementById( "baby2" );
const childrenX =document.getElementsByClassName( "baby1" );
const childrenY = document.getElementsByClassName( "baby2" );
const patchBabyHole = document.getElementById( "patchBabyHole" );

const hits = document.getElementById( "hits" );
const fails = document.getElementById( "fails" );

const popUp = document.getElementById( "popUp" );
const popUpResult = document.getElementById( "popUpResult" );

const succesIcons = ['🍻','😎','😁','😉','👍','🤘','⚡','🎉'];
const failIcons = ['💩','💀','😭','🙈','👎','😤'];

let setRotate = { };
let pauseRotation = false; 
let baby1DegreeCurrentValue = 0;
let baby2DegreeCurrentValue = 0;
startRotationBackGround( 70 );
let hitCounter = "";
let failCounter = "";
let showResultBehaviour = { };


// startRotationBackGround( 70 );  
document.addEventListener('keydown', function (event) {
    if ( event.key === "Enter" || event.key === " " ) {
        catchDiv();      
    }    
});
document.addEventListener('click', function () {    
        catchDiv();          
});

//--------------------- ANIMATED BACKGROUND ------------------//

function startRotationBackGround( rotationSpeed ) {  //  Girar fondo calidoscopico  //  rotationSpeed = 50 default mode / 100 easy mode / 25 f@## mode
    createRotationBoxes();
    setRotate = setInterval(

        function() {          
            baby1.style.transform = `rotate(${ baby1DegreeCurrentValue }deg)`;
            baby2.style.transform = `rotate(${ baby2DegreeCurrentValue }deg)`;  
            if ( pauseRotation !== true ) {
                baby1DegreeCurrentValue ++;
                baby2DegreeCurrentValue --;
            }
            if ( baby1DegreeCurrentValue === 360 ) {
                baby1.style.transform = `rotate(0deg)`;
                baby1DegreeCurrentValue = 0;
            }
            if ( baby2DegreeCurrentValue === -360 ) {
                baby2.style.transform = `rotate(0deg)`;
                baby2DegreeCurrentValue = 0;
            }
        }
    , rotationSpeed );
}
    
function createRotationBoxes() {
    for ( let i = 0 ; i < 2 ; i++ ) {
        for ( let j = 0 ; j < 50 ; j++ ) {
            let babyHood = document.createElement( "div" );
            babyHood.id = `baby${ i + 1 }${ j }` ;
            babyHood.className = `baby${ i + 1 }` ;
            babyHood.style.width = `90%` ;
            babyHood.style.height = `90%` ;
            babyHood.style.position = "absolute" ;
            babyHood.style.display = "flex" ;
            babyHood.style.justifyContent = "center" ;
            babyHood.style.alignItems = "center" ;
            document.getElementsByClassName( `baby${ i + 1 }` )[ j ].insertAdjacentElement( "afterbegin" , babyHood ) ;
        }
    }
}

//---------------------- GAME CODE ---------------------------//

function catchDiv() {  //  Evaluar y mostrar resultado del lance
    if (pauseRotation === true) return null;
    clearInterval( showResultBehaviour ) ;   
    if ( isHit() === true ) {
        pauseRotation = true ;
        hits.innerHTML = hitCounterOnString() ;
        showResult();
    } else {
        pauseRotation = true ;
        fails.innerHTML = failCounterOnString() ;
        showResult();
    }
}

function isHit() {
    if ( baby1DegreeCurrentValue === 0
        || baby1DegreeCurrentValue === 45 
        || baby1DegreeCurrentValue === 90 
        || baby1DegreeCurrentValue === 135 
        || baby1DegreeCurrentValue === 180 
        || baby1DegreeCurrentValue === 225 
        || baby1DegreeCurrentValue === 270 
        || baby1DegreeCurrentValue === 315 
        ) {
        return true ;
    } else { 
        return false ; 
    }
}

function hitCounterOnString() {
    hitCounter += "💖" ;
    return hitCounter ;
}

function failCounterOnString() {
    failCounter += "💔" ;
    return failCounter ;
}

function setRotationBackgroundColor( color ) {
    for ( let children of childrenX ) {
        children.style.border = `5px solid ${ color }` ;
        children.style.boxShadow = `0 0 50px ${ color }`;
    }
    for ( let children of childrenY ) {
        children.style.border = `5px solid ${ color }` ;
        children.style.boxShadow = `0 0 50px ${ color }`;
    }
    patchBabyHole.style.backgroundColor = `${ color }` ;
}

function showResult() {  
    popUp.style.display = "flex" ;
    popUp.style.opacity = 1 ;
    let frame = 0 ; 
    let opacityStatus = 1 ;
    if ( isHit() === true ) {
        const randomIndex = Math.floor(Math.random() * succesIcons.length);
        const setSuccessIcon = succesIcons[randomIndex];
        popUpResult.innerText = setSuccessIcon ; 
        setRotationBackgroundColor( "darkorange" ) ;
        body.style.backgroundColor = "red"
    } else {
        const randomIndex = Math.floor(Math.random() * failIcons.length);
        const setFailIcon = failIcons[randomIndex];
        popUpResult.innerText = setFailIcon ;
        setRotationBackgroundColor( "white" ) ;
    }
    showResultBehaviour = setInterval( 

        function () {                
            if ( isHit() === true ) {             
                if ( frame === 12  ) {    
                    setRotationBackgroundColor( "red" ) ;
                    body.style.backgroundColor = "darkorange"
                } 
                if ( frame ===  24  ) {
                    setRotationBackgroundColor( "darkorange" ) ;
                    body.style.backgroundColor = "red"                    
                } 
                if ( frame === 36 ) {
                    popUp.style.display = "none" ;
                    setRotationBackgroundColor( "red" ) ;
                    body.style.backgroundColor = "black"                
                    pauseRotation = false ;
                    return null ;
                }
                if ( frame > 12 && frame < 36) {
                    opacityStatus -= 0.25 ;
                    popUp.style.opacity = `${ opacityStatus }` ;
                }
            } else {
                // const palete = ['white', 'grey', 'silver', 'blue', 'green'];
                setRotationBackgroundColor( "white" ) ;
                if ( frame > 12) {
                    popUp.style.opacity = '0' ;
                    pauseRotation = false ;
                    setRotationBackgroundColor( "red" ) ;
                    // body.style.backgroundColor = 'silver'
                }
                if ( frame === 36 ) {
                    popUp.style.display = "none" ;
                    return null ;
                }
            }
            frame++ ;
        }
    , 37 
    ) ;
    setTimeout(() => {        
        // clearInterval( showResultBehaviour ) ;   
    }, 1333);
}