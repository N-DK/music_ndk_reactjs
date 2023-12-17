import styles from './ListSongItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleRight,
    faCirclePlus,
    faCompactDisc,
    faDownload,
    faEllipsis,
    faHeadphones,
    faHeart,
    faLink,
    faMicrophone,
    faPlay,
    faPodcast,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    reducer,
    setActive,
    setCurrAudio,
    setData,
    setPlaying,
} from '~/redux_';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import clipboard from 'clipboard-copy';
import axios from 'axios';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react';
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
}) {
    useSelector(() => reducer);
    const token = Cookies.get('token');
    const [user, setUser] = useState();
    const [like, setLike] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [message, setMessage] = useState();
    const [visible, setVisible] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const dispatch = useDispatch();
    const isTabletMobile = useMediaQuery({ maxWidth: 1200 });

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const handleDownload = (url, title) => {
        setDownloading(true);
        axios({
            url,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const blob = new Blob([response.data], { type: 'audio/mp3' });
            saveAs(blob, title + '.mp3');
            setDownloading(false);
        });
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

    const handleIntoPlayList = (id) => {
        axios
            .put(`http://localhost:8080/api/playlist/${id}`, {
                favoriteSong: [song.title],
                thumbnail: song.thumbnail,
            })
            .then((res) => {
                setMessage(createMessageAddSuccess(song.title));
                setTimeout(() => {
                    setMessage();
                }, 2000);
            })
            .then((err) => console.log(err));
    };

    const createMessageAddSuccess = (title) => (
        <div className={` bg-white rounded-2 f-family p-3 ${cx('message')}`}>
            Đã thêm bài hát “<span className=" fw-bold">{title}</span>” vào
            playlist thành công
        </div>
    );

    const createMessCopied = () => (
        <div className={` bg-white rounded-2 f-family p-3 ${cx('message')}`}>
            Link đã được sao chép vào clipboard
        </div>
    );

    const handleCopyToClipboard = () => {
        clipboard(
            `http://localhost:3001/album/${
                song.albums ? song.albums[0].id : album_id
            }?type=album`,
        );
        setMessage(createMessCopied);
        setTimeout(() => {
            setMessage();
        }, 2000);
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

    useEffect(() => {
        if (user) {
            axios
                .get(`http://localhost:8080/api/playlist/user/${user.id}`)
                .then((res) => setPlaylist(res.data.results))
                .catch((err) => console.log(err));
        }
    }, [user]);

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
                                <HeadlessTippy
                                    placement="top-end"
                                    interactive
                                    visible={visible}
                                    render={(attrs) => (
                                        <div
                                            className={` box bg-white rounded-2 text-dark ${cx(
                                                '',
                                            )}`}
                                            tabIndex="-1"
                                            {...attrs}
                                        >
                                            <div
                                                className={`rounded-2 f-family ${cx(
                                                    'more__container',
                                                )}`}
                                            >
                                                <div className="d-flex align-items-center p-3 pb-0">
                                                    <figure className="w-25 h-25 rounded-1 overflow-hidden mb-0 me-2">
                                                        <img
                                                            src={song.thumbnail}
                                                            alt=""
                                                            className="w-100 h-100"
                                                        />
                                                    </figure>
                                                    <div>
                                                        <Link
                                                            to={`/album/${
                                                                song.albums
                                                                    ? song
                                                                          .albums[0]
                                                                          .id
                                                                    : album_id
                                                            }?type=album`}
                                                            className={`fs-13 text-decoration-none text-dark text--primary ${cx(
                                                                '',
                                                            )} m-0`}
                                                        >
                                                            {song.title}
                                                        </Link>
                                                        <div className="fs-13 f-family subtitle_color">
                                                            {song.artists &&
                                                                song.artists.map(
                                                                    (
                                                                        artist,
                                                                        index,
                                                                    ) => {
                                                                        let artist_name =
                                                                            artist.name;
                                                                        if (
                                                                            artist !==
                                                                            song
                                                                                .artists[
                                                                                song
                                                                                    .artists
                                                                                    .length -
                                                                                    1
                                                                            ]
                                                                        ) {
                                                                            artist_name +=
                                                                                ',';
                                                                        }
                                                                        return (
                                                                            <Link
                                                                                key={
                                                                                    artist.id
                                                                                }
                                                                                to={`/artist/${artist.id}`}
                                                                                className={` subtitle_color is_truncate pe-1`}
                                                                            >
                                                                                {
                                                                                    artist_name
                                                                                }
                                                                            </Link>
                                                                        );
                                                                    },
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-3 pb-2">
                                                    <div
                                                        onClick={() =>
                                                            handleDownload(
                                                                song.audioUrl,
                                                                'NDK - ' +
                                                                    song.title,
                                                            )
                                                        }
                                                        className={`text-decoration-none rounded-2 d-flex justify-content-center align-items-center rounded-2 bg--primary ${cx(
                                                            'down_btn',
                                                            'pointer',
                                                        )}`}
                                                    >
                                                        {downloading ? (
                                                            <img
                                                                src="https://res.cloudinary.com/dmvyx3gwr/image/upload/v1701431805/loading-circle-5662747-4719071-unscreen_y4rshy.gif"
                                                                alt=""
                                                                className="h-25 w-25"
                                                            />
                                                        ) : (
                                                            <div className="d-flex flex-column p-1">
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faDownload
                                                                    }
                                                                />
                                                                <span className="fs-13 mt-1">
                                                                    Download
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <ul className=" list-unstyled fs-15">
                                                    <HeadlessTippy
                                                        interactive
                                                        placement={
                                                            placement ?? 'right'
                                                        }
                                                        render={(attrs) => (
                                                            <div
                                                                tabIndex="-1"
                                                                className=" rounded-1 f-family bg-white fs-15"
                                                                {...attrs}
                                                            >
                                                                <div
                                                                    className={`bg-white rounded-1 ${cx(
                                                                        'add__playlist',
                                                                    )}`}
                                                                >
                                                                    <div className=" ps-3 pe-3 pt-3 mb-2">
                                                                        <input
                                                                            className="rounded-5 border w-100 ps-3 pe-3"
                                                                            placeholder="Find playlist"
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        onClick={
                                                                            hide
                                                                        }
                                                                        data-bs-toggle={
                                                                            'modal'
                                                                        }
                                                                        data-bs-target={
                                                                            !token
                                                                                ? '#modalLogin'
                                                                                : '#modalPlaylist'
                                                                        }
                                                                        to=""
                                                                        className={`d-flex align-items-center p-3 pt-2 pb-2 ${cx(
                                                                            'more__item',
                                                                        )}`}
                                                                    >
                                                                        <img
                                                                            src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.108/static/media/thumb-add.2971eb21.svg"
                                                                            alt=""
                                                                        />
                                                                        <span className="ms-2">
                                                                            Create
                                                                            new
                                                                            playlist
                                                                        </span>
                                                                    </div>
                                                                    <ul className=" list-unstyled">
                                                                        {playlist.map(
                                                                            (
                                                                                pl,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        pl.id
                                                                                    }
                                                                                    onClick={() =>
                                                                                        handleIntoPlayList(
                                                                                            pl.id,
                                                                                        )
                                                                                    }
                                                                                    className={`p-3 pt-2 pb-2 ${cx(
                                                                                        'more__item',
                                                                                    )}`}
                                                                                >
                                                                                    <div className="d-flex align-items-center">
                                                                                        <FontAwesomeIcon
                                                                                            style={{
                                                                                                fontSize: 20,
                                                                                            }}
                                                                                            className="me-2"
                                                                                            icon={
                                                                                                faCompactDisc
                                                                                            }
                                                                                        />
                                                                                        <span>
                                                                                            {
                                                                                                pl.name
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )}
                                                    >
                                                        <li
                                                            className={`d-flex align-items-center justify-content-between p-3 pt-2 pb-2 ${cx(
                                                                'more__item',
                                                            )}`}
                                                        >
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    className="me-2"
                                                                    icon={
                                                                        faCirclePlus
                                                                    }
                                                                />
                                                                <span>
                                                                    Thêm vào
                                                                    playlist
                                                                </span>
                                                            </div>
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faAngleRight
                                                                }
                                                            />
                                                        </li>
                                                    </HeadlessTippy>
                                                    <li
                                                        className={`d-flex align-items-center p-3 pt-2 pb-2 ${cx(
                                                            'more__item',
                                                        )}`}
                                                        onClick={() =>
                                                            handlePlay(
                                                                song.audioUrl,
                                                                song.id,
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faPodcast}
                                                        />
                                                        <span>
                                                            Phát nội dung tương
                                                            tự
                                                        </span>
                                                    </li>
                                                    <li
                                                        onClick={
                                                            handleCopyToClipboard
                                                        }
                                                        className={`d-flex align-items-center p-3 pt-2 pb-2 ${cx(
                                                            'more__item',
                                                        )}`}
                                                    >
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faLink}
                                                        />
                                                        <span>
                                                            Sao chép Link
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    onClickOutside={hide}
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
                                </HeadlessTippy>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div
                style={{
                    zIndex: 9999,
                    marginBottom: `${isInPlaylist ? '100px' : '16px'}`,
                }}
                className="position-fixed start-0 bottom-0 ms-3 text-dark"
            >
                {message}
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
        };
    }
};

export default connect(mapStateToProps)(ListSongItem);
