import React, { useEffect, SetStateAction, Dispatch, useState } from 'react';
import { TextField, Select, Typography, makeStyles, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';


const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    selectContainer: {
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
            marginTop: theme.spacing(2),
        }
    },
    sortSelect: {
        width: 150,
        [theme.breakpoints.down('xs')]: {
            width: 250,
        }
    },
    searchInput: {
        width: 250,
        
    }
}));

type Props = {
    sortState: string;
    filterState: string;
    sortStateFunction: Dispatch<SetStateAction<string>>;
    filterStateFunction: Dispatch<SetStateAction<string>>;

    queryState: string;
    queryStateFunction: Dispatch<SetStateAction<string>>;
};

const Filters = (props: Props) => {

    const classes = useStyles();
    const [sort, setSort] = [props.sortState, props.sortStateFunction];
    const [filter, setFilter] = [props.filterState, props.filterStateFunction];
    const [query, setQuery] = [props.queryState, props.queryStateFunction];
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const filterParams = params.get('filter');
    
    useEffect(() => {
        if(filterParams === null) return;
        setFilter(filterParams);
    }, [filterParams, setFilter]);

    const handleSortChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        setSort(event.target.value as string);
    };

    const handleFilterChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilter(event.target.value as string);
    };

    return (
        <div>
            <Typography variant="h4" component="h2" align="center">Products</Typography>
            <FormControl className={classes.container}>
                <TextField name="search" id="search" label="Search" className={classes.searchInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}/>
                <FormControl className={classes.selectContainer}>
                    <InputLabel id="sort-by-label">Filter</InputLabel>
                    <Select value={filter} onChange={handleFilterChange} labelId="sort-by-label" className={classes.sortSelect}>
                        <MenuItem value="all">All Items</MenuItem>
                        <MenuItem value="homeDecor">Home Decor</MenuItem>
                        <MenuItem value="electronics">Electronics</MenuItem>
                        <MenuItem value="grocery">Grocery</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.selectContainer}>
                    <InputLabel id="sort-by-label">Sort By</InputLabel>
                    <Select value={sort} onChange={handleSortChange} labelId="sort-by-label" className={classes.sortSelect}>
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="alpha">A-Z</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="popularity">Popularity</MenuItem>
                    </Select>
                </FormControl>
            </FormControl>
        </div>
    )
};

export default Filters;
