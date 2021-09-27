import React, {FC} from 'react';

import Input from '../../ui_kit/input'
import Button from '../../ui_kit/button'
import {register, IRegisterErrors, IError} from '../../api'

enum FormStatus {
    PENDING = 'PENDING',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
}

const LoginForm: FC = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [errors, setErrors] = React.useState<IError[]>([])
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus(FormStatus.PENDING)
        register({
            name,
            email,
            password,
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
            <Input required caption='Name' type='text' name='name' onChange={(value) => setName(value)} value={name} errors={getError('name')} />
            <Input required caption='Email' type='email' name='email' onChange={((value) => setEmail(value))} value={email} errors={getError('email')} />
            <Input required caption='Password' type='password' name='password' onChange={(value) => setPassword(value)} value={password} errors={getError('password')} />
            <Button caption='Зарегистрироваться' disabled={status === FormStatus.PENDING} />
        </form>
    );
}

export default LoginForm;