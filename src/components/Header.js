import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Modal, TextField } from '@mui/material';
// import { Password } from '@mui/icons-material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const style = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



// const pages = ['AM Feed'];
const settings = ['Edit Profile', 'Change Password', 'Logout']


function Header() {

    const [open1, setOpen1] = React.useState(false);

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const [img1, setimg1] = useState("");
    const [image, setimage] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    //password
    const [password1, setpassword1] = useState({
        password: "",
        newpassword: ""
    })
    const [confirmpassword, setConfirmPassword] = useState("");
    const [passMatch, setpassMatch] = useState(false);


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    let data = JSON.parse(localStorage.getItem("data"));

    const id = data.currentUser._id


    //firstname
    let firstname = data.currentUser.firstname.split('');
    firstname = firstname[0];

    //lastname
    let lastname = data.currentUser.lastname.split('');
    lastname = lastname[0];

    //Avtar Name    
    let name1 = firstname + lastname
    let avtarName = name1.toUpperCase();
    // console.log(avtarName);

    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    // useEffect(() => {
    //     if () {
    //         setpassMatch(true);
    //         console.log("u", passMatch);
    //     }

    // }, [confirmpassword])

    const handleChange = () => {
        // if (password1.newpassword === confirmpassword) {
        //     setpassMatch(true);
        //     console.log(passMatch);
        // }

        let payload = {
            password: password1.password,
            newpassword: password1.newpassword
        }
        console.log(passMatch)
        if (password1.newpassword === confirmpassword) {
            console.log("first")
            axios(`http://localhost:8080/login/changepwd/${id}`, {
                method: "PATCH",
                data: payload,
                headers: {
                    "auth-token": data.token
                },
            })
                .then((res) => {
                    // alert("user updated");
                    handleClose()
                    handleClick1();

                    setTimeout(() => {
                        navigate('/')

                    }, 1000);

                })
                .catch((err) => {
                    setErrorMessage(err.data.message)
                })

        }
        else {
            alert("new password and confirm password not match")
        }

        setpassword1({ password: "", newpassword: "" })
        setConfirmPassword("")
    }
    const [fullname, setfullname] = useState("");

    useEffect(() => {
        axios(`http://localhost:8080/profile/${data.currentUser._id}`, {
            method: "GET",
        })
            .then((res) => {

                setfullname(res.data.users.firstname + " " + res.data.users.lastname);
                console.log(fullname);

            })
            .catch((err) => {
                console.log(err);

            })
    }, [])

    useEffect(() => {
        axios(`http://localhost:8080/profile/${id}`, {
            method: "GET",
        })
            .then((res) => {
                // console.log(res);
                if (res.data.users.img) {
                    setimage(true)
                    setimg1(res.data.users.img)
                }
                else {
                    setimage(false)
                }

            })
            .catch((err) => {
                console.log(err);
            })

    });


    return (
        <div>

            <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    User Updated
                </Alert>
            </Snackbar>


            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >

                        </Typography>

                        <Typography style={{ fontSize: "20px", color: "black", font: "Bold", textAlign: "center" }}> </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >

                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            style={{ textAlign: "center" }}
                        >
                            AM Social Feed
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        </Box>


                        <Box sx={{ flexGrow: 0 }}>
                            {/* <Tooltip title="Open settings"> */}
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {/* Header avtar */}

                                {
                                    image ? <Avatar alt={`${avtarName}`} src={`http://localhost:8080/${img1}`} /> :
                                        <Avatar> {avtarName} </Avatar >}

                            </IconButton>
                            {/* </Tooltip> */}
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))} */}
                                <MenuItem key={0} onClick={() => { handleCloseUserMenu(); navigate('/Edit') }}>
                                    <Typography textAlign="center"  >{settings[0]}</Typography>
                                </MenuItem>

                                <MenuItem key={1} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={() => handleOpen()} >{settings[1]}</Typography>
                                </MenuItem>

                                <MenuItem key={2} onClick={() => { handleCloseUserMenu(); navigate('/'); localStorage.clear() }}>
                                    <Typography textAlign="center"   >{settings[2]}</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>
                        <Typography >
                            {fullname}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ border: "none" }}>

                    <button style={{ float: "right", border: "none", marginBottom: "20px" }} onClick={() => handleClose()}>X</button>
                    <TextField
                        error={false}
                        type='password'
                        id="outlined-error"
                        label="Password"
                        placeholder='Current Password'
                        value={password1.password}
                        onChange={(e) => { setpassword1({ ...password1, password: e.target.value }); setErrorMessage("") }}
                        fullWidth
                        required
                        sx={{ marginBottom: "20px" }}
                    />

                    <TextField
                        error={false}
                        type='password'
                        id="outlined-error"
                        label=" New Password"
                        placeholder=' Enter New Password'
                        value={password1.newpassword}
                        onChange={(e) => { setpassword1({ ...password1, newpassword: e.target.value }); setErrorMessage("") }}
                        fullWidth
                        required
                        sx={{ marginBottom: "20px" }}
                    />
                    <TextField
                        error={false}
                        type='password'
                        id="outlined-error"
                        label=" confirm New Password"
                        placeholder='Enter New Password'
                        value={confirmpassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setErrorMessage("") }}
                        fullWidth
                        required
                        sx={{ marginBottom: "20px" }}
                    />
                    {/* {(password1.newpassword === confirmpassword) ? setpassMatch(true) : ""} */}


                    {/* <Grid item xs={12} sm={12} sx={{ marginTop: "10px", marginBottom: "20px" }}>
                        {errorMessage && <div className="error" style={{ color: "red" }}> {errorMessage} </div>}
                    </Grid> */}

                    <Grid item xs={12} sm={6}>
                        <Button type='submit' variant='contained' color='primary' sx={{ float: "center", marginTop: "20px" }} onClick={() => handleChange()}>Change password</Button>
                    </Grid>

                </Box>
            </Modal>
        </div>
    )
}

export default Header