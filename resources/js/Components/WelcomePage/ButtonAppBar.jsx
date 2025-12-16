import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Link } from '@inertiajs/react';


export default function ButtonAppBar() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          top: 0, 
          backgroundColor: '#000', 
          color: '#fff',
          boxShadow: 'none',
          minHeight: trigger ? 110: 100,
          transition: 'all 0.3s ease',
          borderBottom: 'solid 1px',
          zIndex: 11,
        }}
      >
        <Toolbar
          sx={{
            display: 'grid',
            gridTemplateColumns: trigger
              ? '1fr auto 1fr'
              : '1fr auto 1fr',
            alignItems: 'center',
            minHeight: trigger ? 70 : 100,
            px: trigger ? 6 : 10,
            transition: 'all 0.35s ease',
          }}
        >
          
          <Box sx={{ flexGrow: 1 }} />

          <Box
            component="img"
            src = {trigger ? "/images/musico-logo-moved.png" :"/images/musico-logo.png"}
            alt="Musico"
            sx={{
              position: 'absolute',
              left: trigger ? '20%' :'50%',
              transform: 'translateX(-50%)',
              height: 195,   
              top: -30,      
            }}
          />

          
          <Box sx={{ gridColumn: trigger ? '2' : '3', display: 'flex', alignItems: 'center', justifyContent: trigger ? 'center' : 'end', gap: 4, mr: 4, mt: trigger ? 4 : 3, transition: '0.2s'}}>
            <Button
              component={Link}
              href={route('login')}
              sx={{
                textTransform: 'none', 
                fontWeight: 600,
                fontSize: 22,
                color: '#fff',
                fontFamily: 'Satoshi-Medium',
                transition: '0.2s',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 4,
                  width: '0%',
                  height: '2px',
                  backgroundColor: '#20c7a8ff',
                  transition: 'width .25s ease',
                },
                '&:hover': {
                  color: '#20c7a8ff',
                },

                '&:hover::after': {
                  width: '100%',
                },
              }}
            >
              Ielogoties
            </Button>
            <Button
              component={Link}
              href={route('register')}
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: 22, color: '#fff', fontFamily: 'Satoshi-Medium', transition: '0.2s',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 4,
                  width: '0%',
                  height: '2px',
                  backgroundColor: '#20c7a8ff',
                  transition: 'width .25s ease',
                },
                '&:hover': {
                  color: '#20c7a8ff',
                },

                '&:hover::after': {
                  width: '100%',
                },
              }}
            >
              Reģistrēties
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
