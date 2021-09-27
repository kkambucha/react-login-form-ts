import React, {FC} from 'react';

import Input from '../../ui_kit/input'
import useInput from '../../ui_kit/input/useInput'
import Button from '../../ui_kit/button'
import {register, IRegisterErrors, IError} from '../../api'

enum FormStatus {
    PENDING = 'PENDING',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
}

const LoginForm: FC = () => {
    const name = useInput('')
    const email = useInput('')
    const password = useInput('')

    const [status, setStatus] = React.useState('')
    const [errors, setErrors] = React.useState<IError[]>([])
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus(FormStatus.PENDING)
        register({
            name: name.value,
            email: email.value,
            password: password.value,
        })
            .then((res) => {
                setStatus(FormStatus.SUCCESS)
            })
            .catch((err) => {
                const error: IRegisterErrors = JSON.parse(err.message)
                setErrors(error.errors)
                setStatus(FormStatus.ERROR)
            })
    }

    const getError = (fieldName: string): Array<string> => {
        return errors.filter((e: IError) => e.field === fieldName).map((e: IError) => e.message)
    }

    return (
        <form action='' onSubmit={handleOnSubmit}>
            <Input required caption='Name' type='text' name='name' errors={getError('name')} {...name} />
            <Input required caption='Email' type='email' name='email' errors={getError('email')} {...email} />
            <Input required caption='Password' type='password' name='password' errors={getError('password')} {...password} />
            <Button caption='Зарегистрироваться' disabled={status === FormStatus.PENDING} />
        </form>
    );
}

export default LoginForm;