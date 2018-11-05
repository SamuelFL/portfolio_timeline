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
  end
end