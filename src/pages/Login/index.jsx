import React from "react";
import { useDispatch,useSelector} from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";

import styles from "./Login.module.scss";
import { fechAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispach = useDispatch();
  const {register, handleSubmit, setError, formState:{errors, isValid}} = useForm({
    defaultValues: {
      email: 'awakusu@ukoz.net',
      password: '1'
    },
    mode: 'onChange',
  })
  const onSubmit = async (values) => {
    const data = await dispach(fechAuth(values));
    if(!data.payload){
      return alert("Failed to login.")
    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    }

  };
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: 'Enter your email'})}
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="Password" 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {required: 'Enter your password'})} 
          fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};
