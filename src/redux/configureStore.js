import 'regenerator-runtime/runtime'
import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../redux/reducers';
import rootSaga from '../redux/sagas';

export const history = createHistory();

function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const sagaMiddleWare = createSagaMiddleware();
  const middlewares = [
    sagaMiddleWare,
    reactRouterMiddleware,
  ];

  return {
    ...createStore(rootReducer, initialState, compose(
      applyMiddleware(...middlewares))),
    runSaga: sagaMiddleWare.run(rootSaga)
  }
}

function configureStoreDev(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const sagaMiddleWare = createSagaMiddleware();
  const middlewares = [
    reduxImmutableStateInvariant(),
    sagaMiddleWare,
    reactRouterMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../redux/reducers', () => {
      const nextReducer = require('../redux/reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return {
    ...store,
    runSaga: sagaMiddleWare.run(rootSaga),
  }
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
