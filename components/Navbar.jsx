"use client"
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <AppBar position="sticky" sx={{ bgcolor: '#78a3e0' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                    MyStore
                </Typography>
                <Box>
                    <Button
                        component={Link}
                        href='/'
                        sx={{
                            color: pathname === '/' ? 'primary' : 'white',
                            borderBottom: pathname === '/' ? '2px solid #27538f' : '2px solid transparent',
                            borderRadius: 0,
                            mx: 1,
                        }}
                    >
                        Home
                    </Button>

                    <Button
                        component={Link}
                        href='/about'
                        sx={{
                            color: pathname === '/about' ? 'primary' : 'white',
                            borderBottom: pathname === '/about' ? '2px solid #27538f' : '2px solid transparent',
                            borderRadius: 0,
                            mx: 1,
                        }}
                    >
                        About
                    </Button>
                    
                    <Button
                        component={Link}
                        href='/products'
                        sx={{
                            color: pathname === '/products' ? 'primary' : 'white',
                            borderBottom: pathname === '/products' ? '2px solid #27538f' : '2px solid transparent',
                            borderRadius: 0,
                            mx: 1,
                        }}
                    >
                        Products
                    </Button>

                    <Button
                        component={Link}
                        href='/login'
                        sx={{
                            color: pathname === '/login' ? 'primary' : 'white',
                            border: "1px solid #27538f",
                            borderRadius: 2,
                            mx: 1,
                        }}
                    >
                        Login
                    </Button>

                    <Button
                        component={Link}
                        href='/register'
                        sx={{
                            color: pathname === '/register' ? 'primary' : 'white',
                            border: "1px solid #27538f",
                            borderRadius: 2,
                            mx: 1,
                        }}
                    >
                        Register
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;