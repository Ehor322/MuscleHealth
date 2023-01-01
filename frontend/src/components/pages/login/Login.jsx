import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState, useContext  } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AuthContext} from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { SnackbarProvider, useSnackbar } from 'notistack';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { useTranslation } from "react-i18next";



const theme = createTheme();

const Login = () => {
  const changelanguage = (language) => {
    i18n.changeLanguage(language);
  }
  const { t, i18n } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => {
        
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Invalid username or password', { variant });
  };
  const handleClickVariant1 = (variant) => {
        
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Authorization successful', { variant });
  };
  const handleClickVariantEN = (variant)  => {
        
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('English language', { variant });
  };
  const handleClickVariantUK = (variant) => {
    
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Українська мова', { variant });
  };
  const history = useNavigate();
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const changeHandlerLogin = (event) => {
    setFormLogin({ ...formLogin, [event.target.name]: event.target.value });
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/user/login", "POST", { ...formLogin });
      auth.login(data.token);
      handleClickVariant1("success");
      setTimeout(() => {
        history("/reports");
      }, 1000);
    } catch (e) {
      handleClickVariant("error");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    
    <ThemeProvider theme={theme}>
      <List
        sx={{
          display: 'inline-block',
          maxWidth: '100%',
          color: 'white',
          justifyContent: 'center',
        }}>
          <ListItem
          sx={{
            color: 'white',
            justifyContent: 'center',
          }}
          >
              <Button
              type="submit"
              variant="contained"
                sx={{
                color: 'white',
                justifyContent: 'left',
                fontSize: "1rem",
                lineHeight: 1.5,
                fontFamily: "Arial",
                letterSpacing: "0.00938em"
              }} onClick={() => {changelanguage("en"); handleClickVariantEN('info');}}>EN</Button>  
              </ListItem>
              <ListItem
              sx={{
                color: 'white',
                justifyContent: 'center',
              }}>
              <Button 
              type="submit"
              variant="contained"
              sx={{
                color: 'white',
                justifyContent: 'left',
                fontSize: "1rem",
                lineHeight: 1.5,
                fontFamily: "Arial",
                letterSpacing: "0.00938em"
              }} onClick={() => {changelanguage("uk"); handleClickVariantUK('info');}}>UA</Button>
              </ListItem>
              </List>
     
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            width: '100%',
            marginTop: 15, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signin")}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("email")}
              name="email"
              autoComplete="email"
              autoFocus
              value={formLogin.email}
              onChange={changeHandlerLogin}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
              type="password"
              id="password"
              autoComplete="current-password"
              value={formLogin.password}
                  onChange={changeHandlerLogin}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("rememberme")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={loginHandler}
              disabled={loading}
            >
              {t("signin")}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Login;