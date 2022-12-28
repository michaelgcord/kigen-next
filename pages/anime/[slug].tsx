import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NavigationBar from "../../components/navigation_bar";
import SideMenu from '../../components/side_menu';
import Divider from '@mui/material/Divider';
import styles from '../../styles/pages/[slug].module.css';

const Anime = ({attributes, genres, studio}:any) => {
    const router = useRouter();
    const imageNotFound = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png';
    const coverImage = (attributes['coverImage']) ? attributes['coverImage']['original'] : imageNotFound;
    const synopsis = attributes['synopsis'];
    const title = attributes['canonicalTitle'];

    const details = [
        {
            name: 'Type',
            value: attributes['showType'] || 'N/A'
        },
        {
            name: 'Age Rating',
            value: attributes['ageRating'] || 'N/A'
        },
        {
            name: 'Users',
            value: attributes['userCount'] || 'N/A'
        },
        {
            name: 'Rating',
            value: attributes['averageRating'] || 'N/A'
        },
        {
            name: 'Rank',
            value: attributes['popularityRank'] || 'N/A'
        },
        {
            name: 'Studio',
            value: studio
        }
    ]

    const handleGenerate = (e:any) => {
        router.push({
            pathname: '/home',
            query: { genres: e },
        }
        );
    }

    return (
        <div className={styles.slug_container}>
            <NavigationBar onGenerate={handleGenerate}/>
            <SideMenu onGenerate={handleGenerate}/>
            <MainContent title={title} coverImage={coverImage} synopsis={synopsis} />
            <AnimeDetails details={details} genres={genres} />
        </div>
    )
}

const MainContent = ({title, coverImage, synopsis}:any) => {
    return (
        <div className={styles.content_container}>
            <div className={styles.title}>{title}</div>
            <Divider className={styles.divider_color}/>
            <div  className={styles.cover_image} style={{ backgroundImage: `url(${coverImage})`}}/>
            <div className={styles.header}>Synopsis</div>
            <div className={styles.synopsis}>{synopsis}</div>
        </div>        
    )    
}

const AnimeDetails = ({details, genres}:any) => {
    return (
        <div className={styles.content_container}>
            <div className={styles.header}>Anime Details</div>
            <Divider className={styles.divider_color}/>
            {details.map((item:any) => {
                return (
                    <Detail key={item.name} name={item.name} value={item.value} />
                )
            })}
            <div className={styles.detail_container}>
                {genres.map((item:any) => {
                    return (
                        <div key={item['id']} className={styles.detail_item}>
                            {item['attributes']['name']}
                        </div>
                    )
                })}
            </div>
        </div>        
    )
}

const Detail = ({name, value}:any) => {
    return (
        <div style={{
            display: 'flex',
            margin: '8px 0',
        }}>
            <div style={{ width: '40%', fontWeight: '500' }}>{name}</div>
            <div>{value}</div>
        </div>       
    )
}

export default Anime;

export const getServerSideProps = async (context:any) => {
    const slug = context.params.slug;
    const res = await fetch("https://kitsu.io/api/edge/anime?filter[text]=" + slug + "&page[limit]=1");
    const data = await res.json();
    const attributes = data['data'][0]['attributes'];
    
    const genresUrl = data['data'][0]['relationships']['genres']['links']['related'];
    const res_2 = await fetch(genresUrl);
    const data_2 = await res_2.json();
    const genres = data_2['data'];

    const studioUrl = data['data'][0]['relationships']['animeProductions']['links']['related'];
    const res_3 = await fetch(studioUrl);
    const data_3 = await res_3.json();

    let studio = 'N/A';
    if (data_3['data'][0] != undefined) {
        const studioUrl_2 = data_3['data'][0]['relationships']['producer']['links']['related'];
        const res_4 = await fetch(studioUrl_2);
        const data_4 = await res_4.json();
        studio = data_4['data']['attributes']['name'];
    }

    return { 
        props: {
            attributes: attributes,
            genres: genres,
            studio: studio,
        }    
    }    
}