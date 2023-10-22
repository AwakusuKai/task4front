import React from 'react';
import { useDispatch,useSelector} from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useForm} from "react-hook-form";
import { fechRegister, selectIsAuth } from "../../redux/slices/auth"; 

import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispach = useDispatch();
  const {register, handleSubmit, setError, formState:{errors, isValid}} = useForm({
    defaultValues: {
      fullName: 'Sakura Tenura',
      email: 'temurasakura@ukoz.net',
      password: '1'
    },
    mode: 'onChange',
  })
  const onSubmit = async (values) => {
    const data = await dispach(fechRegister(values));
    if(!data.payload){
      return alert("Failed to register.")
    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    }

  };
  if(isAuth){
    return<Navigate to="/"/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField className={styles.field} label="Full Name"
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', {required: 'Enter your name'})} 
        fullWidth />
      <TextField className={styles.field} label="E-Mail"
        type="email"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
      {...register('email', {required: 'Enter your email'})} fullWidth />
      <TextField className={styles.field} label="Password"
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', {required: 'Enter your password'})} fullWidth />
      <Button disabled={!isValid} size="large" type='submit' variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
