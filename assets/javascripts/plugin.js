//Timeline functions
function updateAllElements(){
	updateElement("progressBar");
	updateElement("hitos");
}
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
function sortBy(field){
	var options = {
	  groupOrder: field,
	};
	timeline.setOptions(options);
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
function zoomIn(){
	timeline.zoomIn(0.85);
}
function zoomOut(){
	timeline.zoomOut(0.85);
}
function visToCanvas(){
	html2canvas(document.getElementById("visualization")).then(canvasToImg(canvas));
}
function canvasToImg(canvas){
	var img = canvas.toDataURL("image/png");
	window.open(img);
}
//Filter functions
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
	}else{
		trackerFilteredGroups.add(groups.get());
	}
	timeline.setGroups(trackerFilteredGroups);
	fillIfEmptyTimeline(trackerFilteredGroups);
	setStatusSelectorOptions(tracker);
	document.getElementById('statusSelector').value="all";
	document.getElementById('attendantSelector').value="all";
	updateAllElements();
}
function applyAttendantFilter(){
	var attendant = $('#attendantSelector').val();
	var items = trackerFilteredGroups.get();
	
	if(attendant == "all"){
		timeline.setGroups(trackerFilteredGroups);
	}else{
		for(var i=0;i<items.length;i++){
			if(items[i].assigned_to_id != attendant){
				items[i].visible= false;
			}
		}
		attendantFilteredGroups.clear();
		attendantFilteredGroups.add(items);
		timeline.setGroups(attendantFilteredGroups);
	}
	document.getElementById('statusSelector').value="all";
	fillIfEmptyTimeline(attendantFilteredGroups);
	updateAllElements();
}
function applyStatusFilter(){
	var statuses = $('#statusSelector').val();
	var items = attendantFilteredGroups.get();
	
	if(includes(statuses,"all")){
		timeline.setGroups(attendantFilteredGroups);
	}else{
		for(var i=0;i<items.length;i++){
			if(!includes(statuses,items[i].status)){
				items[i].visible= false;
			}
		}
		var statusFilteredGroups = new vis.DataSet();
		statusFilteredGroups.add(items);
		timeline.setGroups(statusFilteredGroups);
	}
	fillIfEmptyTimeline(statusFilteredGroups);
	updateAllElements();
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
function fillIfEmptyTimeline(group){
	var groupContent = group.get();
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

//IExplorer support
function includes(container, value) {
	var returnValue = false;
	var pos = container.indexOf(value);
	if (pos >= 0) {
		returnValue = true;
	}
	return returnValue;
}