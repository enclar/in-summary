import { useState } from "react";

// MUI components
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Login = () => {
    // setting up state
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });

    // function to handle typing in input fields
    const handleTyping = (event, field) => {
        setLoginDetails({ ...loginDetails, [`${field}`]: event.target.value });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box 
                sx={{
                    margin: "100px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "30px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5" sx={{ letterSpacing: "1px" }}>
                        WELCOME
                    </Typography>
                </Box>
                <Box
                    component="form"
                    autoComplete="off"
                    sx={{
                        width: "300px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px"
                    }}
                >
                    <TextField
                        fullWidth
                        required
                        id="login-email-input"
                        label="Email Address"
                        value={loginDetails.email}
                        onChange={() => handleTyping(event, "email")}
                    />
                    <TextField
                        fullWidth
                        required
                        id="login-password-input"
                        label="Password"
                        type="password"
                        value={loginDetails.password}
                        onChange={() => handleTyping(event, "password")}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Log In
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Login;