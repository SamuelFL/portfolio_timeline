class CreatePortfolios < ActiveRecord::Migration
  def change
    create_table :portfolios do |t|

      t.string :name


    end

  end
end
