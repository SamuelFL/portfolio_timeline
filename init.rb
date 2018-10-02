Redmine::Plugin.register :portfolio_timeline do
  name 'Portfolio Timeline plugin'
  author 'SamuelFL'
  description 'This plugin implements a view for issues as a timeline'
  version '0.0.1'
  project_module :portfolios do
    permission :view_portfolios, :portfolios => :index
  end
  menu :project_menu, :portfolios, { :controller => 'portfolios', :action => 'index' }, :caption => 'Portfolio', :after => :overview
end
