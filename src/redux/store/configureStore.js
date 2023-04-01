import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from './../epics/rootEpics'
import rootReducer from "./../reducers/rootReducers";

export default function configureStore(preloadedState) {
    const epicMiddleware = createEpicMiddleware()
    const middlewares = [thunk, epicMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const storeEnhancer = [middlewareEnhancer]

    const composedEnhancer = composeWithDevTools(...storeEnhancer)

    const store = createStore(rootReducer, preloadedState, composedEnhancer)
    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('../reducers/rootReducers', () => {
                const newRootReducer = require('../reducers/rootReducers').default
                store.replaceReducer(newRootReducer)
            })
        }
    }
    epicMiddleware.run(rootEpic)
    return store
}
