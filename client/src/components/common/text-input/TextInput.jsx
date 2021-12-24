import PropTypes from 'prop-types';
import './TextInput.scss';

const TextInput = ({
    name,
    label,
    placeholder,
    value,
    onChange,
    error,
}) => (
    <div className="text-input-component">
        { label && (<label htmlFor={name}>{label}</label>)}
        <div className="text-input-wrapper">
            <input
                type="text"
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

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

TextInput.defaultProps = {
    placeholder: '',
    value: '',
    error: '',
    label: '',
};

export default TextInput;
