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
import { getUser } from '~/utils/getUser';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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

const DEFAULT = [
    {
        title: 'Chill',
        code: 'chill',
        more: '/hub/chill',
    },
    {
        title: 'This Music Is Super Hot',
        code: 'remix',
    },
];

function Home() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [songs, setSongs] = useState([]);
    const [categories, setCategories] = useState(DEFAULT);

    const updateDataForCategory = async () => {
        for (const category of DEFAULT) {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/playlist/topic/${category.code}`,
                );
                category.data = res.data.results;
            } catch (error) {
                console.log(error);
            }
        }
        return [...DEFAULT];
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8080/api/song')
            .then((res) => {
                setSongs(res.data.results.reverse());
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const fetchCategories = await updateDataForCategory();
            setCategories(fetchCategories);
            setLoading(false);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const user = await getUser();
            if (!user) {
                Cookies.remove('token');
            } else {
                setUser(user);
            }
        };
        fetch();
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
                                                user={user}
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
                                                user={user}
                                            />
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    {categories.map((category, index) => (
                        <Receptacle
                            key={index}
                            title={category.title}
                            type="playlist"
                            data={category.data}
                            more={category.more}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Home;
