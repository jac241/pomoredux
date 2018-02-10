import React from 'react'
import pluralize from 'pluralize'
import {List, Button} from 'semantic-ui-react'
import '../css/daily_goals.scss'

const domId = (record) => ( `${pluralize.singular(record.type)}_${record.id}` )

const DailyGoalsList = ({dailyGoals, markGoalAccomplished}) => (
  <List divided size='huge'>
    {
      dailyGoals.map((dailyGoal) => (
        <DailyGoal
          key={dailyGoal.id}
          dailyGoal={dailyGoal}
          markGoalAccomplished={markGoalAccomplished}
        />
      ))
    }
  </List>
)

const DailyGoal = ({dailyGoal, markGoalAccomplished}) => {
  const { title, accomplished_today } = dailyGoal.attributes

  return (
    <List.Item
      id={domId(dailyGoal)}
    >
      { !accomplished_today &&
        <List.Content floated='right'>
          <Button
            content='Done'
            onClick={() => markGoalAccomplished(dailyGoal)}
            size='tiny'
          />
        </List.Content>
      }
      <List.Content
        floated='left'
        className={accomplished_today ? 'accomplished' : ''}
      >
        { title }
      </List.Content>
    </List.Item>
  )
}

export default DailyGoalsList
