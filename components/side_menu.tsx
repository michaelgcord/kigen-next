import { useEffect, useState } from 'react';
import Desktop from '../components/desktop';
import GenreDropdownMenu from "../components/genre_dropdown_menu";
import ButtonBase from '@mui/material/ButtonBase';
import styles from '../styles/components/SideMenu.module.css'

interface SideMenuProps {
    onGenerate: Function,
}

const SideMenu = ({onGenerate}:SideMenuProps) => {
    const [height, setHeight] = useState('104px');
    const [genresArr, setGenresArr] = useState([]);

    const handleOpen = (e:any) => {
        if (e) {
            setHeight('104px');
        } else {
            setHeight('256px');
        }
    }

    const handleSelectChange = (e:any) => {
        setGenresArr(e);
    }

    const generate = () => {
        let genres: Array<string> = [];
        genresArr.forEach((value) => {
            if (value['toggle']) {genres.push(value['genre'])}
        })
        onGenerate(genres);
    }

    return (
        <Desktop>
        <div>
            <div style={{ height: height }} className={styles.sidemenu_container} >
                <div className={styles.dropdown_container}>
                    <GenreDropdownMenu onOpen={handleOpen} onSelectChange={handleSelectChange}/>
                </div>
                <div className={styles.button_container}>
                    <ButtonBase 
                        style={{
                            fontSize: '1rem',
                            padding: '8px 0',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            color: '#958e97',
                            width: '100%',
                        }}
                        className={styles.button_base } 
                        onClick={generate}>
                            Generate
                    </ButtonBase>
                </div>                
            </div>
        </div>
        </Desktop>
    )
}

export default SideMenu;