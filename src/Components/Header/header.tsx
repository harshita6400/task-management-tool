import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import * as routes from '../../Routes/routeConstents';
import './header.scss';

const StyledAppBar = styled(AppBar)`
  background: #cfcfcf;
  color: #000;
  z-index: 99;
  box-shadow: none;
  padding-top: 5px;
`


export const Header = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className='menu-coniatiner' variant="h6" component="div">
                        <Link to={routes.HOME}>Home</Link>
                        <Link to={routes.AddEVENT}>Add Event</Link>
                        <Link to={routes.EVENTSLIST}>Events List</Link>
                    </Typography>
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
}