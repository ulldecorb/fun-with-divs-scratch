function catchDiv(pauseRotation) {  //  Evaluar y mostrar resultado del lance
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

export default catchDiv;