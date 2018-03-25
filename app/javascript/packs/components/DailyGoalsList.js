import React from 'react'
import pluralize from 'pluralize'
import {List, Button, Icon, Checkbox} from 'semantic-ui-react'
import '../css/daily_goals.scss'

const domId = (record) => ( `${pluralize.singular(record.type)}_${record.id}` )

const DailyGoalsList = ({dailyGoals, toggleGoalAccomplished}) => (
  <List divided size='huge'>
    {
      dailyGoals.map((dailyGoal) => (
        <DailyGoal
          key={dailyGoal.id}
          dailyGoal={dailyGoal}
          toggleGoalAccomplished={toggleGoalAccomplished}
        />
      ))
    }
  </List>
)

const DailyGoal = ({dailyGoal, toggleGoalAccomplished}) => {
  const { title, accomplished_today } = dailyGoal.attributes

  return (
    <List.Item
      id={domId(dailyGoal)}
    >
      <List.Content floated='right'>
        <Checkbox
          name='checkmark'
          onChange={() => toggleGoalAccomplished(dailyGoal)}
          title='Mark goal accomplished!'
          checked={accomplished_today}
        />
      </List.Content>
      <List.Content
        floated='left'
        id={domId(dailyGoal) + '_title'}
        className={accomplished_today ? 'accomplished' : ''}
      >
        { title }
      </List.Content>
    </List.Item>
  )
}

export default DailyGoalsList
