import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, InputLabel, FormControl, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
// import HomeTypeListButton from './HomeTypeListButton';
import '../App.css';
import Search from './Search';

const useStyles = makeStyles({ 
    card: {
        maxWidth: 550,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    titleHead: {
        borderBottom: '1px solid #1e8678',
        fontWeight: 'bold'
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    media: {
        height: '100%',
        width: '100%'
    },
    button: {
        color: '#1e8678',
        fontWeight: 'bold',
        fontSize: 12
    }
});

const Home = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState(undefined);
    let card = null;
    let error = null;
    // let termSearch = null;

    useEffect(() => {
        console.log('homepage useEffect fired');
        async function fetchData() {
            try {
                
                // const data = await axios.get('http://localhost:3008/schools');
                const { data } = await axios.get('http://localhost:3008/schools',
                { headers: { Accept: 'application/json' } });
                console.log(data);
                setPostData(data);
                console.log(postData);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []
    );

    useEffect(() => {
        console.log('search useEffect fired');
        async function fetchData() {
            try {
                console.log(`in fetch searchTerm: ${searchTerm}`);
                const { data } = await axios.get(
                    `http://localhost:3008/search/${searchTerm}`
                );
                setSearchData(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        if (searchTerm) {
            console.log('searchTerm is set');
            fetchData();
        }
    }, [searchTerm]);


    const searchValue = async (value) => {
        setSearchTerm(value);
    };

    const bulidCard = (post) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={post._id}>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                        <Link to={`/school/${post._id}`}>
                            <CardContent>
                            <Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
                                    {post.schoolname}
                                </Typography>
                                <Typography variant='body3' color='textSecondary' component='p'>
                                    address: {post.address}
                                </Typography>
                                <Typography variant='body3' color='textSecondary' component='p'>
                                    UNITID: {post.UNITID}
                                </Typography>
                            </CardContent>
                            </Link>

                    </CardActionArea>
                </Card>
            </Grid>
        );
    };

    if (searchTerm) {
        card =
            searchData &&
            searchData.map((show) => {
                return bulidCard(show);
            });
    } else {
        card =
            postData &&
            postData.map((post) => {
                return bulidCard(post);
            })
    }
    

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        )
    } else {
        return (
            <div>
                {<Search searchValue={searchValue} />}
                <br />
            
                <br />
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div >
        )
    }

};

export default Home;