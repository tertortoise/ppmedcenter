import React, {useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Avatar,
  Grid,
  Hidden,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';
import {
  Alarm,
  Ballot,
  Create,
  Home,
  LocationOn,
  MoreHoriz,
  Menu,
  Person,
  Phone,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Logo from '../UI/Logo';

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
  },
  drawer: {
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    '& a:active': {
      backgroundColor: 'green',
    },
  },
  drawerPaper: {
    top: '140px',
    width: drawerWidth,
  },
  drawerModalPaper: {
    width: drawerWidth,
  },
  appBar: {
    position: 'fixed',
    color: theme.palette.grey.A700,
    height: '140px',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      padding: '2px 1rem',
    },
    '& span': {
      display: 'block',
    },
  },
  logoSpan: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    padding: '0 2rem',
    [theme.breakpoints.down('sm')]: {
      padding: '2px 1rem',
    },
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCont: {
    paddingRight: '1rem',
    alignSelf: 'center',
  },
  icon: {
    fontSize: '3rem',
    color: theme.palette.primary.main,
  },
  menuFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.grey[400],
  },
  activeLink: {
    backgroundColor: theme.palette.secondary.light,
    color: 'black',
    borderRadius: '3px',
    padding: '4px',
  },
  moreIconCont: {
    paddingRight: 0,
  },
  buttonDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      lineHeight: '1.5',
      width: '100%',
    },
  },
  listItemPersonal: {
    color: theme.palette.secondary.main,
    fontStyle: 'italic',
  },
  listItemRoot: {
    color: theme.palette.primary.main,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.dark,
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.dark,
      },
    },
    '&.Mui-disabled': {
      opacity: 1,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.dark,
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.dark,
      },
      //for mobile drawer to increase specificity
      '&:hover': {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
      },
    }
  },
  
  content: {
    marginTop: '140px',
    marginLeft: drawerWidth,
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing(2),
    },
    '& main': {
      paddingLeft: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
    },
    '& footer': {
      position: 'fixed',
      bottom: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor: theme.palette.primary.A700,
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
      },
    },
  },
}));

