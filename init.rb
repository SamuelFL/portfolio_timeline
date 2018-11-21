Redmine::Plugin.register :portfolio_timeline do
  name 'Portfolio Timeline plugin'
  author 'SamuelFL (http://inerza.com/)'
  description 'Redmine plugin for portfolio management'
  version '1.1.1'
  project_module :portfolio do
    permission :view_portfolios, :portfolios => :index
  end
  menu :project_menu, :portfolios, { :controller => 'portfolios', :action => 'index' }, :caption => 'Portfolio', :after => :overview
  
  settings :default => {
    :start_date => "Fecha de inicio planificada",
	:due_date    => "Fecha de fin planificada",
	:hitos        => "Hitos planificados"
	}, :partial => 'settings/portfolio_timeline_settings'
  
end
