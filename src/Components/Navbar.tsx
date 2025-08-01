import React, { useState } from 'react';
import { Button, Avatar, Menu, MenuItem } from '@mui/material';
import { Person } from '@mui/icons-material';
import { Link ,useNavigate} from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);

    return (
        <nav className="w-full bg-white shadow-md px-5 md:px-20 py-3 h-[80px] sticky top-0 z-50 flex justify-between items-center">
            {/* Left - App Title */}
            <div className="text-xl font-bold text-blue-600">
                <Link to="/">
                My Favorite Shows
                </Link>
            </div>

            {/* Right - Auth Buttons or Avatar */}
            <div className="flex items-center gap-3">
                {!isAuthenticated ? (
                    <>
                        <Link to="/login">
                            <Button variant="outlined" color="primary" size="small">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="contained" color="primary" size="small">
                                Register
                            </Button>
                        </Link>

                    </>
                ) : (
                    <>
                        <Avatar
                            sx={{ bgcolor: '#1976d2', width: 36, height: 36, cursor: 'pointer' }}
                            onClick={handleMenuOpen}
                        >
                            <Person />
                        </Avatar>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => {
                                handleMenuClose();
                                logout(); navigate('/login');
                            }}>Logout</MenuItem>
                        </Menu>
                    </>
                )}
            </div>
        </nav>
    );
}
