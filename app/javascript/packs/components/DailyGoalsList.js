import React from 'react'
import pluralize from 'pluralize'

const domId = (record) => ( `${pluralize.singular(record.type)}_${record.id}` )

const DailyGoalsList = ({dailyGoals}) => (
  <div>
    {
      dailyGoals.map((dailyGoal) => (
        <div
          id={domId(dailyGoal)}
          key={dailyGoal.id}
        >
          { dailyGoal.attributes.title }
        </div>
      ))
    }
  </div>
)

export default DailyGoalsList
