class PortfoliosController < ApplicationController
  def index
    @identifier = params[:id]
	@projectId = Project.select('id').where('identifier = ?', @identifier)
	@projectName = Project.select('name').find_by id: @projectId
	@issues = Issue.where(project_id: @projectId)
	@startDateID = CustomField.select('id').find_by name: 'Fecha de inicio planificada' 
	@dueDateID = CustomField.select('id').find_by name: 'Fecha de fin planificada'
	@hitosFieldID = CustomField.select('id').find_by name: 'Hitos planificados'
	@statuses= IssueStatus.all
  end
end