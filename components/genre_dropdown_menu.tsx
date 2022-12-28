import { useEffect, useState } from 'react'
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from '../styles/components/GenreDropdownMenu.module.css'

interface GenreContainerProps {
    onOpen: Function,
    onSelectChange: Function,
    
}

const GenreContainer = ({onOpen, onSelectChange}: GenreContainerProps) => {
    const [open, setOpen] = useState(false);
    const [genresArr, setGenresArr] = useState([
        {
            genre: 'Action',
            toggle: false,
        },
        {
            genre: 'Adventure',
            toggle: false,
        },
        {
            genre: 'Comedy',
            toggle: false,
        },
        {
            genre: 'Fantasy',
            toggle: false,
        },
        {
            genre: 'Harem',
            toggle: false,
        },                     
        {
            genre: 'Romance',
            toggle: false,
        },
        {
            genre: 'Slice of Life',
            toggle: false,
        },
        {
            genre: 'Sports',
            toggle: false,
        },
        {
            genre: 'Thriller',
            toggle: false,
        },                     
    ]);

    const toggleOpen = () => {
        setOpen(!open);
        onOpen(open);
    }

    const toggleList = (index:number) => {
        let newGenresArr = [...genresArr];
        newGenresArr[index].toggle = !newGenresArr[index].toggle;
        setGenresArr(newGenresArr);
        onSelectChange(newGenresArr);
    }

    return (
        <div>
            <Paper
                onClick={toggleOpen}
                component="form"
                elevation={0}
                className={styles.genre_input_container}
                > 
                <InputBase 
                    sx={{ "& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: "#363636",}}}
                    className={styles.input_base}
                    placeholder="Genres"
                    disabled={true}
                    inputProps={{ 'aria-label': 'Search Genre' }}
                    />
                    <Divider className={styles.divider} orientation="vertical" />
                    <ChangeHistoryIcon className={styles.icon_color} sx={{transform: open ? '' : 'rotate(180deg)',}}/>
            </Paper>
            <div className={styles.filler} style={{height: open ? '4px' : '0px'}}/>
            <Paper
                elevation={0}
                className={styles.dropdown_container}
                style={{ transition: 'height .2s ease-in-out' }}
                sx={{height: open ? '150px' : '0px'}}
                >
                {genresArr.map((e, index) => {
                    return (
                        <div key={e.genre + index}>
                            <div className={styles.list_container} onClick={() => {toggleList(index)}}>
                                <p className={styles.list_item}>{e.genre}</p>
                                <div className={styles.checkcircle_container}>
                                    <CheckCircleIcon className={styles.checkcircle_color} sx={{opacity: e.toggle ? '1.0' : '0.5'}}/>
                                </div>
                            </div>
                            <Divider />
                        </div>
                    )
                })}
            </Paper>
            </div>
    )
}

export default GenreContainer;