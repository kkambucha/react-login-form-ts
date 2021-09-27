import React from 'react';

const useInput = (initValue: string) => {
    const [value, setValue] = React.useState(initValue)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return {
        value,
        onChange: handleChange
    };
}

export default useInput
