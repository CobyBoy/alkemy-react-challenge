import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import PublicRoutes from './routes/public/PublicRoutes';
import PrivateRoutes from './routes/private/PrivateRoutes';
import PageNotFound from './components/pagenotfound/PageNotFound';
import Login from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateAction } from './store/userReducer';
import Details from './pages/details/Details';
import SearchResults from './pages/searchResults/SearchResults';
import {
  INDEX_ROUTE,
  HOME_ROUTE,
  DETAILS_ID_ROUTE,
  SEARCH_RESULTS_FULL_ROUTE,
  NOTFOUND_ROUTE,
} from './routes';

const App = () => {
  const isUserAuthenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  let token = '';

  if (!isUserAuthenticated) {
    token = localStorage.getItem('loginToken');
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
      <Header />
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
          element={<PrivateRoutes isAuthenticated={isUserAuthenticated} />}
        >
          <Route path={HOME_ROUTE} element={<HomePage />}></Route>
          <Route path={DETAILS_ID_ROUTE} element={<Details />}></Route>
          <Route
            path={SEARCH_RESULTS_FULL_ROUTE}
            element={<SearchResults />}
          ></Route>
        </Route>
        <Route path={NOTFOUND_ROUTE} element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
