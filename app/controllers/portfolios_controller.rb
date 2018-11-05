class PortfoliosController < ApplicationController
  def index
    @identifier = params[:id]
	@project = Project.find_by identifier: @identifier
	@projectId = Project.select('id').where('identifier = ?', @identifier)
	@issues = Issue.where(project_id: @projectId)
	
	@startString = Setting.plugin_portfolio_timeline['start_date']
	@endString = Setting.plugin_portfolio_timeline['due_date']
	
	@startDateID = CustomField.select('id').find_by name: @startString
	@dueDateID = CustomField.select('id').find_by name: @endString
	
	@hitosFieldID = CustomField.select('id').find_by name: Setting.plugin_portfolio_timeline['hitos']
	
	@statuses= IssueStatus.all
  end
end