
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./routes";
import Header from "./components/layout/header/Header";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Loader from "./components/layout/loader/Loader";
import { SnackbarProvider, useSnackbar } from 'notistack';
const App = () => {

  const { token, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#000C17',
      },
    },
  });
  if (!ready) {
    return <Loader />;
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <AuthContext.Provider
          value={{
            token,
            login,
            logout,
            isAuthenticated,
          }}
        >
          <SnackbarProvider maxSnack={3} anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}>
          <BrowserRouter>
            
              <div className="Main-Wrapper">{routes}</div>
              <Header/>
          </BrowserRouter>
          </SnackbarProvider>
        </AuthContext.Provider>
      </>
    </ThemeProvider>
  );
};

export default App;
