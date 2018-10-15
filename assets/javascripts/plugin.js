function updateHitos(){
  var hitosArray= document.getElementsByClassName('vis-point');
  var checkBox = document.getElementById('hitosCheckbox');
  if(checkBox.checked){
    showHitos(hitosArray);
  }else{
	hideHitos(hitosArray);
  }
  timeline.redraw();
}	

function hideHitos(hitosArray){
  for (var i=0; i<hitosArray.length;i++){
    hitosArray[i].style.display='none';
  }
};

function showHitos(hitosArray){
  for (var i=0; i<hitosArray.length;i++){
    hitosArray[i].style.display='inline-block';
  }
};

function updateProgressBar(){
  var progressBarArray= document.getElementsByClassName('progress-wrapper');
  var checkBox = document.getElementById('progressBarCheckbox');
  if(checkBox.checked){
    showProgressBar(progressBarArray);
  }else{
	hideProgressBar(progressBarArray);
  }
  timeline.redraw();
}	

function hideProgressBar(progressBarArray){
  for (var i=0; i<progressBarArray.length;i++){
    progressBarArray[i].style.display='none';
  }
};

function showProgressBar(progressBarArray){
  for (var i=0; i<progressBarArray.length;i++){
    progressBarArray[i].style.display='inline-block';
  }
};