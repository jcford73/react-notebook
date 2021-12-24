import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYinYang } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PasswordInput from '../common/password-input/PasswordInput';
import TextInput from '../common/text-input/TextInput';
import './LoginForm.scss';
import { login } from '../../store/actions/user_actions';

const LoginForm = ({
    errors = {},
    ...actions
}) => {
    const [credentials, setCredentials] = useState({ username: 'johncford@gmail.com', password: 'Test@1234' });
    const [loginPending, setLoginPending] = useState();
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();
        setLoginPending(true);
        actions.login(credentials)
            .then(() => {
                setLoginPending(false);
                navigate('/notes');
            })
            .catch(() => {
                setLoginPending(false);
                toast('Username or Password was invalid.', { type: 'error', position: 'bottom-right', theme: 'colored' });
            });
    };
    const onFieldChange = ({ target: { name, value } }) => {
        setCredentials({ ...credentials, [name]: value });
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="login-form">
                {errors.fromApi && (
                    <div className="login-form-api-error" role="alert">
                        {errors.fromApi}
                    </div>
                )}
                <TextInput
                    name="username"
                    label="Username"
                    onChange={onFieldChange}
                    value={credentials.username}
                    error={errors.username}
                />
                <PasswordInput
                    name="password"
                    label="Password"
                    onChange={onFieldChange}
                    value={credentials.password}
                    error={errors.password}
                />
                <div className="login-form-buttons">
                    { loginPending && false && <div className="spinner"><FontAwesomeIcon icon={faYinYang} spin color="white" /></div> }
                    <button
                        type="submit"
                        disabled={loginPending}
                    >
                        Log In
                    </button>
                </div>
            </div>
        </form>
    );
};

LoginForm.propTypes = {
    errors: PropTypes.shape(),
    login: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
    errors: {},
};

const mapDispatchToProps = {
    login,
};

export default connect(null, mapDispatchToProps)(LoginForm);
