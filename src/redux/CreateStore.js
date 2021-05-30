import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from "redux-devtools-extension";

export default (rootReducer, rootSaga) => {
    const middleware = []
    const enhancers = []

    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)

    enhancers.push(composeWithDevTools(applyMiddleware(...middleware)))

    const createAppropriateStore = createStore
    const store = createAppropriateStore(rootReducer, compose(...enhancers))

    let sagasManager = sagaMiddleware.run(rootSaga)

    return {
        store,
        sagasManager,
        sagaMiddleware
    }
}
