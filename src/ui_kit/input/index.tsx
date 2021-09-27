import React, {FC} from 'react';

interface InputProps {
    caption: string;
    type: string;
    required: boolean;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: Array<string>;
}

interface InputErrorsProps {
    errors: Array<string>;
}

const InputErrors: FC<InputErrorsProps> = ({ errors = [] }) => {
    if (!errors.length) return null
    return (
        <div>
            {errors.map((error) => <div key={error}>{error}</div>)}
        </div>
    )
}

const Input: FC<InputProps> = ({ caption, type, required, name, value, onChange, errors = [] }) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e)
    return (
        <div>
            <label htmlFor={name}>
                {caption}
                <input type={type} name={name} required={required} onChange={handleOnChange} value={value} />
            </label>
            <InputErrors errors={errors} />
        </div>
    );
}

export default Input;