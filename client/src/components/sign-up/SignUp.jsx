import './SignUp.scss';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import TextInput from '../common/text-input/TextInput';
import { signUp } from '../../store/actions/user-actions';
import PasswordInput from '../common/password-input/PasswordInput';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import isEmpty from 'validator/lib/isEmpty';
import { toast } from 'react-toastify';

const SignUp = (actions) => {
    const navigate = useNavigate();

    const [newUserForm, setNewUserForm] = useState({username: {}, password: {}, displayName: {}});

    const signUp = async (event) => {
        event.preventDefault();

        const usernameError = validate('username', newUserForm.username.value);
        const passwordError = validate('password', newUserForm.password.value);
        const displayNameError = validate('displayName', newUserForm.displayName.value);

        if (usernameError || passwordError || displayNameError) {
            setNewUserForm({
                username: {
                    ...newUserForm.username,
                    touched: true,
                    checked: true,
                    errors: usernameError,
                },
                password: {
                    ...newUserForm.password,
                    touched: true,
                    checked: true,
                    errors: passwordError,
                },
                displayName: {
                    ...newUserForm.displayName,
                    touched: true,
                    checked: true,
                    errors: displayNameError,
                },
            });
        }

        try {
            await actions.signUp({
                username: newUserForm.username.value,
                password: newUserForm.password.value,
                displayName: newUserForm.displayName.value,
            });
        } catch (error) {
            toast.error('Error signing up.',{position:'bottom-right'});
        }
    };

    const onChange = ({target: {name: field, value}}) => {
        const update = {
            ...newUserForm,
            [field]: {
                ...newUserForm[field],
                touched: true,
                value
            }
        };
        if (update[field].checked) {
            update[field].error = validate(field, value);
        }
        setNewUserForm(update);
    };

    const onBlur = ({target: {name: field, value}}) => {
        if (newUserForm[field].touched) {
            setNewUserForm({
                ...newUserForm,
                [field]: {
                    ...newUserForm[field],
                    checked: true,
                    error: validate(field, value),
                }
            });
        }
    };

    const validate = (field, value) => {
        switch (field) {
        case 'username': {
            return !isEmail(value, {require_tld: true, domain_specific_validation: true}) ? 'Invalid email address. Please use the format: xxxx@yyyy.zzz' : '';
        }
        case 'password': {
            return !isStrongPassword(value) ? 'Password too weak. Requires 8+ characters, 1 upper, 1 lower, 1 special, 1 number' : '';
        }
        case 'displayName': {
            return isEmpty(value, {ignore_whitespace: true}) ? 'Display Name is required.' : '';
        }
        }
    };

    const cancel = () => {
        navigate('/');
    };

    return (
        <>
            <div className="sign-up-page">
                <div className="sign-up-form">
                    <h2>Create an Account</h2>
                    <form onSubmit={signUp}>
                        <TextInput
                            name="username"
                            label="Email Address"
                            placeholder='you@email.com'
                            onChange={onChange}
                            onBlur={onBlur}
                            value={newUserForm.username.value}
                            error={newUserForm.username.error}
                        />
                        <PasswordInput
                            name="password"
                            label="Password"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={newUserForm.password.value}
                            error={newUserForm.password.error}
                        />
                        <TextInput
                            name="displayName"
                            label="Display Name"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={newUserForm.displayName.value}
                            error={newUserForm.displayName.error}
                        />
                        <div className="sign-up-buttons">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={cancel}
                            >Cancel</button>
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={(
                                    newUserForm.displayName.error
                                    || newUserForm.password.error
                                    || newUserForm.displayName.error
                                )}
                            >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

SignUp.propTypes = {
    signUp: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    signUp
};

export default connect(null, mapDispatchToProps)(SignUp);
