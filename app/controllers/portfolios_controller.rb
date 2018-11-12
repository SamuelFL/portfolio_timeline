class PortfoliosController < ApplicationController
  def index
    @identifier = params[:id]
	@project = Project.find_by identifier: @identifier
	@issues = Issue.where(['project_id = ? and closed_on IS NULL', @project.id])
	
	@startString = Setting.plugin_portfolio_timeline['start_date']
	@endString = Setting.plugin_portfolio_timeline['due_date']
	
	@startDateID = CustomField.select('id').find_by name: @startString
	@dueDateID = CustomField.select('id').find_by name: @endString
	
	@hitosFieldID = CustomField.select('id').find_by name: Setting.plugin_portfolio_timeline['hitos']
	
	@trackers= Tracker.all
	
	@statuses= IssueStatus.where(['is_closed = ?', false])
	@nonClosedStatuses =Array.new
	@statuses.each do |status|
		@nonClosedStatuses.insert(status.id,status.name)
	end
	@size = Tracker.maximum('id')
	@statusPerTrackerArray= Array.new(@size,0)
	@trackers.each do |tracker|
		@trackerStatuses = WorkflowTransition.select('new_status_id').distinct.where(['tracker_id = ?',tracker.id])
		@statusesArrayAux = Array.new
		
		@trackerStatuses.each do |trackerStatus|
			@statusId = trackerStatus.new_status_id
			@statusesArrayAux.push(@nonClosedStatuses[@statusId])
		end
		
		@statusPerTrackerArray.insert(tracker.id,@statusesArrayAux.compact)
	end
	@statusPerTrackerArray[0]= @nonClosedStatuses.compact
	
	@statusPerTrackerArray.map {|e| e ? e : 0}
	
  end
end