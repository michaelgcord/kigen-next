import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import NavigationBar from "../components/navigation_bar";
import SideMenu from "../components/side_menu";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Link from 'next/link';
import styles from '../styles/pages/Home.module.css';

const Home = ({data}:any) => {
    const router = useRouter();
    const [animeList, setAnimeList] = useState(data);
    const handleGenerate = (data:any) => {
        let genres = '';
        data.forEach((element:string) => {genres += 'genres=' + element + '&'})
        genres = genres.slice(0, -1); 
        router.push('/home?' + genres)
    }
    
    useEffect(() => {
        setAnimeList(data);
    }, [data])

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
            <NavigationBar onGenerate={handleGenerate}/>
            <SideMenu onGenerate={handleGenerate}/>
            <ImageContent imageList={animeList}/>
        </div>
    )
}

export default Home;

const ImageContent = ({imageList}:any) => {
    const [isDesktop, setIsDesktop] = useState(false);
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'});
    const isTablet = useMediaQuery({query: '(min-width: 769px)'});
    const [showPreview, setShowPreview] = useState(Array(imageList.length).fill(false));
    const empty = Array(imageList.length).fill(false);

    const handleEnter = (index:any) => {
        const newPreview = [...empty];
        newPreview[index] = true;
        setShowPreview(newPreview);
    }

    const handleLeave = () => {
        setShowPreview([...empty]);
    }

    useEffect(() => {
        setIsDesktop(isDesktopOrLaptop);
    }, [isDesktopOrLaptop])

    return (
        <div className={styles.imagelist_container}>
            <ImageList
                style={{ padding: '8px' }}
                className={styles.imagelist}
                sx={{ width: isDesktop ? '50%' : isTablet ? '75%' : '100%' }} 
                cols={isDesktop ? 4 : isTablet ? 3 : 2}
                gap={8}
                >
                {imageList.map((item:any, index:number) => (
                    <ImageListItem 
                        key={item['id']}
                        onMouseOver={() => handleEnter(index)}
                        onMouseOut={() => handleLeave()}                        
                        >
                        <img
                            className={styles.item_fade}
                            src={item['attributes']['posterImage']['small']}
                            alt={'title'}
                            loading="lazy"
                            />
                        {showPreview[index] && 
                            <Link 
                                className={styles.item_hover_container}
                                href={"anime/" + item['attributes']['slug']}
                            >
                                <div className={styles.item_text_color} >
                                    {item['attributes']['canonicalTitle']}
                                </div>
                            </Link>
                        }
                    </ImageListItem>
                ))}
            </ImageList>            
        </div>        
    )   
}

const getRandomAnime = async (query:any) => {
    let genres = "/anime?filter[categories]="
    if (typeof query === 'string') {
        genres += query;
    }
    else {
        query.forEach((element:string) => {genres += element + ',' })
    }
    const res = await fetch(`https://kitsu.io/api/edge` + genres + '&page[limit]=20&sort=-userCount');
    let data = await res.json();
    const count = data['meta']['count'];
    const numOffsets = Math.floor(count / 20);
    const offset = Math.floor(Math.random() * (numOffsets / 2));

    const random = Math.floor(Math.random() * 2);
    const sort = random ? 'userCount' : 'averageRating';

    const res_2 = await fetch(`https://kitsu.io/api/edge` + genres + '&page[limit]=20&sort=-' + sort + '&page[offset]=' + offset );
    let data_2 = await res_2.json();
    data_2 = data_2['data'];
    return data_2;
}

const getTrendingAnime = async () => {
    const res = await fetch(`https://kitsu.io/api/edge/trending/anime?limit=20data`);
    let data = await res.json();
    data = data['data'];
    return data;
}

const getSearchAnime = async (query:any) => {
    const res = await fetch('https://kitsu.io/api/edge/anime?filter[text]=' + query + '&page[limit]=20');
    let data = await res.json();
    data = data['data'];
    return data;
}

export const getServerSideProps = async (context:any) => {
    const query = context.query;
    let data;

    if (!query.genres && !query.search) {
        data = await getTrendingAnime();
    }

    if (query.genres) {
        data = await getRandomAnime(query.genres);
    }

    if (query.search) {
        data = await getSearchAnime(query.search);
    }
    return { props: { data } }    
}