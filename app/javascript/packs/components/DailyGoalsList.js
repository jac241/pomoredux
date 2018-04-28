import React from 'react'
import {
  List,
  Button,
  Icon,
  Checkbox,
  Modal
} from 'semantic-ui-react'
import ExcuseModal from '../containers/ExcuseModal'
import {domId} from '../util'
import '../css/daily_goals.scss'

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
        <ExcuseModal excusable={dailyGoal} />
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
