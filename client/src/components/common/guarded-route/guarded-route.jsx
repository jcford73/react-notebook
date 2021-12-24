import { Navigate, Outlet } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const PrivateRoute = ({isLoggedIn}) => {
    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

export default PrivateRoute;
