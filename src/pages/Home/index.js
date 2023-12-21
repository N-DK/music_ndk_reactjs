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
import ListSongItem from '~/components/ListSongItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
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
        url: 'https://photo-zmp3.zmdcdn.me/banner/1/a/e/d/1aed7fbec9d6754ca3ea0a02c15c1f2d.jpg',
    },
    {
        url: 'https://photo-zmp3.zmdcdn.me/banner/4/1/d/e/41decb12652c6a9e704b7eb3244d0b5c.jpg',
    },
    {
        url: 'https://photo-zmp3.zmdcdn.me/banner/1/1/0/b/110b82df9fa659e8f8e9fc04aa9f4a31.jpg',
    },
    {
        url: 'https://photo-zmp3.zmdcdn.me/banner/7/9/f/1/79f1a1c0cc92010c32097d73fe323a2d.jpg',
    },
];

function Home() {
    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const [chill, setChill] = useState([]);
    const [remix, setRemix] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8080/api/song')
            .then((res) => {
                setSongs(res.data.results.reverse());
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

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8080/api/playlist/topic/remix')
            .then((res) => {
                setRemix(res.data.results);
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
                                    <Link to={banner.playlist}>
                                        <img
                                            src={banner.url}
                                            className="w-100 h-100"
                                        />
                                    </Link>
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
                            <h4 className={`mb-0 f-family`}>New Release</h4>
                            <Link
                                to="/new-release/song"
                                className="f-family text--primary d-flex align-items-center text-decoration-none"
                            >
                                <span className="me-2">View more</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                        <div className={`${cx('')} row `}>
                            <div className="col-xl-6 col-md-12">
                                {songs.map((song, index) => {
                                    if (index < 4) {
                                        return (
                                            <ListSongItem
                                                key={index}
                                                song={song}
                                                songs={songs}
                                            />
                                        );
                                    }
                                })}
                            </div>
                            <div className="col-xl-6 col-md-12">
                                {songs.map((song, index) => {
                                    if (index >= 4 && index < 8) {
                                        return (
                                            <ListSongItem
                                                key={index}
                                                song={song}
                                                songs={songs}
                                            />
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <Receptacle
                        title="Chill"
                        type="playlist"
                        data={chill}
                        more="/hub/chill"
                    />
                    <Receptacle
                        title="This Music Is Super Hot"
                        type="playlist"
                        data={remix}
                        more={'/hub/remix'}
                    />
                </div>
            )}
        </>
    );
}

export default Home;
