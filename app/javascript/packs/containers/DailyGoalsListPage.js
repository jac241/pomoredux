import React from 'react'
import {connect} from 'react-redux'
import SpinWhileLoading from '../components/SpinWhileLoading'
import {fetchDailyGoals, markGoalAccomplished } from '../actions/daily_goals'
import DailyGoalsList from '../components/DailyGoalsList'

class DailyGoalsListPage extends React.Component {
  componentDidMount() {
    const { fetchDailyGoals } = this.props
    fetchDailyGoals()
  }

  render() {
    const { requestingGoals, dailyGoals, markGoalAccomplished  } = this.props

    return (
      <SpinWhileLoading loading={requestingGoals}>
        <DailyGoalsList
          dailyGoals={dailyGoals}
          markGoalAccomplished={markGoalAccomplished}
        />
      </SpinWhileLoading>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    requestingGoals: !anyGoals(state) && readingApi(state),
    dailyGoals: dailyGoals(state)
  }
}

const anyGoals = (state) => ( state.api.goals !== undefined )
const readingApi = (state) => ( state.api.isReading != 0 )
const dailyGoals = (state) => ( anyGoals(state) ? state.api.goals.data : [] )

export default connect(
  mapStateToProps,
  { fetchDailyGoals, markGoalAccomplished }
)(DailyGoalsListPage)