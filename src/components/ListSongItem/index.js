import styles from './ListSongItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faHeart,
    faMicrophone,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    reducer,
    setActive,
    setCurrAudio,
    setData,
    setListSongs,
    setPlaying,
} from '~/redux_';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react';
import ReceptacleTippy from '../ReceptacleTippy';
const cx = classNames.bind(styles);

function ListSongItem({
    song,
    activeSong,
    isPlaying,
    currAudio,
    songs,
    isSearchItem,
    isShowAlbum,
    onClick,
    album_id,
    isInPlaylist,
    placement,
    playlist,
}) {
    useSelector(() => reducer);
    const token = Cookies.get('token');
    const [user, setUser] = useState();
    const [like, setLike] = useState(false);
    const dispatch = useDispatch();
    const isTabletMobile = useMediaQuery({ maxWidth: 1200 });
    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const handleListSongClick = () => {
        for (const song of songs) {
            if (!song.albums) {
                song.albums = [{ id: album_id }];
            }
        }
        let res = playlist ? [...playlist] : [...songs];
        if (playlist) {
            for (const item of songs) {
                const isExist = playlist.find((pl) => item.id === pl.id);
                if (!isExist) {
                    res.push(item);
                }
            }
        }
        dispatch(setListSongs(res));
    };

    const handlePlay = (audioUrl, songActive) => {
        var audio = currAudio;
        if (songActive != activeSong) {
            audio = new Audio(audioUrl);
            if (currAudio) currAudio.pause();
        }
        audio.play();
        let song = songs.find((song) => song.id == songActive);
        if (!song.albums) {
            song.albums = [{ id: album_id }];
        }
        dispatch(setData(song));
        dispatch(setPlaying(true));
        dispatch(setCurrAudio(audio));
        dispatch(setActive(songActive));
        handleListSongClick();
    };

    const handlePause = () => {
        currAudio.pause();
        dispatch(setPlaying(false));
    };

    const handleCheckExist = (id) => {
        if (user) {
            const wishlist = user.songs;
            return wishlist.find((wish) => wish.id === id) ? true : false;
        }
    };

    const handleWishlist = () => {
        if (token) {
            setLike(!like);
            if (!like) {
                axios.put(`http://localhost:8080/api/user/${user.id}`, {
                    songs: [song.id],
                });
            } else {
                axios.delete(
                    `http://localhost:8080/api/user/${user.id}?type=song&type_id=${song.id}`,
                );
            }
        }
    };

    useEffect(() => {
        if (user) {
            setLike(handleCheckExist(song.id));
        }
    }, [user, song.id]);

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:8080/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.data === '') {
                        Cookies.remove('token');
                    } else {
                        setUser(res.data);
                    }
                })
                .catch((err) => {
                    Cookies.remove('token');
                    console.log(err);
                });
        }
    }, [token]);

    return (
        <div onClick={onClick} className={`${cx('wrapper')} container pt-3`}>
            <div
                className={`row ${
                    isSearchItem ? 'pb-3' : 'border-bottom pb-3'
                }`}
            >
                <div
                    className={`${
                        !isSearchItem
                            ? `col-xl-${isShowAlbum ? 5 : 8} col-sm-9 col-9`
                            : 'col-12'
                    }`}
                >
                    <div className={` d-flex align-items-center `}>
                        <div
                            className={` position-relative overflow-hidden rounded-2 ${cx(
                                'thumbnail',
                            )}`}
                        >
                            <a href="#" className={` d-block`}>
                                <img
                                    src={song.thumbnail}
                                    alt=""
                                    className="w-100 h-100"
                                />
                            </a>
                            <div
                                onClick={() => {
                                    if (isPlaying && song.id == activeSong) {
                                        handlePause();
                                    } else {
                                        handlePlay(song.audioUrl, song.id);
                                    }
                                }}
                                className={` align-items-center justify-content-center ${cx(
                                    'music__container',
                                    `${
                                        song.id == activeSong &&
                                        isPlaying &&
                                        'is_playing'
                                    }`,
                                )} position-absolute w-100 h-100 top-0 d-flex`}
                            >
                                {song.id == activeSong && isPlaying ? (
                                    <div
                                        className={`${cx('wave-music')}`}
                                    ></div>
                                ) : (
                                    <div className={`${cx('play-music')}`}>
                                        <FontAwesomeIcon
                                            className="text-white"
                                            icon={faPlay}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={`ms-3 ${cx('text')}`}>
                            <Link
                                to={`/album/${
                                    song.albums ? song.albums[0].id : album_id
                                }?type=album`}
                                className={` text-decoration-none ${
                                    isInPlaylist ? 'text-white' : 'text-dark'
                                } text--primary ${cx('')} m-0 f-family`}
                            >
                                {song.title}
                            </Link>
                            <div className={`fs-13 f-family subtitle_color`}>
                                {song.artists &&
                                    song.artists.map((artist, index) => {
                                        let artist_name = artist.name;
                                        if (
                                            artist !==
                                            song.artists[
                                                song.artists.length - 1
                                            ]
                                        ) {
                                            artist_name += ',';
                                        }
                                        return (
                                            <Link
                                                key={artist.id}
                                                to={`/artist/${artist.id}`}
                                                className={` subtitle_color is_truncate pe-1 ${
                                                    isInPlaylist && 'text-white'
                                                }`}
                                            >
                                                {artist_name}
                                            </Link>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                {!isSearchItem && (
                    <>
                        {!isTabletMobile && isShowAlbum && (
                            <div className="col-xl-4 col-md-0 fs-13 f-family">
                                {song.albums &&
                                    song.albums.map((album, index) => (
                                        <Link
                                            key={album.id}
                                            to={`/album/${album.id}?type=album`}
                                            className={`ms-1 subtitle_color is_truncate d-flex align-items-center h-100`}
                                        >
                                            {album.name}
                                        </Link>
                                    ))}
                            </div>
                        )}
                        <div
                            className={`col-xl-${
                                isShowAlbum ? 3 : 4
                            } col-md-3 col-3`}
                        >
                            <div
                                className={` position-relative ${cx(
                                    '',
                                )} d-flex align-items-center h-100 justify-content-end`}
                            >
                                <p
                                    className={`${cx(
                                        'time',
                                    )} ms-1 mb-0 f-family`}
                                >
                                    {song.timePlay}
                                </p>
                                <ReceptacleTippy
                                    song={song}
                                    visible={visible}
                                    hide={hide}
                                    handlePlay={() =>
                                        handlePlay(song.audioUrl, song.id)
                                    }
                                    token={token}
                                    user={user}
                                    album_id={album_id}
                                    placement={placement}
                                >
                                    <div
                                        className={` position-absolute  d-flex algin-items-center end-0 ${cx(
                                            'action_hover',
                                        )}`}
                                    >
                                        <a
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalId"
                                            data-bs-lyric={song.lyric}
                                            href="#"
                                            className={`me-3 ${
                                                isInPlaylist
                                                    ? 'text-white'
                                                    : 'text-dark'
                                            } rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faMicrophone}
                                            />
                                        </a>
                                        <span
                                            data-bs-toggle={!token && 'modal'}
                                            data-bs-target={
                                                !token && '#modalLogin'
                                            }
                                            onClick={handleWishlist}
                                            className={` me-3 rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30  ${cx(
                                                `${
                                                    like
                                                        ? `${
                                                              isInPlaylist
                                                                  ? 'text-white'
                                                                  : 'liked'
                                                          }`
                                                        : 'like'
                                                }`,
                                                'pointer',
                                            )}`}
                                        >
                                            <FontAwesomeIcon
                                                className={`${
                                                    isInPlaylist && 'text-white'
                                                }`}
                                                icon={
                                                    like
                                                        ? faHeart
                                                        : faHeartRegular
                                                }
                                            />
                                        </span>
                                        <Tippy animation="fade" content="Khác">
                                            <span
                                                onClick={show}
                                                className={`${
                                                    isInPlaylist
                                                        ? 'text-white'
                                                        : 'text-dark'
                                                } rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30 ${cx(
                                                    'pointer',
                                                )}`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEllipsis}
                                                />
                                            </span>
                                        </Tippy>
                                    </div>
                                </ReceptacleTippy>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    if (state) {
        return {
            data: state.data,
            isPlaying: state.isPlaying,
            activeSong: state.isActive,
            currAudio: state.currSong,
            playlist: state.songs,
        };
    }
};

export default connect(mapStateToProps)(ListSongItem);
