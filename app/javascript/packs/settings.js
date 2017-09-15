const BUFFER_SO_THAT_59_ALWAYS_SHOWN = 100
export const TIMER_LENGTH_MS = 1500 * 1000 + BUFFER_SO_THAT_59_ALWAYS_SHOWN // 25 minutes in ms
//export const TIMER_LENGTH_MS = 5 * 1000 + BUFFER_SO_THAT_59_ALWAYS_SHOWN
export const TIMER_LENGTHS_MS = {
  pomodoro: 1500 * 1000 + BUFFER_SO_THAT_59_ALWAYS_SHOWN, // 25 minutes in ms
  short_break: 300 * 1000 + BUFFER_SO_THAT_59_ALWAYS_SHOWN, // 25 minutes in ms
  long_break: 600 * 1000 + BUFFER_SO_THAT_59_ALWAYS_SHOWN // 25 minutes in ms
}
