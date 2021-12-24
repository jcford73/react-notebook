import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './common/guarded-route/guarded-route';
import HomePage from './home-page/HomePage';
import Notebook from './notebook/Notebook';
import SettingsPage from './settings/SettingsPage';

const App = ({isLoggedIn}) => (
    <>
        <Routes>
            <Route exact path="" element={<HomePage />} />
            <Route path="" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
                <Route path="notes" element={<Notebook />} />
                <Route path="note/:id" element={<Notebook />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
        </Routes>
        <ToastContainer autoClose={3000} />
    </>
);

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isLoggedIn: !!state.currentUser.jwt
});

export default connect(mapStateToProps)(App);
