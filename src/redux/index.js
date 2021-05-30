import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import configureStore from './CreateStore'
import rootSaga from '../sagas'

export const reducers = combineReducers({
    login: require('./LoginRedux').reducer,
})

export default () => {
    let finalReducers = persistReducer({
        key: 'root',
        storage,
    }, reducers)

    let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

    let persistor = persistStore(store)
    return { store }
}
