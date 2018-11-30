//Timeline functions
function updateAllElements(){
	updateElement("progressBar");
	updateElement("hitos");
	setCustomColumn();
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
	html2canvas(document.getElementById("visualization")).then((canvas) => {
																	var img = canvas.toDataURL("image/png");
																	var newWindow = window.open();
																	newWindow.document.write('<img src="' + img + '" />');
																	});
}

function setCustomColumn(){
	var field = $('#customFieldSelector').val();
	switch(field){
		case "":
			$('.customField1').css('display','none');
			$('.customField2').css('display','none');
			$('.customField3').css('display','none');
			$('.customColumnHeader').css('display','none');
			break;
		case "customField1":
			$('.customField1').css('display','block');
			$('.customField2').css('display','none');
			$('.customField3').css('display','none');
			$('.customColumnHeader').css('display','block');
			break;
		case "customField2":
			$('.customField1').css('display','none');
			$('.customField2').css('display','block');
			$('.customField3').css('display','none');
			$('.customColumnHeader').css('display','block');
			break;
		case "customField3":
			$('.customField1').css('display','none');
			$('.customField2').css('display','none');
			$('.customField3').css('display','block');
			$('.customColumnHeader').css('display','block');
			break;
	}
	sortBy(field);
}

//Filter functions
function applyTrackerFilter(){
	var tracker = $('#trackerSelector').val();
	var items = groups.get();
	trackerFilteredGroups.clear();
	if(tracker == 0){
		trackerFilteredGroups.add(groups.get());
	}else{
		for(var i=0;i<items.length;i++){
			if(items[i].trackerId != tracker){
				items[i].visible= false;
			}
		}
		trackerFilteredGroups.add(items);
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
	attendantFilteredGroups.clear();
	if(attendant == "all"){
		attendantFilteredGroups.add(trackerFilteredGroups.get());
	}else{
		for(var i=0;i<items.length;i++){
			if(items[i].assigned_to_id != attendant){
				items[i].visible= false;
			}
		}
		attendantFilteredGroups.add(items);
	}
	timeline.setGroups(attendantFilteredGroups);
	document.getElementById('statusSelector').value="all";
	fillIfEmptyTimeline(attendantFilteredGroups);
	updateAllElements();
}
function applyStatusFilter(){
	var statuses = $('#statusSelector').val();
	var items = attendantFilteredGroups.get();
	var statusFilteredGroups = new vis.DataSet();
	
	if(includes(statuses,"all")){
		statusFilteredGroups.add(attendantFilteredGroups.get())
	}else{
		for(var i=0;i<items.length;i++){
			if(!includes(statuses,items[i].status)){
				items[i].visible= false;
			}
		}
		statusFilteredGroups.add(items);
	}
	timeline.setGroups(statusFilteredGroups);
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
				  trackerId: '',
				  customField1: '',
				  customField2: '',
				  customField3: ''
					};
	group.remove(0);
	if(thereIsSomethingVisible(groupContent)){
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

//Table functions
function showTr(id,buttonOn, buttonOff){
	$(id).css('display','table-row');
	$(buttonOn).css('display','inline');
	$(buttonOff).css('display','none');
}
function hideTr(id,buttonOn, buttonOff){
	$(id).css('display','none');
	$(buttonOn).css('display','inline');
	$(buttonOff).css('display','none');
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