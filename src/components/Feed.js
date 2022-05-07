import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from "./Header"
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Button, FormControl, FormLabel, Grid, Input, Stack, TextareaAutosize } from '@mui/material';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
import Skel from "./Skel"

// expand
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
// avatar
function fun(username) {

    if (username !== "undefined") {
        let firstname = username.split(' ')[0];
        firstname = firstname[0].toUpperCase();
        let lastname = username.split(' ')[1];
        lastname = lastname[0].toUpperCase();
        const NAME = firstname + "" + lastname
        return NAME
    }
    else
        return "NO"
}
function Feed() {
    const [expanded, setExpanded] = React.useState(false);
    const [data, setdata] = useState(JSON.parse(localStorage.getItem("data")));
    const [data1, setdata1] = useState(JSON.parse(localStorage.getItem("data")));
    const [colorlike, setcolorlike] = React.useState(false);
    const [showcomment, setshowcomment] = React.useState(false);
    const [limit1, setlimit1] = React.useState(3);

    const Name = data1.currentUser.firstname + " " + data1.currentUser.lastname
    //for modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //for file
    const [file, setFile] = useState("");
    const [rowcomment, setrowcomment] = useState("")
    const [post, setpost] = useState([]);
    const [caption, setcaption] = useState("");
    const [image, setimage] = useState("")
    const [count, setcount] = useState(0)
    const [isloading, setisloading] = useState(false)
    // const { loading, items, hasNextPage, error, loadMore } = useLoadItems();
    const handleExpandClick = (id) => {
        setExpanded(id)
    };


    // fetch data infinity
    const fetchMoreData = () => {
        setTimeout(() => {
            setlimit1(prev => prev + 3)
            setcount(prev => prev + 1)

        }, 2000);

    }

    const commentposthandler = (id, rowcomment, name) => {
        if (rowcomment !== "") {
            const playlod = {
                "id": data._id,
                "comment": rowcomment,
                "commenter": name
            }
            axios(`http://localhost:8080/like/${id}`, {
                method: "PUT",
                data: (playlod),
                headers: {
                    "auth-token": data.token
                },
            })
                .then((res) => {
                    setcount(prev => prev + 1)
                })
                .catch((err) => { console.log(err) })
        }
        else
            alert("post not update")
        setrowcomment("")
    }
    function handleChange(e) {
        setimage(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    //for add post 
    // image 
    const handlepost = async () => {
        let formData = new FormData()
        formData.append('image', image);
        formData.append('caption', caption);
        formData.append('username', Name);
        axios(`http://localhost:8080/post `, {
            method: "POST",
            data: formData,
            headers: {
                "auth-token": data.token
            },
        })
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
            })
        setcount(prev => prev + 1)
    }
    // like handler
    const LikeHandler = (id) => {
        const playlod = {
            "id": data.currentUser._id
        }

        axios(`http://localhost:8080/like/${id}`, {
            method: "PUT",
            data: playlod,
            headers: {
                "auth-token": data.token
            },
        })
            .then((res) => {
                setcount(prev => prev + 1)
            })
            .catch((err) => { console.log(err) })
    }
    // use effect
    useEffect(() => {

        axios(`http://localhost:8080/?page=1&limit=${limit1}`, {
            method: "GET",
            headers: {
                "auth-token": data.token
            },
        })
            .then((res) => {
                setpost(res.data.post)
                setisloading(true);
            })
            .catch((err) => {
                console.log(err);
            })
        setTimeout(() => {

        }, 3000);

    }, [count])
    //
    const stk = () => {
        return <>
            <Card sx={{ maxWidth: 400, marginLeft: "35%", marginTop: "20px" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            <Skeleton variant="circular" width={40} height={40} />

                        </Avatar>
                    }

                    title={<Skeleton variant="text" />}
                />
                <Skeleton variant="rectangular" width={210} height={194} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <Skeleton variant="text" />
                    </Typography>
                </CardContent>


            </Card>
            <Card sx={{ maxWidth: 400, marginLeft: "35%", marginTop: "20px" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            <Skeleton variant="circular" width={40} height={40} />

                        </Avatar>
                    }

                    title={<Skeleton variant="text" />}
                />
                <Skeleton variant="rectangular" width={210} height={194} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <Skeleton variant="text" />
                    </Typography>
                </CardContent>


            </Card>
        </>


    }

    return (
        <div style={{ backgroundColor: "#518CDB" }}>
            <Header></Header>
            <Button type='submit' variant='contained' color='primary' sx={{ float: "right", margin: "5px 5px 0 0" }} onClick={handleOpen} >Add Post</Button>

            <InfiniteScroll
                dataLength={post.length}
                next={fetchMoreData}
                hasMore={true}
                loader={
                    stk()
                }
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div>

                    {post.length > 0 && post.map((posts) => {
                        return (
                            <div key={posts._id} style={{ marginTop: "20px" }}>
                                <Card sx={{ maxWidth: 400, marginLeft: "35%", border: "0.25px solid black" }}>
                                    <CardHeader sx={{ bgcolor: red[100] }}
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="photo" >
                                                {fun(`${posts.username}`)}
                                            </Avatar>
                                        }

                                        title={posts.username}

                                    />
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        width="200"
                                        image={`http://localhost:8080/${posts.img}`}
                                        alt="not found"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {posts.caption}
                                        </Typography>
                                    </CardContent>
                                    {/* { */}
                                    <CardActions disableSpacing>
                                        <Typography >
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon onClick={(e) => { setcolorlike(colorlike == posts.id); LikeHandler(posts._id) }}
                                                    style={{ color: (colorlike) ? "red" : "grey" }} />
                                            </IconButton>
                                            {posts.like.length}
                                        </Typography>
                                        <Typography>
                                            <IconButton aria-label="add to favorites">
                                                <CommentIcon style={{ marginLeft: "9" }}
                                                    expand={expanded}
                                                    onClick={() => { handleExpandClick(posts._id); setshowcomment(!showcomment) }}
                                                    aria-expanded={expanded}
                                                    aria-label="show more"
                                                />
                                            </IconButton>
                                            {posts.comment.length}
                                        </Typography>
                                        <ExpandMoreIcon onClick={() => setshowcomment(!showcomment)} />
                                    </CardActions>
                                    <Collapse in={showcomment ? expanded === posts._id : false} timeout="auto" unmountOnExit style={{ maxHeight: 200, overflow: 'auto' }}>
                                        <Typography ></Typography>
                                        <CardContent>
                                            <Typography >
                                                <TextField style={{ width: "315px" }} label="Comments" variant="standard" value={rowcomment}
                                                    onChange={(e) => setrowcomment(e.target.value)}
                                                />
                                                <SendIcon onClick={() => { commentposthandler(posts._id, rowcomment, Name) }} />
                                            </Typography >
                                            {posts.comment.length > 0 && posts.comment.map((ele, index) =>
                                                <Typography key={index} style={{ textAlign: "left", marginTop: "8px", marginLeft: "8px", display: 'flex' }}>

                                                    <Avatar sx={{ width: 24, height: 24, fontSize: 12, marginRight: 2, bgcolor: red[800] }}>
                                                        {fun(`${ele.commenter}`)}
                                                    </Avatar>
                                                    {ele.comment}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Collapse>
                                </Card>

                            </div>




                        )
                    }
                    )}

                </div>
            </InfiniteScroll>
            {/* modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid item xs={6}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid grey"
                        }}
                    >
                        <img src={file} alt="log" style={{ width: "50%", height: "50%" }} />
                    </Grid>
                    <Grid item sx={{ marginTop: "10px" }}>
                        <FormControl>
                            {/* <FormLabel>Change Profile Picture</FormLabel> */}
                            <Input type="file" label="Upload Profile Picture" onChange={handleChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={5}
                            placeholder="Add Caption"
                            style={{ width: "400px ", marginTop: "5px" }}
                            value={caption}
                            onChange={(e) => setcaption(e.target.value)}
                        />
                    </Grid>
                    <Button type='submit' variant='contained' color='primary' sx={{ float: "right", margin: "5px 5px 0 0" }} onClick={() => { handlepost(); handleClose() }} >Add Post</Button>
                </Box>
            </Modal>
        </div >

    )
}
export default Feed


         // <Card sx={{ maxWidth: 400, marginLeft: "35%", border: "0.25px solid black" }}>
                    //     <CardHeader
                    //         avatar={
                    //             <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    //                 <Skeleton variant="circular" width={40} height={40} />

                    //             </Avatar>
                    //         }

                    //         title="Shrimp and Chorizo Paella"
                    //     />
                    //     <CardMedia
                    //         component="img"
                    //         height="194"
                    //         image="/static/images/cards/paella.jpg"
                    //         alt="Paella dish"
                    //     />
                    //     <CardContent>
                    //         <Typography variant="body2" color="text.secondary">
                    //             This impressive paella is a perfect party dish and a fun meal to cook
                    //             together with your guests. Add 1 cup of frozen peas along with the mussels,
                    //             if you like.
                    //         </Typography>
                    //     </CardContent>


                    // </Card>
