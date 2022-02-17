import {Button, Input, message} from "antd";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useDispatch} from "react-redux";
import {loginThunk} from "../redux/app-reducer";

export const LoginPage = () => {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({email: '', password: ''})
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

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...formData})
      // auth.login(data.token , data.userId)

      dispatch(loginThunk(data.token, data.userId))
    } catch (e) {}
  }

  return (
    <>
      <div className="auth bannerBack">
        <div className="container">
          <div className="authForm">
            <div className="authFormBlock">
              <div className='authFormHeader'>
                <b>Почта</b>
              </div>
              <Input
                className='authFormInput'
                type='text'
                name='email'
                value={formData.email}
                onChange={changeHandler}
                placeholder='Введите почту...'/>
            </div>
            <div className="authFormBlock">
              <div className='authFormHeader'>
                <b>Пароль</b>
              </div>
              <Input
                className='authFormInput'
                type={'password'}
                name='password'
                value={formData.password}
                onChange={changeHandler}
                placeholder='Введите пароль...'/>
            </div>
            <Button
              size={'large'}
              className='authFormButton'
              type={'primary'}
              onClick={loginHandler}
              disabled={isLoading}>
              Войти
            </Button>
            <br/>
            <br/>
            <NavLink to='/register'>Создать аккаунт</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}