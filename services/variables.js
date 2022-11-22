// ------------------- VARIABLES -------------------------//
// -----------------------------------------------------------//

export const body = document.querySelector( "body" ); 
// const father = document.getElementById( "father" ) ;
// const son = document.getElementById( "son" ) ;
export const baby1 = document.getElementById( "baby1" );
export const baby2 = document.getElementById( "baby2" );
export const childrenX =document.getElementsByClassName( "baby1" );
export const chidrenY = document.getElementsByClassName( "baby2" );
export const patchBabyHole = document.getElementById( "patchBabyHole" );

export const score = document.getElementById( "score" );
export const hits = document.getElementById( "hits" );
export const fails = document.getElementById( "fails" );

export const popUp = document.getElementById( "popUp" );
export const popUpBackground = document.getElementById( "popUpBackground" );
export const popUpResult = document.getElementById( "popUpResult" );

export const errorScreen = document.getElementById( "errorScreen" );

export const succesIcons = ['🍻','😎','😁','😉','👍','🤘','⚡','🎉'];
export const failIcons = ['💩','💀','😭','🙈','👎','😤'];

export let setRotate = { };
export let pauseRotation = false; 
export let baby1DegreeCurrentValue = 0;
export let baby2DegreeCurrentValue = 0;
startRotationBackGround( 70 );
export let hitCounter = "";
export let failCounter = "";
export let showResultBehaviour = { };