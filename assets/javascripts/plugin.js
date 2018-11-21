function updateElement(element){
	switch(element){
		case "progressBar":
			var elementArray= document.getElementsByClassName('progress');
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
		elementArray[i].style.display='block';
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

function applyTrackerFilter(){
	var selector = document.getElementById('trackerSelector');
	var tracker = selector.options[selector.selectedIndex].value;
	var items = groups.get();
	trackerFilteredGroups.clear();
	if(tracker != 0){
		for(var i=0;i<items.length;i++){
			if(items[i].trackerId != tracker){
				items[i].visible= false;
			}
		}
		trackerFilteredGroups.add(items);
		timeline.setGroups(trackerFilteredGroups);
		fillEmptyTimeline(trackerFilteredGroups);
	}else{
		timeline.setGroups(groups);
	}
	setStatusSelectorOptions(tracker);
	document.getElementById('statusSelector').value="";
	updateElement("progressBar");
	updateElement("hitos");
}
function setStatusSelectorOptions(trackerId){
	var currentTrackerArray = statusPerTrackerArray[trackerId];
	var optionsAsString = "";
	optionsAsString+= "<option selected value='all'>Todos</option>"
	for(var i = 0; i < currentTrackerArray.length; i++) {
		if(currentTrackerArray[i]!=0){
			optionsAsString += "<option value='" + currentTrackerArray[i] + "'>" + currentTrackerArray[i] + "</option>";
		}
	}
	$("select[id='statusSelector']").find('option').remove().end().append($(optionsAsString));
}
function applyStatusFilter(){
	var statuses = $('#statusSelector').val();
	
	if(trackerFilteredGroups.length > 0){
		var items = trackerFilteredGroups.get();
	}else{
		var items = groups.get();
	}
	if(includes(statuses,"all")){
		if(trackerFilteredGroups.length > 0){
			timeline.setGroups(trackerFilteredGroups);
		}else{
			timeline.setGroups(groups);
		}
	}else{
		for(var i=0;i<items.length;i++){
			if(!includes(statuses,items[i].status)){
				items[i].visible= false;
			}
		}
		var statusFilteredGroups = new vis.DataSet();
		statusFilteredGroups.add(items);
		timeline.setGroups(statusFilteredGroups);
		fillEmptyTimeline(statusFilteredGroups);
	}
	updateElement("progressBar");
	updateElement("hitos");
}

function fillEmptyTimeline(group){
	var groupContent =group.get();
	var emptyItem = {id: 0,
		          content: '',
				  subgroupOrder: function (a,b) {return a.subgroupOrder - b.subgroupOrder;},
				  status: '',
				  link: '',
				  trackerId: ''
					};
	if(thereIsSomethingVisible(groupContent)){
		group.remove(0);
		timeline.setGroups(group);
	}else{
		group.add(emptyItem);
		timeline.setGroups(group);
	}
}
function thereIsSomethingVisible(groupContent){
	var flag = false
	for(var i = 0; i<groupContent.length; i++){
		if(groupContent[i].visible == true){
			flag=true;
		}
	}
	return flag;
}

function sortBy(field){
	var options = {
	  groupOrder: field,
	};
	timeline.setOptions(options);
}
function zoomIn(){
	timeline.zoomIn(0.85);
}
function zoomOut(){
	timeline.zoomOut(0.85);
}

//IExplorer support
function includes(container, value) {
	var returnValue = false;
	var pos = container.indexOf(value);
	if (pos >= 0) {
		returnValue = true;
	}
	return returnValue;
}

function visToCanvas(){

	html2canvas(document.getElementById("visualization")).then(function(canvas) {
		var img = canvas.toDataURL("image/png");
		window.open(img);
	});
}

