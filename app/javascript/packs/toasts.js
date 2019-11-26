import React from 'react'
import { toast } from 'react-semantic-toasts';

export const showErrorSavingPomodoroToast = () => {
  toast(
    {
      type: 'error',
      icon: 'exclamation circle',
      title: 'Error Saving Pomodoro',
      description: <p>
          There was an error recording that you finished this pomodoro.
          Check that you are connected to the internet. If you are and this
          error still occurred, it may be due to a server error.
      </p>,
      time: 0,
      size: 'large',
    },
    () => console.log('toast closed'),
    () => console.log('toast clicked'),
    () => console.log('toast dismissed')
  );
}
