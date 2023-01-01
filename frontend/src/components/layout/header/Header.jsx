import * as React from 'react';
import { useState, useContext} from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@material-ui/core'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate, useLocation, useHref } from 'react-router-dom'
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { NavLink } from 'react-router-dom';
import {AuthContext} from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";
import {Button} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { SnackbarProvider, useSnackbar } from 'notistack';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  zIndex: -1,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const useStyles = makeStyles({
  list: {
    width: 250
  },
    active: {
      background: '#1677FF'
    },
});

const Header = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

    const handleClickVariantEN = (variant)  => {
        
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('English language', { variant });
      };
      const handleClickVariantUK = (variant) => {
        
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('Українська мова', { variant });
      };
  const { t, i18n } = useTranslation();
    const classes = useStyles()
    const history = useNavigate()
    const history1 = useNavigate()
    const location = useLocation()
    const auth = useContext(AuthContext);
    const[isOpen ,setIsOpen] = useState(false);
    const changelanguage = (language) => {
      i18n.changeLanguage(language);
    }
    
      const handleChange = (e) => {
        setLang(e.target.value);
        const url = window.location.href;
        window.location.replace(
          url.substring(0, url.lastIndexOf("?")) + "?lng=" + e.target.value
        );
      };
    
      const [lang, setLang] = useState(localStorage.getItem('i18nextLng').length > 0 ? localStorage.getItem('i18nextLng') : "en");
    const logoutHandler = (event) => {
      event.preventDefault();
      auth.logout();
      history1("/login");
      console.log(123)
    };
      const menuItems = [
      { 
        text: t("myrep"), 
        icon: <ContentPasteOutlinedIcon/>, 
        path: '/reports',
        
      },
      { 
        text: t("health"), 
        icon: <HealthAndSafetyOutlinedIcon />, 
        path: '/subscribe' 
      },
    ];
    const SecondmenuItems = [
    
        { 
          text: 'FAQ', 
          icon: <HelpOutlineOutlinedIcon />, 
          path: '/faq' 
        },
        { 
            text: t("logout"), 
            icon: <LogoutOutlinedIcon />, 
            onClick: logoutHandler
          },
      ];
    const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#000C17',
      },
    },
  });
  
  return auth.token!==null ? (
    <div className={classes.root}>
    <ThemeProvider theme={darkTheme}>
      <Box >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
      PaperProps={{
        sx: {
          backgroundColor: "#000C17"
        }
      }}
      className={classes.drawer} 
      variant="permanent" 
      open={open}
      classes={{ paper: classes.paper }}
      >
        <DrawerHeader
        sx={{
            color: 'white'
          }}>
        <div>
          <Typography 
          variant="h5">
            MuscleHealth
          </Typography>
        </div>
          <IconButton sx={{
                  color: 'white',
                }}
                onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {menuItems.map((item, index) => (
            <NavLink to={item.path} key={index} style={{textDecoration:"none"}}>
            <ListItem
            key={item.text} 
            // onClick={() => history.push(item.path)}
            className={location.pathname == item.path ? classes.active : null} 
            disablePadding sx={{ display: 'block' }}>
                
              <ListItemButton
                sx={{
                  color: 'white',
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
        <List
        
        sx={{top: '55%', }}>
          <ListItem
          sx={{
            color: 'white',
            justifyContent: open ? 'initial' : 'center',
          }}
          >
              <Button  sx={{
                color: 'white',
                justifyContent: open ? 'left' : 'center',
                fontSize: "1rem",
                lineHeight: 1.5,
                fontFamily: "Arial",
                letterSpacing: "0.00938em"
              }} onClick={() => {changelanguage("en"); handleClickVariantEN('info');}}>EN</Button>  
              </ListItem>
              <ListItem
              sx={{
                color: 'white',
                justifyContent: open ? 'initial' : 'center',
                
              }}>
              <Button sx={{
                color: 'white',
                justifyContent: open ? 'left' : 'center',
                fontSize: "1rem",
                lineHeight: 1.5,
                fontFamily: "Arial",
                letterSpacing: "0.00938em"
              }} onClick={() => {changelanguage("uk"); handleClickVariantUK('info');}}>UA</Button>
              </ListItem>
        {SecondmenuItems.map((item,index) => (
            <NavLink to={item.path} key={index} style={{textDecoration:"none"}}>
            <ListItem
           
            key={item.text} 
            // onClick={() => history.push(item.path)}
            onClick={item.onClick}
            className={location.pathname == item.path ? classes.active : null} 
            disablePadding sx={{ display: 'block'}}>
              
              <ListItemButton
                sx={{
                  color: 'white',
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        { children }
      </div>
    </Box>
    </ThemeProvider>
    </div>
  ): (<></>);

}
export default Header;

// import React, { useState } from 'react';
// import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
// import { NavLink } from 'react-router-dom';


// const Header = ({children}) => {
//     const[isOpen ,setIsOpen] = useState(false);
//     const toggle = () => setIsOpen (!isOpen);
//     const menuItem=[
//         {
//             path:"/reports",
//             name:"Dashboard",
//             icon:<HealthAndSafetyOutlinedIcon />
//         },
//         {
//             path:"/login",
//             name:"About",
//             icon:<HealthAndSafetyOutlinedIcon />
//         }
        
//     ]
// return (
//     <div className="container">
//        <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
//            <div className="top_section">
//                <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
//                <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
//                    <HealthAndSafetyOutlinedIcon onClick={toggle}/>
//                </div>
//            </div>
//            {
//                menuItem.map((item, index)=>(
//                    <NavLink to={item.path} key={index} className="link" activeclassName="active">
//                        <div className="icon">{item.icon}</div>
//                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
//                    </NavLink>
//                ))
//            }
//        </div>
//        <main>{children}</main>
//     </div>
// );
// };
// export default Header;