function Layout(props) {
  const theme = useTheme();
  const classes = useStyles();
  const mainMenu = {
    main: {
      eng: 'Main',
      name: 'Главная',
    },
    about: {
      eng: 'About',
      name: 'О нас',
    },
    specialits: {
      eng: 'Specialists',
      name: 'Специалисты',
    },
    prices: {
      eng: 'Prices',
      name: 'Цены',
    },
    news: {
      eng: 'News',
      name: 'Новости',
    },
    contacts: {
      eng: 'Contacts',
      name: 'Контакты',
    },
    cabinet: {
      eng: 'Cabinet',
      name: 'Личный кабинет',
    },
    get xs() {
      return [];
    },
    get sm() {
      return [this.main, this.cabinet];
    },
    get md() {
      return this.xl;
    },
    /** lg and xl are equal */
    get lg() {
      return this.xl;
    },
    get xl() {
      return [
        this.main,
        this.about,
        this.specialits,
        this.prices,
        this.news,
        this.contacts,
        this.cabinet,
      ];
    },
  };

  function useWidth() {
    const keys = [...theme.breakpoints.keys].reverse();
    return (
      keys.reduce((output, key) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const matches = useMediaQuery(theme.breakpoints.only(key));
        return !output && matches ? key : output;
      }, null) || 'xs'
    );
  }

  /** handling main menu (MM) open, close */
  const [mmOpen, setMMOpen] = useState(false);
  const mmRef = React.useRef(null);
  function handleMMToggle() {
    setMMOpen((prevOpen) => !prevOpen);
  }
  function handleMMClose(event) {
    if (mmRef.current && mmRef.current.contains(event.target)) {
      return;
    }
    setMMOpen(false);
  }

  const currentWidth = useWidth();

  const menuItems = mainMenu[currentWidth].map((item) => {
    const classNameActive = item === mainMenu.cabinet ? 'activeLink' : null;
    return (
      <span key={item.eng} className={classes[classNameActive]}>
        {item.name}
      </span>
    );
  });
  /** slide down main menu items */
  const mmItems = mainMenu.xl.map((item) => {
    if (mainMenu[currentWidth].includes(item)) return null;
    else return <MenuItem key={item.eng} onClick={handleMMClose}>{item.name}</MenuItem>;
  });

  /** handling drawer */
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  /** handling selection of sidebar items */

  const handleMenuClick = (path) => (e) => { 
    props.history.push(path);
  };
  const drawer = (
    <List className={classes.list}>
      <ListItem >
        <ListItemAvatar>
          <Avatar src={props.personalImage} />
        </ListItemAvatar>
        <ListItemText secondary={`${props.surname} ${props.firstName} ${props.middleName}`} className={classes.listItemPersonal} secondaryTypographyProps={{color: 'inherit'}}/>
      </ListItem>
      <ListItem
        button
        onClick={handleMenuClick('/')}
        selected={props.location.pathname === '/'}
        disabled={props.location.pathname === '/'}
        className={classes.listItemRoot}
      >
        <ListItemIcon>
          <Home color="primary" />
        </ListItemIcon>
        <ListItemText primary='Кабинет' />
      </ListItem>
      <ListItem
        button
        onClick={handleMenuClick('/apptEditor')}
        selected={props.location.pathname === '/apptEditor'}
        disabled={props.location.pathname === '/apptEditor'}
        className={classes.listItemRoot}
      >
        <ListItemIcon>
          <Create />
        </ListItemIcon>
        <ListItemText primary='Записаться на прием к врачу' />
      </ListItem>
      <ListItem
        button
        onClick={handleMenuClick('/apptsList')}
        selected={props.location.pathname === '/apptsList'}
        disabled={props.location.pathname === '/apptsList'}
        className={classes.listItemRoot}
      >
        <ListItemIcon>
          <Ballot />
        </ListItemIcon>
        <ListItemText primary='Мои записи' />
      </ListItem>
      <ListItem
        button
        onClick={handleMenuClick('/personal')}
        selected={props.location.pathname === '/personal'}
        disabled={props.location.pathname === '/personal'}
        className={classes.listItemRoot}
      >
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary='Личные данные' />
      </ListItem>
     
    </List>
  );
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper className={classes.paper}>
                {/* <Mood className={classes.icon} /> */}
                <Logo />
                <Typography variant='subtitle1' noWrap>
                  <span>Медицинский центр</span>
                  <span className={classes.logoSpan}>AMG-GROUP</span>
                </Typography>
              </Paper>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={6} md={4} lg={3}>
                <Paper className={clsx(classes.paper)}>
                  <Phone className={classes.icon} />
                  <Typography variant='subtitle1' noWrap>
                    <span>Телефон</span>
                    <span>+7(495)123-45-67</span>
                  </Typography>
                </Paper>
              </Grid>
            </Hidden>
            <Hidden smDown>
              <Grid item md={4} lg={3}>
                <Paper className={clsx(classes.paper)}>
                  <Alarm className={clsx(classes.icon)} />
                  <Typography variant='subtitle1' noWrap>
                    <span>Часы работы</span>
                    <span>8.00 - 20.00</span>
                  </Typography>
                </Paper>
              </Grid>
            </Hidden>
            <Hidden mdDown>
              <Grid item lg={3}>
                <Paper className={clsx(classes.paper)}>
                  <LocationOn className={classes.icon} />
                  <Typography variant='subtitle1' noWrap>
                    <span>МО, КОРОЛЕВ</span>
                    <span>ПР-Т КОСМОНАВТОВ 15</span>
                  </Typography>
                </Paper>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
        <Toolbar className={classes.toolbar}>
          <Grid container spacing={3}>
            <Hidden mdUp>
              <Grid item xs={2} sm={2}>
                <IconButton
                  onClick={handleDrawerToggle}
                  className={classes.iconCont}
                >
                  <Menu className={classes.icon} />
                </IconButton>
              </Grid>
            </Hidden>
            <Hidden xsDown>
              <Grid item sm={5} md={9} lg={10} className={classes.menuFlex}>
                {menuItems}
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid
                item
                xs={4}
                sm={2}
                className={clsx(classes.iconCont, classes.moreIconCont)}
              >
                <IconButton
                  ref={mmRef}
                  onClick={handleMMToggle}
                  className={classes.iconCont}
                >
                  <MoreHoriz className={classes.icon} />
                </IconButton>
                <Popper
                  open={mmOpen}
                  anchorEl={mmRef.current}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom'
                            ? 'center top'
                            : 'center bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleMMClose}>
                          <MenuList>{mmItems}</MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
            </Hidden>

            <Grid
              item
              xs={6}
              sm={3}
              md={3}
              lg={2}
              className={classes.buttonDiv}
            >
              <Button
                variant='outlined'
                color='secondary'
                size='small'
                className={classes.button}
                onClick={handleMenuClick('/apptEditor')}
                disabled={props.location.pathname === '/apptEditor'}
              >
                <span>Записаться</span>
                <span>на прием</span>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='Mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerModalPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <main>{props.children}</main>
        {/* <footer className={classes.footer}>
          
        </footer> */}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    personalImage: state.personalImage,
    surname: state.personalData.surname,
    firstName: state.personalData.firstName,
    middleName: state.personalData.middleName,
  };
};

export default connect(
  mapStateToProps
)(withRouter(Layout));
