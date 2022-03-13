import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PublicRoutes from './routes/public/PublicRoutes';
import PrivateRoutes from './routes/private/PrivateRoutes';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateAction } from './store/slices/user/userReducer';
import * as cacheService from './services/cacheService';
import {
  INDEX_ROUTE,
  HOME_ROUTE,
  SEARCH_RESULTS_FULL_ROUTE,
  NOTFOUND_ROUTE,
  DETAILS_ROUTE,
} from './routes';
import LoadingPage from './pages/loadingPage/LoadingPage';
const Login = lazy(() => import('./pages/login/LoginPage'));
const HomePage = lazy(() => import('./pages/home/HomePage'));
const SearchResults = lazy(() => import('./pages/searchResults/SearchResults'));
const Details = lazy(() => import('./pages/details/Details'));
const PrivateLayout = lazy(() => import('./pages/layout/PrivateLayout'));



const App = () => {
  const isUserAuthenticated = useSelector(
    (state) => state.persistedReducer.user.authenticated
  );
  const dispatch = useDispatch();
  let token = '';

  if (!isUserAuthenticated) {
    token = cacheService.getUserToken();
  }

  if (token) {
    dispatch(
      authenticateAction.authenticate({
        authenticated: !isUserAuthenticated,
        token,
      })
    );
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route
            path={INDEX_ROUTE}
            element={
              <PublicRoutes isAuthenticated={isUserAuthenticated}>
                <Login />
              </PublicRoutes>
            }
          ></Route>
          <Route
            element={
              <PrivateLayout>
                <PrivateRoutes isAuthenticated={isUserAuthenticated} />
              </PrivateLayout>
            }
          >
            <Route path={HOME_ROUTE} element={<HomePage />}></Route>
            <Route path={DETAILS_ROUTE} element={<Details />}></Route>
            <Route
              path={SEARCH_RESULTS_FULL_ROUTE}
              element={<SearchResults />}
            ></Route>
          </Route>
          <Route path={NOTFOUND_ROUTE} element={<PageNotFound />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
