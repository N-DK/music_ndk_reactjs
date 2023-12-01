import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Receptacle from '~/components/Receptacle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Loading from '~/components/Loading';
import axios from 'axios';
import ListSong from '~/components/ListSong';

const cx = classNames.bind(styles);

const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const banners = [
    {
        url: 'https://c4.wallpaperflare.com/wallpaper/765/477/132/vaporwave-glitch-art-women-closed-eyes-wallpaper-preview.jpg',
    },
    {
        url: 'https://c4.wallpaperflare.com/wallpaper/408/907/685/vaporwave-glitch-art-lockheed-sr-71-blackbird-wallpaper-preview.jpg',
    },
    {
        url: 'https://c4.wallpaperflare.com/wallpaper/706/529/203/vaporwave-plants-hd-wallpaper-preview.jpg',
    },
    {
        url: 'https://c4.wallpaperflare.com/wallpaper/236/889/317/vaporwave-statue-roman-greek-wallpaper-preview.jpg',
    },
];

function Home() {
    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const [chill, setChill] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8080/api/song')
            .then((res) => {
                setSongs(res.data.results);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8080/api/playlist/topic/chill')
            .then((res) => {
                setChill(res.data.results);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} pt-3`}>
                    <Slider className={`${cx('slider')} mb-5`} {...settings}>
                        {banners.map((banner, index) => (
                            <div key={index} className="pe-2 ps-2">
                                <div
                                    className={`${cx(
                                        '',
                                    )} rounded-3 overflow-hidden`}
                                >
                                    <a>
                                        <img
                                            src={banner.url}
                                            className="w-100 h-100"
                                        />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <div
                        className={`${cx(
                            'new-realeases__container',
                        )} rounded-4 p-3 mb-5`}
                    >
                        <div
                            className={`${cx(
                                '',
                            )} d-flex align-items-center justify-content-between f-family mb-2 pb-4 pt-2`}
                        >
                            <h4 className={`mb-0 f-family`}>New Realeases</h4>
                            <a
                                href="#"
                                className="f-family text--primary d-flex align-items-center text-decoration-none"
                            >
                                <span className="me-2">View more</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </a>
                        </div>
                        <div className={`${cx('')} row `}>
                            <div className="col-xl-6 col-md-12">
                                <ListSong data={songs.slice(0, 4)} />
                            </div>
                            <div className="col-xl-6 col-md-12">
                                <ListSong data={songs.slice(4, 8)} />
                            </div>
                        </div>
                    </div>
                    <Receptacle title="Chill" type="playlist" data={chill} />
                    <Receptacle title="Một Chút Yêu Đời" limit={10} />
                    <Receptacle title="Remix Là Dance Luôn" limit={10} />
                    <Receptacle title="Tâm Trạng Tan Chậm" />
                </div>
            )}
        </>
    );
}

export default Home;
