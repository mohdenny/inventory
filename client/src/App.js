import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Items from './components/items/Items';
import About from './components/about/About';
import Dashboard from './components/dashboard/Dashboard';
// import Post from './components/post/Post';
// import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser());

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route
            path="dashboard"
            element={<AppLayout><PrivateRoute component={Dashboard}/></AppLayout>}
          />
          <Route path="items" element={<AppLayout><PrivateRoute component={Items} /></AppLayout>} />
          <Route path="about" element={<AppLayout><PrivateRoute component={About} /></AppLayout>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;