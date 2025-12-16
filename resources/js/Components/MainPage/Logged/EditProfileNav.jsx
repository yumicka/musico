import * as React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ForumIcon from '@mui/icons-material/Forum';
import EventIcon from '@mui/icons-material/Event';
import MusicNoteIcon from '@mui/icons-material/MusicNote';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavButton = styled(Link)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  color: '#aaa',
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease',
  minWidth: '70px',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    color: '#fff',
    transform: 'translateY(-2px)',
  },
  '&.active': {
    color: '#1aa58c',
    backgroundColor: alpha('#1aa58c', 0.1),
  },
}));

const NavIcon = styled(Box)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(0.5),
}));

const NavText = styled(Box)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 500,
}));

export default function Header() {
  const user = usePage().props.auth.user;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [activeNav, setActiveNav] = React.useState('home');
  

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
  };

  const getAvatarUrl = () => {
    if (user?.profile_photo_path) {
      return `/storage/${user.profile_photo_path}`;
    }
    return null;
  };

  const getInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const navItems = [
    { id: 'home', label: 'Sākums', icon: <HomeIcon />, route: route('mainpage') },
    { id: 'materials', label: 'Materiāli', icon: <SchoolIcon />, route: '#' },
    { id: 'forum', label: 'Forums', icon: <ForumIcon />, route: '#' },
    { id: 'events', label: 'Pasākumi', icon: <EventIcon />, route: '#' },
    { id: 'maksas', label: 'Maksas materiāls', icon: <MusicNoteIcon />, route: '#' },
  ];

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          backgroundColor: '#1a1a1a',
          color: 'white',
          border: '1px solid #333',
          '& .MuiMenuItem-root': {
            '&:hover': {
              backgroundColor: '#333',
            },
          },
        },
      }}
    >
      <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src={getAvatarUrl()}
            sx={{ width: 32, height: 32 }}
          >
            {getInitials()}
          </Avatar>
          <Box>
            <Box sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
              {user?.name || 'User'}
            </Box>
            <Box sx={{ fontSize: '0.75rem', color: '#aaa' }}>
              {user?.email || 'user@example.com'}
            </Box>
          </Box>
        </Box>
      </MenuItem>
      <MenuItem 
        onClick={handleMenuClose}
        component={Link}
        href={route('profile.edit')}
        sx={{ py: 1.5 }}
      >
        My account
      </MenuItem>
      <MenuItem 
        onClick={() => {
          handleMenuClose();
          router.post(route('logout'));
        }}
        sx={{ py: 1.5 }}
      >
        Log out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: {
          backgroundColor: '#1a1a1a',
          color: 'white',
          border: '1px solid #333',
          minWidth: '200px',
        },
      }}
    >
      {/* Навигация в мобильном меню */}
      {navItems.map((item) => (
        <MenuItem 
          key={item.id}
          component={Link}
          href={item.route}
          onClick={() => {
            handleNavClick(item.id);
            handleMobileMenuClose();
          }}
          sx={{ 
            py: 1.5,
            color: activeNav === item.id ? '#1aa58c' : 'white',
            borderLeft: activeNav === item.id ? '3px solid #1aa58c' : 'none',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ color: activeNav === item.id ? '#1aa58c' : '#aaa' }}>
              {item.icon}
            </Box>
            <Box sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
              {item.label}
            </Box>
          </Box>
        </MenuItem>
      ))}
      
      <Box sx={{ borderTop: '1px solid #333', my: 1 }} />
      
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar
            src={getAvatarUrl()}
            sx={{ width: 32, height: 32 }}
          >
            {getInitials()}
          </Avatar>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#000", borderBottom: "solid 1px" }}>
        <Toolbar>
          <Box
            component="img"
            src="/images/musico-logo-moved.png"
            alt="Musico"
            sx={{
              height: 100,
              display: { xs: 'none', sm: 'block' },
            }}
          />
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: 1,
            ml: 3,
            flexGrow: 1,
            justifyContent: 'center',
          }}>
            {navItems.map((item) => (
              <NavButton
                key={item.id}
                href={item.route}
                className={activeNav === item.id ? 'active' : ''}
                onClick={() => handleNavClick(item.id)}
              >
                <NavIcon sx={{ color: activeNav === item.id ? '#1aa58c' : 'inherit' }}>
                  {item.icon}
                </NavIcon>
                <NavText>
                  {item.label}
                </NavText>
              </NavButton>
            ))}
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                p: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(26, 165, 140, 0.1)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    background: 'linear-gradient(45deg, #1aa58c, #148f77, #1aa58c)',
                    borderRadius: '50%',
                    zIndex: 0,
                  },
                }}
              >
                <Avatar
                  src={getAvatarUrl()}
                  sx={{ 
                    width: 38, 
                    height: 38,
                    border: '2px solid #000',
                    position: 'relative',
                    zIndex: 1,
                    bgcolor: '#1aa58c',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                >
                  {getInitials()}
                </Avatar>
              </Box>
            </IconButton>
          </Box>
          
          {/* Мобильная кнопка меню */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}