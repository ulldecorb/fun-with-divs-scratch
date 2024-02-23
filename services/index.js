// ------------------- VARIABLES -------------------------//
// -----------------------------------------------------------//

const body = document.querySelector( "body" ); 

const playBackground = document.getElementById( "playBackground" ); 
const children1 = document.getElementById( "children1" );
const children2 = document.getElementById( "children2" );
const childrenX =document.getElementsByClassName( "children1" );
const childrenY = document.getElementsByClassName( "children2" );
const patchBabyHole = document.getElementById( "patchBabyHole" );

const menu = document.getElementById( "menu" );
const openMenu = document.getElementById( "openMenu" );
const closeMenu = document.getElementById( "closeMenu" );
const speedEasy = document.getElementById( "speedEasy" );
const speedNormal = document.getElementById( "speedNormal" );
const speedPro = document.getElementById( "speedPro" );
const colorClassic = document.getElementById( "colorClassic" );
const colorPastel = document.getElementById( "colorPastel" );
const colorCode = document.getElementById( "colorCode" );
const colorRandom = document.getElementById( "colorRandom" );

let totalHits = 0;
let totalFails = 0;
const hits = document.getElementById( "hits" );
const fails = document.getElementById( "fails" );

const popUp = document.getElementById( "popUp" );
const popUpResult = document.getElementById( "popUpResult" );

const succesIcons = ['🍻','😎','😁','😉','👍','🤘','⚡','🎉'];
const failIcons = ['💩','💀','😭','🙈','👎','😤'];

let setRotate = { };
let pauseRotation = false; 
let children1DegreeCurrentValue = 0;
let children2DegreeCurrentValue = 0;
let hitCounter = "";
let failCounter = "";
let showResultBehaviour = { };

startRotationBackGround( 70 );  

// open/close menu handler

openMenu.addEventListener("click", () => { 
    menu.style.display = 'block';
    openMenu.style.display = 'none';
});
closeMenu.addEventListener("click", () => { 
    menu.style.display = 'none';
    openMenu.style.display = 'flex';
});

// handler hit events

body.addEventListener('keydown', function (event) {
    if ( event.key === "Enter" || event.key === " " ) {
        catchDiv();      
    }    
});
playBackground.addEventListener('click', function () {    
        catchDiv();          
});

// select color events

 colorClassic.addEventListener('click', () => {
        setRotationBackgroundColor( "red" ) ;
        body.style.backgroundColor = "black"
    });
colorPastel.addEventListener('click', () => {
        setRotationBackgroundColor( "pink" ) ;
        body.style.backgroundColor = "white"
    });
colorCode.addEventListener('click', () => {
        setRotationBackgroundColor( "rgb(31, 192, 25)" ) ;
        body.style.backgroundColor = "green"
    });
colorRandom.addEventListener('click', () => {
        setRotationBackgroundColor( "teal" ) ;
        body.style.backgroundColor = "blue"
    });

// select speed handler

speedEasy.addEventListener("click", () => {startRotationBackGround( 100 )});
speedNormal.addEventListener("click", () => {startRotationBackGround( 70 )});
speedPro.addEventListener("click", () => {startRotationBackGround( 25 )});

createRotationBoxes();


//--------------------- ANIMATED BACKGROUND ------------------//

function startRotationBackGround( rotationSpeed ) {  //  Girar fondo calidoscopico  //  rotationSpeed = 50 default mode / 100 easy mode / 25 f@## mode
    clearInterval(setRotate);
    setRotate = setInterval(

        function() {          
            children1.style.transform = `rotate(${ children1DegreeCurrentValue }deg)`;
            children2.style.transform = `rotate(${ children2DegreeCurrentValue }deg)`;  
            if ( pauseRotation !== true ) {
                children1DegreeCurrentValue ++;
                children2DegreeCurrentValue --;
            }
            if ( children1DegreeCurrentValue === 360 ) {
                children1.style.transform = `rotate(0deg)`;
                children1DegreeCurrentValue = 0;
            }
            if ( children2DegreeCurrentValue === -360 ) {
                children2.style.transform = `rotate(0deg)`;
                children2DegreeCurrentValue = 0;
            }
        }
    , rotationSpeed );
}
    
function createRotationBoxes() {
    for ( let i = 0 ; i < 2 ; i++ ) {
        for ( let j = 0 ; j < 50 ; j++ ) {
            let childrenHood = document.createElement( "div" );
            childrenHood.id = `children${ j + 1 }${ i + 1}` ;
            childrenHood.className = `children${ i + 1 }` ;
            childrenHood.style.width = `90%` ;
            childrenHood.style.height = `90%` ;
            childrenHood.style.position = "absolute" ;
            childrenHood.style.display = "flex" ;
            childrenHood.style.justifyContent = "center" ;
            childrenHood.style.alignItems = "center" ;
            document.getElementsByClassName( `children${ i + 1 }` )[ j ].insertAdjacentElement( "afterbegin" , childrenHood ) ;
        }
    }
}

//---------------------- GAME CODE ---------------------------//

function catchDiv() {  //  Evaluar y mostrar resultado del lance
    if (pauseRotation === true) return null;
    if ( isHit() === true ) {
        totalHits ++;
        hits.innerHTML = totalHits ;
        showResult();
    } else {
        totalFails ++;
        fails.innerHTML = totalFails ;
        showResult();
    }
}

function isHit() {
    if ( children1DegreeCurrentValue === 0
        || children1DegreeCurrentValue === 45 
        || children1DegreeCurrentValue === 90 
        || children1DegreeCurrentValue === 135 
        || children1DegreeCurrentValue === 180 
        || children1DegreeCurrentValue === 225 
        || children1DegreeCurrentValue === 270 
        || children1DegreeCurrentValue === 315 
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
    const backgroundColor = body.style.backgroundColor;
    let borderColor = children1.style.borderColor;
    pauseRotation = true ;
    popUp.style.display = "flex" ;
    popUp.style.opacity = 1 ;

    if (borderColor === '') {borderColor = 'red'}

    if ( isHit() === true ) {
        const randomIndex = Math.floor(Math.random() * succesIcons.length);
        const setSuccessIcon = succesIcons[randomIndex];
        popUpResult.innerText = setSuccessIcon; 
        setRotationBackgroundColor( "darkorange" );
        body.style.backgroundColor = "red";

        setTimeout(() => {
            setRotationBackgroundColor( "red" );
            body.style.backgroundColor = "darkorange";
        }, 500);
        
        setTimeout(() => {
            setRotationBackgroundColor( "darkorange" );
            body.style.backgroundColor = "red";
            popUp.style.opacity = '0';
        }, 1000);

        setTimeout(() => {
            popUp.style.display = "none" ;
            setRotationBackgroundColor( borderColor );
            body.style.backgroundColor = backgroundColor                
            pauseRotation = false ;
        }, 1500);
    } else {
        const randomIndex = Math.floor(Math.random() * failIcons.length);
        const setFailIcon = failIcons[randomIndex];
        popUpResult.innerText = setFailIcon;
        body.style.backgroundColor = 'black';
        setRotationBackgroundColor( '#fff' );

        setTimeout(() => {
            popUp.style.opacity = '0';
            pauseRotation = false;
            setRotationBackgroundColor( borderColor );
            body.style.backgroundColor = backgroundColor
        }, 750);

        setTimeout(() => {
            popUp.style.display = "none";
            popUp.style.opacity = '1';
        }, 1500);
    }
}