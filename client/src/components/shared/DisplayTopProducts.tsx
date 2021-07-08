import React from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Button, CardActions, makeStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import macbook from '../../images/macbook.png';
import chair from '../../images/chair.png';
import grocery from '../../images/grocery.png';

const useStyles = makeStyles((theme) => ({
    section: {
        width: '100%',
        margin: '50px 0'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
}));

const DisplayTopProducts = () => {
    const classes = useStyles();

    return (
        <section className={classes.section}>
            <Typography variant="h4" align="center" gutterBottom={true}>Most Exclusive Decor</Typography>
            <Grid container spacing={3}>
                <Grid item md={4} sm={6} xs={12}>
                    <Card>
                        <CardMedia image={macbook} className={classes.media} title="Product"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                MacBook Pro 16-inch
                            </Typography>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant="h6">$1499</Typography>
                                <Rating readOnly defaultValue={3.5} precision={0.5}/>
                            </div>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, eveniet in excepturi aspernatur quo, itaque quidem hic illo sapiente quos error beatae magnam a doloremque enim dolorum doloribus nobis sint?
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color="primary" variant="contained">Add to cart</Button>
                            <Button color="primary">View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Card>
                        <CardMedia image={grocery} className={classes.media} title="Product"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                MacBook Pro 16-inch
                            </Typography>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant="h6">$1499</Typography>
                                <Rating readOnly defaultValue={3.5} precision={0.5}/>
                            </div>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, eveniet in excepturi aspernatur quo, itaque quidem hic illo sapiente quos error beatae magnam a doloremque enim dolorum doloribus nobis sint?
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color="primary" variant="contained">Add to cart</Button>
                            <Button color="primary">View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Card>
                        <CardMedia image={chair} className={classes.media} title="Product"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                MacBook Pro 16-inch
                            </Typography>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Typography variant="h6">$1499</Typography>
                                <Rating readOnly defaultValue={3.5} precision={0.5}/>
                            </div>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, eveniet in excepturi aspernatur quo, itaque quidem hic illo sapiente quos error beatae magnam a doloremque enim dolorum doloribus nobis sint?
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color="primary" variant="contained">Add to cart</Button>
                            <Button color="primary">View More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </section>
    )
}

export default DisplayTopProducts
