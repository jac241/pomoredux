export const notificationActionMiddleware = ({ dispatch, getState }) => {
  document.addEventListener('notificationclick', (event) => {

  })
  return next => action => ( next(action) )
}

