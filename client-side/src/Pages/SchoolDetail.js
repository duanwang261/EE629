import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    makeStyles, Card, CardContent, CardMedia, Typography, CardHeader, Button, Chip} from '@material-ui/core';
import '../App.css';
import axios from 'axios';

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
    },
    lix: {
        color: '#000'
    },
    secondary_container: {
        textAlign: 'justify'
    },
    secondary_title: {
        fontWeight: 'bold',
        color: '#000'
    },
    followButton: {
        float: 'right',
        marginLeft:'5px'
    },
    leftButton:{
        float: 'left',
        marginLeft:'5px'
    },
    tags:{
        marginRight: '3px'
    }
});

const SchoolDetail = (props) => {
    const [postData, setPostData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        console.log('useEffect fired item');
        async function fetchData() {
            try {
                let id = props.match.params.id;
                let { data } = await axios.get(`http://localhost:3008/schooldetail/${id}`);
                setPostData(data);
                console.log(postData);
                setLoading(false);
            } catch (e) {
                setNotFound(true);
                setLoading(false);
                console.log(e);
            }
        }
        fetchData();
    }, [props.match.params.id]);

    if (loading) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    } else if (notFound) {
        return (
            <div>
                <h2>404: post not found</h2>
            </div>
        );
    } else {
        return (
            <Card className={classes.card} variant="outlined">
                <CardHeader className={classes.titleHead} title={postData.schoolname} />
                
                <CardContent>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Address: {postData.address}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Total Students:</label>{postData.totalStudentsCount}
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Graduate Students: {postData.graduateStudentsCount}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Undergraduate Students: {postData.undergraduateStudentsCount}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Student Male Fraction: {postData.undergraduateGenderMaleFraction}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Students Female Fraction: {postData.undergraduateGenderFemaleFraction}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Undergraduate Race White Fraction: {postData.undergraduateRaceWhiteFraction}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Undergraduate Race Asian Fraction: {postData.undergraduateRaceAsianFraction}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Undergraduate Race Black Fraction: {postData.undergraduateRaceBlackFraction}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Undergraduate Race Hispanic Fraction: {postData.undergraduateRaceHispanicFraction}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Undergraduate Race Other Fraction: {postData.undergraduateRaceOtherFraction}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Undergraduate Race Nonresident Alien Fraction: {postData.undergraduateRaceNonresidentAlienFraction}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Admitted SAT 25 Percentile: {postData.admittedSAT25Percentile}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Admitted SAT 50 Percentile: {postData.admittedSAT50Percentile}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Admitted SAT 75 Percentile: {postData.admittedSAT75Percentile}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Admitted ACT Combined 25 Percentile: {postData.admittedACTCombined25Percentile}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Admitted ACT Combined 50 Percentile: {postData.admittedACTCombined50Percentile}</label>
                    </Typography>
                    <Typography className={classes.secondary_container}>
                        <label className={classes.secondary_title}>Admitted ACT Combined 75 Percentile: {postData.addreadmittedACTCombined75Percentiless}</label>
                    </Typography>

                </CardContent>
            </Card>
        );
    }



}

export default SchoolDetail;