import { Button, Container, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin } from 'react-google-login';

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Login() {
    const [open, setOpen] = React.useState(false);
    const [status, setstatus] = useState("");
    const [message, setmessage] = useState("")

    const [user, setuser] = useState({
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = React.useState("");
    const [data, setdata] = useState("")
    // const [lcdata, setlcdata] = useState(JSON.parse(localStorage.getItem("data")))
    // console.log(lcdata);
    const navigate = useNavigate();

    useEffect(() => {
        const lcdata = JSON.parse(localStorage.getItem("data")) || ""
        if (lcdata.token !== null && lcdata !== "") {
            console.log(lcdata.token);
            navigate('/Feed')
        }

    }, [])


    const responseGoogle = async (res) => {
        //localhost:8080/login/google-login
        const payload = {
            "email": res.Lu.Bv
        }

        console.log(res.Lu.Bv);
        await axios(`http://localhost:8080/login/google-login`,
            {
                method: "POST",
                data: payload,
            })
            .then((res) => {
                if (res.status) {
                    console.log(res.data);
                    setdata(res.data)
                    handleClick();
                    localStorage.setItem("data", JSON.stringify(res.data))
                    setTimeout(() => {
                        navigate('/Feed')

                    }, 1000);
                    setstatus("");
                    setmessage(res.data.message)
                }
            })
            .catch((err) => {
                setstatus("error");
                setmessage(err.response.data.message)
                setOpen(true);
            })
    }

    const handleLogin = async () => {
        let payload = user
        await axios(`http://localhost:8080/login`, {
            method: "POST",
            data: payload,
        })
            .then((res) => {
                if (res.status) {
                    setdata(res.data)
                    // alert(res.data.message);
                    // console.log(res);
                    handleClick();
                    localStorage.setItem("data", JSON.stringify(res.data))

                    setTimeout(() => {
                        navigate('/Feed')

                    }, 1000);
                    setstatus("");
                    setmessage(res.data.message)
                }
            })
            .catch((err) => {
                // alert(err.response.data.message);
                // setErrorMessage(err.response.data.message)
                setstatus("error");
                setmessage(err.response.data.message)
                setOpen(true);
            })
    }

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={700} onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >

                <Alert onClose={handleClose} severity={status === "error" ? "error" : "success"} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>

            <Container width="100vh" sx={{ textAlign: "center" }}>

                <Grid
                    container
                    xs={12}
                    component="main"
                    sx={{ width: "70vh", marginLeft: "auto", marginRight: "auto", border: "1px solid black" }}
                >

                    <Grid item xs={12} style={{ marginBottom: "50px" }} >
                        <label style={{ fontSize: "40px", alignItems: "center" }} >Login</label>
                    </Grid>

                    <Grid item xs={9} style={{ paddingLeft: "0px", marginTop: "0px", marginLeft: "60px" }}>
                        <TextField
                            error={false}
                            type='text'
                            id="outlined-error"
                            label="Email"
                            placeholder='Enter Email'
                            value={user.email}
                            onChange={(e) => { setuser({ ...user, email: e.target.value }); setErrorMessage("") }}
                            fullWidth
                            required
                            sx={{ marginBottom: "20px" }}

                        />
                    </Grid>

                    <Grid item xs={9} style={{ paddingLeft: "0px", marginTop: "0px", marginLeft: "60px" }}>
                        <TextField
                            error={false}
                            type='password'
                            id="outlined-error"
                            label="Password"
                            placeholder='Enter Password'
                            value={user.password}
                            onChange={(e) => { setuser({ ...user, password: e.target.value }); setErrorMessage("") }}
                            fullWidth
                            required
                            sx={{ marginBottom: "20px" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} sx={{ marginTop: "10px", marginBottom: "20px" }}>
                        {errorMessage && <div className="error" style={{ color: "red" }}> {errorMessage} </div>}
                    </Grid>


                    <Grid item xs={12} sm={12} sx={{ marginTop: "30px" }}>
                        <Button type='submit' variant='contained' color='primary' sx={{ marginLeft: "auto", marginRight: "auto" }} onClick={() => { handleLogin() }} >Login </Button>
                    </Grid>
                    {/* <Grid item xs={12} style={{ marginBottom: "50px" }} >
                        <label style={{ fontSize: "20px", alignItems: "center" }} >Does not have a account</label>
                    </Grid> */}
                    {/* <Grid item xs={12} sm={12} sx={{ marginTop: "30px" }}>
                        <Button type='submit' variant='contained' color='primary' sx={{ marginLeft: "auto", marginRight: "auto", marginBottom: "10px" }} onClick={() => navigate('/signup')} >Sign up </Button>
                    </Grid> */}

                    <Grid item xs={12} sm={12} sx={{ marginTop: "30px" }}>
                        <label> does not have a acount ? <a href='' onClick={() => navigate('/signup')}>sign up</a></label>
                    </Grid>



                    {/* <button style={{ fontSize: "20px", marginBottom: "30px", marginLeft: "auto", marginRight: "auto" }}> <GoogleIcon /> Login with Google</button> */}
                    <Grid item xs={12} sm={12} sx={{ marginTop: "10px", marginBottom: "20px" }}>
                        <GoogleLogin
                            clientId="85092170565-0jqeuldra1nj5rt4999rhh4snpnn62dl.apps.googleusercontent.com"
                            buttonText="Login With Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            style={{ marginBottom: "30px", marginLeft: "auto", marginRight: "auto" }}
                        />
                    </Grid>

                </Grid>

            </Container>

        </div>
    )
}

export default Login