class PortfoliosController < ApplicationController
  def index
    @identifier = params[:id]
	@projectId = Project.select('id').where('identifier = ?', @identifier)
	@projectName = Project.select('name').find_by id: @projectId
	@issues = Issue.where(project_id: @projectId)
	@plannedStartDateID = CustomField.select('id').find_by name: 'Fecha inicio planificada' 
	@plannedDueDateID = CustomField.select('id').find_by name: 'Fecha fin planificada'
	@hitosFieldID = CustomField.select('id').find_by name: 'Hitos'
  end
end