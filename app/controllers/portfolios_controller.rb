class PortfoliosController < ApplicationController
  def index
    @identifier = params[:id]
	@projectId = Project.select('id').where('identifier = ?', @identifier)
	@issues = Issue.where(project_id: @projectId)
  end
end