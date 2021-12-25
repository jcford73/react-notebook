import PropTypes from 'prop-types';
import './PasswordInput.scss';

const PasswordInput = ({
    name,
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
}) => {
    return (
        <div className="password-input-component">
            { label && (<label htmlFor={name}>{label}</label>)}
            <div className="password-input-wrapper">
                <input
                    type="password"
                    name={name}
                    label={label}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    value={value}
                />
            </div>
            {(error && <div className="text-input-error">{error}</div>)}
        </div>
    );};

PasswordInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
};

PasswordInput.defaultProps = {
    placeholder: '',
    value: '',
    error: '',
    label: '',
};

export default PasswordInput;
