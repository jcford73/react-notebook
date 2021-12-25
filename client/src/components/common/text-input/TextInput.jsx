import PropTypes from 'prop-types';
import './TextInput.scss';

const TextInput = ({
    name,
    label,
    placeholder,
    value,
    className,
    onChange,
    onBlur,
    error,
}) => (
    <div className={`text-input-component ${className}`}>
        { label && (<label htmlFor={name}>{label}</label>)}
        <div className="text-input-wrapper">
            <input
                type="text"
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
);

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
};

TextInput.defaultProps = {
    placeholder: '',
    value: '',
    error: '',
    label: '',
    className: '',
};

export default TextInput;
