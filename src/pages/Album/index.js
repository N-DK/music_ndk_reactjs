import ListSong from '~/components/ListSong';
import styles from './Album.module.scss';
import classNames from 'classnames/bind';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '~/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload,
    faEllipsis,
    faLink,
    faHeart,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import clipboard from 'clipboard-copy';
import Cookies from 'js-cookie';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    reducer,
    setActive,
    setCurrAudio,
    setListSongs,
    setMessage,
    setPlaying,
    setData as setDataSong,
} from '~/redux_';
import CardArtist from '~/components/CardArtist';
import CardSongItem from '~/components/CardSongItem';
import { getUser } from '~/utils/getUser';

const cx = classNames.bind(styles);

function Album({ playlist, currAudio }) {
    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [liked, setLiked] = useState(false);
    let { id } = useParams();
    const { search } = useLocation();
    const param = new URLSearchParams(search);
    const type = param.get('type');
    useSelector(() => reducer);
    const dispatch = useDispatch();

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const formatDate = (date) => {
        const dateTime = new Date(date);
        return `${dateTime.getDate()}/${
            dateTime.getMonth() + 1
        }/${dateTime.getFullYear()}`;
    };

    const fetchAPIArtist = async () => {
        let artists_new = [];
        for (let artist of data[0].artists) {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/artist/${artist.id}`,
                );
                const _res = await axios.get(
                    `http://localhost:8080/api/playlist/artist/${artist.id}`,
                );
                artist = { ...res.data.results[0] };
                artist.data = _res.data.results;
                artists_new.push(artist);
            } catch (err) {
                console.log(err);
            }
        }
        return [...artists_new];
    };

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.floor(minutes % 60);

        const formattedHours = String(hours).padStart(1, '0');
        const formattedMinutes = String(remainingMinutes).padStart(1, '0');

        return minutes
            ? `${
                  formattedHours !== '0' ? `${formattedHours} hours` : ''
              }  ${formattedMinutes} minutes`
            : NaN;
    };

    const handleRemoveSongInPlaylist = (song_id) => {
        axios
            .put(
                `http://localhost:8080/api/playlist/user/${user.id}?song_id=${song_id}&playlist_id=${id}`,
            )
            .then((res) => setSongs(res.data.results[0].songs))
            .catch((err) => console.log(err));
    };

    const getTotalTime = () => {
        let totalTime = 0;
        for (const song of songs) {
            const time = song.timePlay.split(':');
            const minutes = parseInt(time[0]);
            const seconds = parseInt(time[1]);
            totalTime += minutes + seconds / 60;
        }
        return formatTime(totalTime);
    };

    const handleLike = () => {
        if (user) {
            setLiked(!liked);
            if (!liked) {
                axios.put(`http://localhost:8080/api/user/${user.id}`, {
                    [type]: [id],
                    roleCode: user.roleCode,
                });
            } else {
                axios.delete(
                    `http://localhost:8080/api/user/${user.id}?type=${type}&type_id=${id}`,
                );
            }
        }
    };

    const handleCheckExist = (id) => {
        if (user) {
            const wishlist = type == 'album' ? user.albums : user.playlist;
            return wishlist.find((wish) => wish.id === Number(id))
                ? true
                : false;
        }
    };

    const createMessCopied = () => (
        <div className={` bg-white rounded-2 f-family p-3 ${cx('message')}`}>
            Link đã được sao chép vào clipboard
        </div>
    );

    const handleCopyToClipboard = () => {
        clipboard(`http://localhost:3001/album/${id}?type=${type}`);
        dispatch(setMessage(createMessCopied));
        setTimeout(() => {
            dispatch(setMessage());
        }, 2000);
    };

    const handleSetListSongs = () => {
        for (const song of songs) {
            if (!song.albums) {
                song.albums = [{ id: id }];
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

    const handlePlay = () => {
        if (currAudio) {
            currAudio.pause();
        }
        console.log(songs[0]);
        dispatch(setDataSong(songs[0]));
        dispatch(setActive(songs[0].id));
        dispatch(setPlaying(true));
        var audio = new Audio(songs[0].audioUrl);
        dispatch(setCurrAudio(audio));
        audio.play();
        handleSetListSongs();
    };

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

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/${type}/${id}`)
            .then((res) => {
                setData(res.data.results);
                if (res.data.results[0].songs) {
                    setSongs(res.data.results[0].songs);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [type, id]);

    useEffect(() => {
        setLiked(handleCheckExist(id));
    }, [user]);

    useEffect(() => {
        if (data) {
            // chú ý nhỏ là async/await là hàm không trả ra giá trị trực tiếp
            const fetch = async () => {
                setLoading(true);
                const fetchArtist = await fetchAPIArtist();
                setArtists(fetchArtist);
                setLoading(false);
            };
            fetch();
        }
    }, [data, songs]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} pt-5 f-family`}>
                    <div className={`${cx('')} row`}>
                        <div className="col-xl-4 col-md-4">
                            <div
                                className={` d-flex flex-column align-items-center justify-content-center mb-4 ${cx(
                                    '',
                                )} text-center f-family`}
                            >
                                <div
                                    className={`${cx(
                                        'thumbnail',
                                    )} rounded-4 overflow-hidden w-75`}
                                >
                                    <img
                                        className="w-100 h-100"
                                        src={data[0].thumbnail}
                                        alt=""
                                    />
                                </div>
                                <p
                                    style={{ fontWeight: 600 }}
                                    className={`${cx(
                                        '',
                                    )} text-capitalize fs-5 mt-2 mb-2 mt-4`}
                                >
                                    {data[0].title || data[0].name}
                                </p>
                                {type === 'playlist' && (
                                    <p className={`${cx('')} mb-2`}>
                                        <span>Update date: </span>
                                        {formatDate(data[0].modifiedDate)}
                                    </p>
                                )}
                                <div
                                    className={`${cx(
                                        'text',
                                    )} fs-13 f-family subtitle_color w-100`}
                                >
                                    {artists.map((artist, index) => (
                                        <Link
                                            key={index}
                                            to={`/artist/${artist.id}`}
                                            className={` subtitle_color is_truncate pe-1`}
                                        >
                                            {artist.artistName || artist.name}
                                        </Link>
                                    ))}
                                </div>
                                {songs.length > 0 && (
                                    <button
                                        onClick={handlePlay}
                                        className=" text-uppercase bg--primary border-0 rounded-5 p-2 pe-4 ps-4 mt-2"
                                    >
                                        <p className="mb-0">
                                            <i className="me-2">
                                                <FontAwesomeIcon
                                                    icon={faPlay}
                                                />
                                            </i>
                                            Play all songs
                                        </p>
                                    </button>
                                )}
                                <HeadlessTippy
                                    interactive
                                    visible={visible}
                                    placement="bottom-start"
                                    render={(attrs) => (
                                        <div
                                            className=" bg-white rounded-1 ms-5"
                                            tabIndex="-1"
                                            {...attrs}
                                        >
                                            <div
                                                className={`pt-2 pb-2 rounded-1 f-family ${cx(
                                                    'more__container',
                                                )} bg-white `}
                                            >
                                                <ul className="mb-0 p-0">
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
                                                            icon={faDownload}
                                                        />
                                                        <span>Download</span>
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
                                    <div className="d-flex align-items-center justify-content-center mt-3">
                                        <span
                                            data-bs-toggle={!user && 'modal'}
                                            data-bs-target={
                                                !user && '#modalLogin'
                                            }
                                            onClick={handleLike}
                                            className="pointer text-dark rounded-circle d-flex align-items-center bg--gray justify-content-center square_40"
                                        >
                                            <FontAwesomeIcon
                                                className={`${
                                                    liked && 'color--primary'
                                                }`}
                                                icon={
                                                    liked
                                                        ? faHeart
                                                        : faHeartRegular
                                                }
                                            />
                                        </span>
                                        <Tippy content="More">
                                            <span
                                                onClick={show}
                                                className="ms-2 pointer text-dark rounded-circle d-flex align-items-center bg--gray justify-content-center square_40"
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
                        <div className="col-xl-8 col-md-8">
                            {songs.length > 0 ? (
                                <div className={`${cx('')} f-family`}>
                                    {type === 'playlist' && data[0].preface && (
                                        <p>
                                            <span className="subtitle_color pe-2">
                                                Preface
                                            </span>
                                            {data[0].preface}
                                        </p>
                                    )}
                                    <ListSong
                                        isShowAlbums={type === 'playlist'}
                                        data={songs}
                                        album_id={data[0].id}
                                        handleRemoveSongInPlaylist={
                                            handleRemoveSongInPlaylist
                                        }
                                    />
                                    {type === 'album' && (
                                        <div className="mt-3">
                                            <h5>Information</h5>
                                            <div className="mb-1">
                                                <span
                                                    className={`d-inline-block ${cx(
                                                        'information__item',
                                                    )}`}
                                                >
                                                    Number of songs
                                                </span>
                                                <h6 className=" d-inline-block">
                                                    {songs.length}
                                                </h6>
                                            </div>
                                            <div className="mb-1">
                                                <span
                                                    className={`d-inline-block ${cx(
                                                        'information__item',
                                                    )}`}
                                                >
                                                    Release date
                                                </span>
                                                <h6 className="d-inline-block">
                                                    {formatDate(
                                                        data[0].createdDate,
                                                    )}
                                                </h6>
                                            </div>
                                            <div className="">
                                                <span
                                                    className={`d-inline-block ${cx(
                                                        'information__item',
                                                    )}`}
                                                >
                                                    Provided by
                                                </span>
                                                <h6 className="d-inline-block">
                                                    Universal Music Group
                                                </h6>
                                            </div>
                                        </div>
                                    )}
                                    {songs.length > 0 &&
                                        type === 'playlist' && (
                                            <div className="mt-3">
                                                {songs.length} songs •{' '}
                                                {getTotalTime()}
                                            </div>
                                        )}
                                </div>
                            ) : (
                                <div className="h-100">
                                    <div
                                        style={{ height: '250px' }}
                                        className=" rounded-2 bg-light d-flex align-items-center justify-content-center"
                                    >
                                        <div className="d-flex flex-column align-items-center">
                                            <figure className="mb-0">
                                                <img
                                                    src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.108/static/media/music-icon.cfa4aa91.svg"
                                                    alt=""
                                                    className="w-100 h-100"
                                                />
                                            </figure>
                                            <p className="mb-0 mt-3">
                                                There are no songs in your
                                                playlist
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {type === 'playlist' && songs.length > 0 && (
                        <div className="mt-5">
                            <div>
                                <h3 className="pb-3">Participating Artists</h3>
                                <div className="row">
                                    {artists.map((artist, index) => {
                                        if (index < 5) {
                                            return (
                                                <CardArtist
                                                    key={artist.id}
                                                    data={artist}
                                                />
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                    {type === 'album' && songs.length > 0 && (
                        <div className="mt-5">
                            {artists.map((artist) => (
                                <div className="mb-4" key={artist.id}>
                                    <h3 className="pb-3">
                                        {artist.artistName} Appear in
                                    </h3>
                                    <div className="row">
                                        <CardArtist data={artist} />
                                        {artist.data &&
                                            artist.data.map((item) => (
                                                <CardSongItem
                                                    key={item.id}
                                                    data={item}
                                                    type="playlist"
                                                />
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
const mapStateToProps = (state) => {
    if (state) {
        return {
            playlist: state.songs,
            currAudio: state.currSong,
        };
    }
};

export default connect(mapStateToProps)(Album);
