import { setAxiosConfig, readEndpoint } from 'redux-json-api'

export const setupReduxJSONAPI = (store) => {
  store.dispatch(setAxiosConfig({
    baseURL: '/api/',
  }))
}
