import React, {FC} from 'react';

interface ButtonProps {
    caption: string;
    disabled: boolean;
}

const Button: FC<ButtonProps> = ({ caption, disabled }) => {
    return (
        <div>
            <button disabled={disabled}>{caption}</button>
        </div>
    );
}

export default Button;