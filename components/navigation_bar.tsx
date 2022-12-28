import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Desktop from '../components/desktop';
import Mobile from '../components/mobile';
import Image from 'next/image'
import Menu from '../components/menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import GenreDropdownMenu from './genre_dropdown_menu';
import styles from '../styles/components/NavigationBar.module.css'

interface NavigationBarProps {
    onGenerate: Function,
}

const NavigationBar = ({onGenerate}:NavigationBarProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [genreHeight, setGenreHeight] = useState('116px');
    const [genresArr, setGenresArr] = useState([]);
    const [searchText, setSearchText] = useState('');

    const handleOpen = (e:any) => {
        if (e) {
            setGenreHeight('116px');
        } else {
            setGenreHeight('270px');
        }        
    }

    const handleSelectChange = (e:any) => {
        setGenresArr(e);
    }

    const generate = () => {
        let genres: Array<string> = [];
        genresArr.forEach((value:any) => {
            if (value['toggle']) {genres.push(value['genre'])}
        })
        onGenerate(genres);
    }

    const handleSearchChange = (event:any) => {
        setSearchText(event.target.value);
    }

    const handleKeyDown = (event:any) => {
        if (event.key == 'Enter') {
            event.preventDefault();
            router.push({
                pathname: '/home',
                query: { search: searchText },
            })
        }
    }

    const handleHome = () => {
        router.push('/home');
    }

    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <div>
        <div className={styles.fixed_position}> 
            <div className={styles.nav_container}>
                <Paper component="form" elevation={0} className={styles.search_bar_container}> 
                    <SearchIcon className={styles.icon_color}/>
                    <InputBase
                        className={styles.search_bar_base}
                        placeholder="Search Kigen"
                        inputProps={{ 'aria-label': 'Search Kigen' }}
                        onKeyDown={(event) => handleKeyDown(event)}
                        onChange={(event) => handleSearchChange(event)}
                    />
                </Paper>
                <Mobile>
                    <div className={styles.menu_container} onClick={toggleOpen}>
                        <Menu />            
                    </div>            
                </Mobile>
                <div className={styles.logo_container} onClick={handleHome}>
                    <Image src="/kigenlogo.svg" alt="Kigen Logo" width={30} height={30} />
                    <Desktop>
                        <div className={styles.logo_text}>KIGEN</div>
                    </Desktop>
                </div>
            </div>
            <Mobile>
                <div style ={{height: open ? genreHeight : '0px'}} className={styles.menu_dropdown}>
                    <div className={styles.genre_menu}>
                        <GenreDropdownMenu onOpen={handleOpen} onSelectChange={handleSelectChange}/>
                    </div>
                    <div className={styles.button_container}>
                        <ButtonBase className={styles.button_base } onClick={generate}>Generate</ButtonBase>
                    </div>
                </div>
            </Mobile>
        </div>
        <Filler/>
        </div>
    )
}

export default NavigationBar;

const Filler = () => {
    return (
        <div className={styles.filler}/>
    )
}