import { Navigate, Outlet } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const PrivateRoute = ({allowed}) => {
    return allowed ? <Outlet /> : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
    allowed: PropTypes.bool.isRequired,
};

export default PrivateRoute;
