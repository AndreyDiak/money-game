import {Button, Input, message} from "antd";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";

export const AuthPage = () => {

  const [formData, setFormData] = useState({email: '', password: '', login: ''})
  const {isLoading, error, clearError, request} = useHttp()

  useEffect(() => {
    if (error) {
      message.warning(error)
    }
    clearError()
  }, [error, message, clearError])

  const changeHandler = (event: any) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...formData})
      message.success(data.message)
    } catch (e) {}
  }

  return (
    <>
      <div className="auth bannerBack">
        <div className="container">
          <div className="authForm">
            <div className="authFormBlock">
              <div className='authFormHeader'><b>Почта</b></div>
              <Input
                className='authFormInput'
                type='text'
                name='email'
                value={formData.email}
                onChange={changeHandler}
                placeholder='Введите почту...'/>
            </div>
            <div className="authFormBlock">
              <div className='authFormHeader'><b>НикНейм</b></div>
              <Input
                className='authFormInput'
                type='text'
                name='login'
                value={formData.login}
                onChange={changeHandler}
                placeholder='Введите логин...'/>
            </div>
            <div className="authFormBlock">
              <div className='authFormHeader'><b>Пароль</b></div>
              <Input
                className='authFormInput'
                type={'password'}
                name='password'
                value={formData.password}
                onChange={changeHandler}
                placeholder='Введите пароль...'/>
            </div>
            <Button size={'large'} className='authFormButton' type={'primary'} disabled={isLoading} onClick={registerHandler}>
              Регистрация
            </Button>
            <br/>
            <br/>
            <NavLink to='/login'>У меня есть аккаунт</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}