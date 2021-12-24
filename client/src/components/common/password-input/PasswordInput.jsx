import PropTypes from 'prop-types';
import './PasswordInput.scss';

const PasswordInput = ({
    name,
    label,
    placeholder,
    value,
    onChange,
    error,
}) => (
    <div className="password-input-component">
        { label && (<label htmlFor={name}>{label}</label>)}
        <div className="password-input-wrapper">
            <input
                type="password"
                name={name}
                label={label}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                error={error}
            />
        </div>
    </div>
);

PasswordInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

PasswordInput.defaultProps = {
    placeholder: '',
    value: '',
    error: '',
    label: '',
};

export default PasswordInput;
