function updateElement(element){
	switch(element){
		case "progressBar":
			var elementArray= document.getElementsByClassName('progress-wrapper');
			var checkBox = document.getElementById('progressBarCheckbox');
			break;
		case "hitos":
			var elementArray= document.getElementsByClassName('vis-point');
			var checkBox = document.getElementById('hitosCheckbox');
			break;
	}
	if(checkBox.checked){
		showElement(elementArray);
	}else{
		hideElement(elementArray);
	}
	timeline.redraw();
}	
function hideElement(elementArray){
	for (var i=0; i<elementArray.length;i++){
		elementArray[i].style.display='none';
	}
}
function showElement(elementArray){
	for (var i=0; i<elementArray.length;i++){
		elementArray[i].style.display='inline-block';
	}
}

function moveWindow(startArray){
	var range = timeline.getWindow();
    var interval = range.end - range.start;
	var startDate = new Date(startArray[1],startArray[2]-1,startArray[3]);
	var endDate = moment(startDate).add(interval,'milliseconds')
	timeline.setWindow({
            start: startDate,
            end:  endDate
        });
}

function applyFilter(){
	var selector = document.getElementById('statusSelector');
	var status = selector.options[selector.selectedIndex].text;
	var items = groups.get();
	if(status != "-- Seleccione estado --"){
		for(var i=0;i<items.length;i++){
			if(items[i].status != status){
				items[i].visible= false;
			}
		}
		var shownGroups = new vis.DataSet();
		shownGroups.add(items);
		timeline.setGroups(shownGroups);
	}else{
		timeline.setGroups(groups);
	}	
}