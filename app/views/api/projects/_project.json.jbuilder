json.extract! project,  :id,
                        :address,
                        :title,
                        :revenue,
                        :valuation,
                        :cashflow,
                        :model_id,
                        :city,
                        :country,
                        :continent,
                        :icon,
                        :description,
                        :creator_id,
                        :creator,
                        :created_at,
                        :status,
                        :sketch_link,
                        :bus_plan_link,
                        :start_date,
                        :latitude,
                        :longitude,
                        :summary,
                        :capital_required,
                        :current_capital,
                        :actual_cashflow,
                        :accum_actual_cashflow,
                        :projected_cashflow,
                        :accum_projected_cashflow,
                        :close_date,
                        :votes
if project.pdf_file.attached?
    json.pdfUrl url_for(project.pdf_file)
end
json.file asset_path(project.file.url)
