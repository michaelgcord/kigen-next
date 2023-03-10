import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from '../styles/pages/Login.module.css'

const Login = () => {
    const router = useRouter();
    const responsive = {
        desktop: {
          breakpoint: { max: 4000, min: 1024 },
          slidesToSlide: 5,
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          slidesToSlide: 3,
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          slidesToSlide: 1,
          items: 1
        }
      };

    const explore = () => {
        router.push("home")
    }

    return (
        <Box className={styles.container}>
            <Head>
                <title>Kigen | Random Anime Generator</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/kigenlogo.ico" />
            </Head>

            <Box className={styles.top_bg}>
                    <Box className={styles.logo_container}>
                        <Image src="/kigenlogo.svg" alt="Kigen Logo" width={260} height={260} />
                        <div>
                            <p className={styles.title_1} >KIGEN</p>
                            <p className={styles.title_2} >Random Anime Generator</p>
                        </div>
                    </Box>
                    <Button 
                        // className={styles.button}
                        style={{
                          marginTop: '45px',
                          backgroundColor: '#bd0029',
                        }}
                        onClick={explore}
                        size="large" 
                        variant="contained">
                            Explore
                    </Button>
            </Box>

            <Box className={styles.bottom_bg}>
                <p className={styles.text_1}>Find new anime to watch here</p>
                <div className={styles.carousel_container}>
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                    >
                        <Image src="/images/bocchi.jpeg" alt="bocchi" width={144} height={201} />
                        <Image src="/images/chainsawman.jpeg" alt="chainsawman" width={144} height={201} />
                        <Image src="/images/blackclover.jpeg" alt="black clover" width={144} height={201} />
                        <Image src="/images/bluelock.jpeg" alt="bluelock" width={144} height={201} />
                        <Image src="/images/haikyuu.jpeg" alt="haikyuu" width={144} height={201} />
                        <Image src="/images/bleach.jpeg" alt="bleach" width={144} height={201} />
                        <Image src="/images/demonslayer.jpeg" alt="demonslayer" width={144} height={201} />
                        <Image src="/images/jjk.jpeg" alt="jjk" width={144} height={201} />
                        <Image src="/images/konosuba.jpeg" alt="konosuba" width={144} height={201} />
                        <Image src="/images/onepiece.jpg" alt="onepiece" width={144} height={201} />
                    </Carousel>;
                </div>
            </Box>
        </Box>
    )
}

export default Login;