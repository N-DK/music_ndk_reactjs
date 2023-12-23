import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MyMusic.module.scss';
import classNames from 'classnames/bind';
import {
    faChevronRight,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import CardSongItem from '~/components/CardSongItem';
import { useEffect, useState } from 'react';
import ListSong from '~/components/ListSong';
import MyAlbum from '~/components/MyAlbum';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loading from '~/components/Loading';
import { Link } from 'react-router-dom';
import { getUser } from '~/utils/getUser';

const cx = classNames.bind(styles);

const items = [
    {
        name: 'Song',
        id: 1,
    },
    {
        name: 'Album',
        id: 2,
    },
];

function MyMusic() {
    const [item, setItem] = useState(1);
    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        if (user) {
            setSongs(user.songs);
            setAlbums(user.albums);
            setPlaylist(user.playlist);
        }
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const user = await getUser();
            if (!user) {
                Cookies.remove('token');
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        fetch();
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} pt-4`}>
                    <div className={`${cx('playlist__container')} mb-5`}>
                        <div
                            className={` d-flex align-items-center justify-content-between mb-3`}
                        >
                            <div className={` d-flex align-items-center`}>
                                <p
                                    className={` text-uppercase f-family fw-bold m-0 fs-5`}
                                >
                                    playlist
                                </p>
                                <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalPlaylist"
                                    className="ms-2 f-family text-black fs-5 d-flex align-items-center text-decoration-none"
                                >
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </Link>
                            </div>
                            <Link
                                href="#"
                                className="f-family text--primary d-flex align-items-center text-decoration-none"
                            >
                                <span className="me-2">View more</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                        <div className={` row`}>
                            {playlist.map((item) => (
                                <CardSongItem
                                    key={item.id}
                                    data={item}
                                    type="playlist"
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className={`border-bottom pb-2`}>
                            {items.map((v, i) => (
                                <Link
                                    to=""
                                    key={i}
                                    className={`f-family text-dark text-uppercase text-decoration-none d-inline-block me-4 ${
                                        v.id == item && `${cx('active')}`
                                    }`}
                                    onClick={() => setItem(v.id)}
                                >
                                    {v.name}
                                </Link>
                            ))}
                        </div>
                        <div className="">
                            {item == 1 ? (
                                songs.length > 0 ? (
                                    <ListSong
                                        isShowAlbums={true}
                                        data={songs}
                                    />
                                ) : (
                                    <div className="f-family d-flex justify-content-center align-items-center pb-5">
                                        <div className=" d-flex flex-column align-items-center mt-5">
                                            <img
                                                className="mb-2"
                                                style={{
                                                    width: 120,
                                                }}
                                                src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-fav-song.png"
                                                alt=""
                                            />
                                            <span>
                                                There are no favorite songs in
                                                your personal library
                                            </span>
                                            <Link
                                                to="/"
                                                className="mt-3 text-decoration-none text-white bg--primary p-1 pe-3 ps-3 rounded-5 text-uppercase"
                                            >
                                                Explore now
                                            </Link>
                                        </div>
                                    </div>
                                )
                            ) : albums.length > 0 ? (
                                <MyAlbum data={albums} />
                            ) : (
                                <div className="f-family d-flex justify-content-center align-items-center pb-5">
                                    <div className=" d-flex flex-column align-items-center mt-5">
                                        <img
                                            className="mb-2"
                                            style={{
                                                width: 120,
                                            }}
                                            src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-album.png"
                                            alt=""
                                        />
                                        <span>
                                            There are no album in your personal
                                            library
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyMusic;
