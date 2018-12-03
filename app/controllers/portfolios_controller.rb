class PortfoliosController < ApplicationController
  def index
    @identifier = params[:id]
	@project = Project.find_by identifier: @identifier
	@issues = Issue.where(['project_id = ?', @project.id])
	
	@demandasString = Setting.plugin_portfolio_timeline['itemsTopTracker']
	@demandasId = (Tracker.find_by name: @demandasString).id
	@issuesDemandas = Issue.where('project_id = ? and tracker_id=?', @project.id,@demandasId)
	
	@startString = Setting.plugin_portfolio_timeline['start_date']
	@endString = Setting.plugin_portfolio_timeline['due_date']
	
	@startDateID = CustomField.select('id').find_by name: @startString
	@dueDateID = CustomField.select('id').find_by name: @endString
	
	@hitosFieldID = CustomField.select('id').find_by name: Setting.plugin_portfolio_timeline['hitos']
	

	@customField1Name = Setting.plugin_portfolio_timeline['customField1']
	@customField2Name = Setting.plugin_portfolio_timeline['customField2']
	@customField3Name = Setting.plugin_portfolio_timeline['customField3']
	
	@customField1ID = CustomField.select('id').find_by name: Setting.plugin_portfolio_timeline['customField1']
	@customField2ID = CustomField.select('id').find_by name: Setting.plugin_portfolio_timeline['customField2']
	@customField3ID = CustomField.select('id').find_by name: Setting.plugin_portfolio_timeline['customField3']
	
	@attendants = User.where(['type = ?','User'])
	
	@trackers = Tracker.joins("INNER JOIN projects_trackers ON projects_trackers.tracker_id = trackers.id and projects_trackers.project_id =", @project.id.to_s)
	@statuses = IssueStatus.where(['is_closed = ?', false])
	@nonClosedStatuses = Array.new
	
	@statuses.each do |status|
		@nonClosedStatuses.insert(status.id,status.name)
	end
	
	
	@size = Tracker.maximum('id')
	@statusPerTrackerArray = Array.new(@size,0)
	
	@trackers.each do |tracker|
		@trackerStatuses = WorkflowTransition.select('new_status_id').distinct.where(['tracker_id = ?',tracker.id])
		@statusesArrayAux = Array.new
		@trackerStatuses.each do |trackerStatus|
			@statusId = trackerStatus.new_status_id
			@statusesArrayAux.push(@nonClosedStatuses[@statusId])
		end
		@statusPerTrackerArray.insert(tracker.id,@statusesArrayAux.compact)
	end
	
	@statusPerTrackerArray[0] = @nonClosedStatuses.compact
	
  end
end