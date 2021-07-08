import React, { useState, useEffect } from 'react';
import { TextField, Select, Typography, makeStyles, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';


const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    selectContainer: {
        marginLeft: theme.spacing(3),
    },
    sortSelect: {
        width: 150,
    },
    searchInput: {
        width: 250
    }
}));

type Props = {
    filterMethod: string | undefined;
};

const Filters = (props: Props) => {

    const classes = useStyles();
    const [sort, setSort] = useState<string>('none');
    const [filter, setFilter] = useState<string>('all');
    const dispatch = useDispatch<AppDispatch>();

    const handleSortChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        setSort(event.target.value as string);
    };

    const handleSearchItems = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            search: { value: string };
        };
        const query = target.search.value;
        console.log(query)
    };

    useEffect(() => {
        if(props.filterMethod) setFilter(props.filterMethod);
    }, [props.filterMethod]);

    useEffect(() => {
        console.log(sort);
    }, [sort]);

    useEffect(() => {
        console.log(filter);
    }, [filter]);

    return (
        <div>
            <Typography variant="h4" component="h2" align="center">Products</Typography>
            <FormControl className={classes.container}>
                <form onSubmit={handleSearchItems}>
                    <TextField name="search" id="search" label="Search" className={classes.searchInput}/>
                </form>
                <FormControl className={classes.selectContainer}>
                    <InputLabel id="sort-by-label">Filter</InputLabel>
                    <Select value={filter} onChange={handleSortChange} labelId="sort-by-label" className={classes.sortSelect}>
                        <MenuItem value="all">All Items</MenuItem>
                        <MenuItem value="home">Home Decor</MenuItem>
                        <MenuItem value="electronics">Electronics</MenuItem>
                        <MenuItem value="grocery">Grocery</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.selectContainer}>
                    <InputLabel id="sort-by-label">Sort By</InputLabel>
                    <Select value={sort} onChange={handleSortChange} labelId="sort-by-label" className={classes.sortSelect}>
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="popularity">Popularity</MenuItem>
                    </Select>
                </FormControl>
            </FormControl>
        </div>
    )
};

export default Filters;
