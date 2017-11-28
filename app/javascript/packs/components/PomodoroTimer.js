import React from 'react'
import SelectablePomodoroModeButtons from '../containers/SelectablePomodoroModeButtons'
import TickingTimer from '../containers/TickingTimer'

const PomodoroTimer = () => (
  <div>
    <SelectablePomodoroModeButtons />
    <TickingTimer />
  </div>
)

export default PomodoroTimer