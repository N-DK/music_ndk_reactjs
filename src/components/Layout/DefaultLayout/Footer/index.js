import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import {
    faCirclePlay,
    faHeart as faHeartRegular,
    faCirclePause,
} from '@fortawesome/free-regular-svg-icons';
import {
    faBackwardStep,
    faCompactDisc,
    faEllipsis,
    faForwardStep,
    faHeart,
    faMicrophone,
    faPlus,
    faRepeat,
    faShuffle,
    faVolumeHigh,
    faVolumeLow,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {
    reducer,
    setActive,
    setCurrAudio,
    setData,
    setListSongs,
    setPlaying,
} from '~/redux_';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import ListSongItem from '~/components/ListSongItem';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import ReceptacleTippy from '~/components/ReceptacleTippy';
import { getUser } from '~/utils/getUser';

const cx = classNames.bind(styles);

const NEXT = 'next';
const PREV = 'prev';

function Footer({ data, isPlaying, currAudio, songs }) {
    const [currSong, setCurrSong] = useState();
    const [currTimeSong, setCurrTimeSong] = useState();
    const [like, setLike] = useState(false);
    const [user, setUser] = useState();
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMute, setIsMute] = useState(false);
    const [isExpandControls, setIsExpandControls] = useState(false);
    const [turnOnList, setTurnOnList] = useState(false);
    const [visible, setVisible] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const refPlaylist = useRef();
    const isTabletMobile = useMediaQuery({ maxWidth: 900 });
    const isMobile = useMediaQuery({ maxWidth: 766 });

    useSelector(() => reducer);
    const dispatch = useDispatch();

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const handlePlay = () => {
        currAudio.play();
        dispatch(setPlaying(true));
    };

    const handlePause = () => {
        currAudio.pause();
        dispatch(setPlaying(false));
    };

    const getIndexSong = () => {
        let index;
        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id === data.id) {
                index = i;
            }
        }
        return index;
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return seconds ? `${formattedMinutes}:${formattedSeconds}` : NaN;
    };

    const handleCheckExist = (id) => {
        if (user) {
            const wishlist = user.songs;
            return wishlist.find((wish) => wish.id === id) ? true : false;
        }
    };

    const handleNavigationSong = (type) => {
        var indexNextSong = -1;
        var value = 0;
        switch (type) {
            case NEXT:
                value = 1;
                break;
            case PREV:
                value = -1;
                break;
            default:
                break;
        }
        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id === data.id && playlist[i + value]) {
                indexNextSong = i + value;
                break;
            }
        }
        if (indexNextSong >= 0) {
            dispatch(setData(playlist[indexNextSong]));
            dispatch(setActive(playlist[indexNextSong].id));
            dispatch(setPlaying(true));
            currAudio.pause();
            var audio = new Audio(playlist[indexNextSong].audioUrl);
            dispatch(setCurrAudio(audio));
            audio.play();
        }
    };

    const handleWishlist = () => {
        if (user) {
            setLike(!like);
            if (!like) {
                axios.put(`http://localhost:8080/api/user/${user.id}`, {
                    songs: [data.id],
                    roleCode: user.roleCode,
                });
            } else {
                axios.delete(
                    `http://localhost:8080/api/user/${user.id}?type=song&type_id=${data.id}`,
                );
            }
        }
    };

    const CustomTooltip = ({ song }) => {
        return song ? (
            <div className="f-family pb-1">
                <p className="fs-15 mb-1">Next song</p>
                <div className="d-flex align-items-center">
                    <div
                        className={`${cx(
                            'thumbnail_tooltip',
                        )} rounded-2 overflow-hidden me-2`}
                    >
                        <img className="" src={song.thumbnail} alt="" />
                    </div>
                    <div
                        className={`d-flex align-items-center ${cx('flex_1')}`}
                    >
                        <div className={`${cx('song__container--name')} pe-3`}>
                            <Link
                                to={`/album/${song.albums[0].id}?type=album`}
                                className={`${cx(
                                    ' text-decoration-none text-truncate',
                                )} text-white f-family`}
                            >
                                {song.title}
                            </Link>
                            <div className="fs-13 f-family subtitle_color">
                                {song.artists.map((artist, index) => {
                                    let artist_name = artist.name;
                                    if (
                                        artist !==
                                        song.artists[song.artists.length - 1]
                                    ) {
                                        artist_name += ',';
                                    }
                                    return (
                                        <Link
                                            key={index}
                                            to={`/artist/${artist.id}`}
                                            className={` subtitle_color is_truncate pe-1`}
                                        >
                                            {artist_name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="f-family">
                There are no more songs in the playlist
            </div>
        );
    };

    useEffect(() => {
        setPlaylist(songs);
        if (songs.length > 0 && !currSong && !currAudio) {
            dispatch(setData(songs[0]));
            dispatch(setActive(songs[0].id));
            dispatch(setPlaying(true));
            var audio = new Audio(songs[0].audioUrl);
            dispatch(setCurrAudio(audio));
            audio.play();
        }
    }, [songs]);

    useEffect(() => {
        if (isShuffle) {
            const songsTemp = [...songs];
            const shuffled = songsTemp
                .filter((song) => song.id !== data.id)
                .sort(() => Math.random() - 0.5);
            const res = [currSong, ...shuffled];
            setPlaylist(res);
        } else {
            setPlaylist(songs);
        }
    }, [isShuffle]);

    useEffect(() => {
        let x = `translateX(${turnOnList ? 0 : 100}%)`;
        if (refPlaylist.current) {
            refPlaylist.current.style.transform = x;
        }
    }, [turnOnList]);

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
        setLike(handleCheckExist(data.id));
    }, [user, data.id]);

    useEffect(() => {
        setCurrSong(data);
    }, [data]);

    useEffect(() => {
        if (currSong) {
            currAudio.volume = volume;
            currAudio.addEventListener('timeupdate', () => {
                setCurrTimeSong(currAudio.currentTime);
            });
        }
    }, [currSong, currAudio]);

    useEffect(() => {
        const handleAudioEnd = () => {
            if (isRepeat) {
                currAudio.play();
            } else {
                if (currSong.id === playlist[playlist.length - 1].id) {
                    currAudio.pause();
                    dispatch(setPlaying(false));
                } else {
                    handleNavigationSong(NEXT);
                }
            }
        };

        if (currSong) {
            currAudio.addEventListener('ended', handleAudioEnd);

            return () => {
                currAudio.removeEventListener('ended', handleAudioEnd);
            };
        }
    }, [isRepeat, currSong, playlist]);

    return (
        <>
            {!currSong ? (
                <></>
            ) : (
                <div>
                    <div
                        className={`${cx(
                            'wrapper',
                            `${
                                isTabletMobile &&
                                (isExpandControls
                                    ? 'is-expand'
                                    : 'is-not-expand')
                            }`,
                        )} position-fixed bottom-0 end-0 bg-dark start-0 p-4 pt-3 pb-3`}
                    >
                        <div
                            className={`${cx(
                                '',
                            )} d-flex align-items-center justify-content-between`}
                        >
                            <div
                                className={`${cx('song__container')} ${
                                    isTabletMobile && 'w-100'
                                }`}
                            >
                                <div className="d-flex align-items-center">
                                    <div
                                        className={`${cx(
                                            'thumbnail',
                                        )} rounded-2 overflow-hidden me-2`}
                                    >
                                        <img src={currSong.thumbnail} alt="" />
                                    </div>
                                    <div
                                        className={`d-flex align-items-center ${cx(
                                            'flex_1',
                                        )}`}
                                    >
                                        <div
                                            className={`${cx(
                                                'song__container--name',
                                            )} pe-3`}
                                        >
                                            <Link
                                                to={`/album/${currSong.albums[0].id}?type=album`}
                                                className={`${cx(
                                                    ' text-decoration-none text-truncate',
                                                )} text-white f-family`}
                                            >
                                                {currSong.title}
                                            </Link>
                                            <div className="fs-13 f-family subtitle_color">
                                                {currSong.artists.map(
                                                    (artist, index) => {
                                                        let artist_name =
                                                            artist.name;
                                                        if (
                                                            artist !==
                                                            currSong.artists[
                                                                currSong.artists
                                                                    .length - 1
                                                            ]
                                                        ) {
                                                            artist_name += ',';
                                                        }
                                                        return (
                                                            <Link
                                                                key={index}
                                                                to={`/artist/${artist.id}`}
                                                                className={` subtitle_color is_truncate pe-1`}
                                                            >
                                                                {artist_name}
                                                            </Link>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                        {!isMobile && (
                                            <ReceptacleTippy
                                                song={data}
                                                visible={visible}
                                                hide={hide}
                                                handlePlay={handlePlay}
                                                user={user}
                                                album_id={currSong.albums[0].id}
                                            >
                                                <div className="d-flex">
                                                    <span
                                                        data-bs-toggle={
                                                            !user && 'modal'
                                                        }
                                                        data-bs-target={
                                                            !user &&
                                                            '#modalLogin'
                                                        }
                                                        onClick={handleWishlist}
                                                        className="pointer ms-4 me-2 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={
                                                                like
                                                                    ? faHeart
                                                                    : faHeartRegular
                                                            }
                                                        />
                                                    </span>
                                                    <Tippy content="Khác">
                                                        <Link
                                                            onClick={show}
                                                            to=""
                                                            className="text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faEllipsis
                                                                }
                                                            />
                                                        </Link>
                                                    </Tippy>
                                                </div>
                                            </ReceptacleTippy>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {isTabletMobile && (
                                <div>
                                    <a
                                        onClick={() =>
                                            setIsExpandControls(
                                                !isExpandControls,
                                            )
                                        }
                                        className="text-white fs-2"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </a>
                                </div>
                            )}
                            {!isTabletMobile && (
                                <>
                                    <div
                                        className={`${cx(
                                            'control__container',
                                        )} d-flex justify-content-center align-items-center flex-column flex-1`}
                                    >
                                        <div
                                            className={` d-flex justify-content-center align-items-center`}
                                        >
                                            <nav
                                                onClick={() =>
                                                    setIsShuffle(
                                                        (shuffled) => !shuffled,
                                                    )
                                                }
                                                className={`${
                                                    isShuffle
                                                        ? 'is_active'
                                                        : 'text-white'
                                                } pointer fs-5 ms-3 me-3 rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faShuffle}
                                                />
                                            </nav>
                                            <nav
                                                onClick={() =>
                                                    handleNavigationSong(PREV)
                                                }
                                                className="pointer fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBackwardStep}
                                                />
                                            </nav>
                                            <nav
                                                onClick={() => {
                                                    if (isPlaying) {
                                                        handlePause();
                                                    } else {
                                                        handlePlay();
                                                    }
                                                }}
                                                className="pointer fs-1 ms-3 me-3 text-white rounded-circle d-flex align-items-center justify-content-center square_30"
                                            >
                                                {isPlaying ? (
                                                    <FontAwesomeIcon
                                                        icon={faCirclePause}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faCirclePlay}
                                                    />
                                                )}
                                            </nav>
                                            <Tippy
                                                content={
                                                    <CustomTooltip
                                                        song={
                                                            playlist[
                                                                getIndexSong() +
                                                                    1
                                                            ]
                                                        }
                                                    />
                                                }
                                            >
                                                <nav
                                                    onClick={() =>
                                                        handleNavigationSong(
                                                            NEXT,
                                                        )
                                                    }
                                                    className="pointer fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faForwardStep}
                                                    />
                                                </nav>
                                            </Tippy>
                                            <nav
                                                onClick={() => {
                                                    setIsRepeat(!isRepeat);
                                                }}
                                                className={`pointer ${
                                                    isRepeat
                                                        ? 'is_active'
                                                        : 'text-white'
                                                } fs-5 ms-3 me-3 rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faRepeat}
                                                />
                                            </nav>
                                        </div>
                                        <div
                                            className={`${cx(
                                                'duration__container',
                                            )} subtitle_color d-flex align-items-center mt-2 f-family`}
                                        >
                                            <span>
                                                {formatTime(currTimeSong) ||
                                                    '00:00'}
                                            </span>
                                            <div
                                                onClick={(e) => {
                                                    var widthCurrent =
                                                        ((e.clientX -
                                                            e.target
                                                                .offsetLeft) *
                                                            100) /
                                                        500;
                                                    currAudio.currentTime =
                                                        (widthCurrent *
                                                            currAudio.duration) /
                                                        100;
                                                }}
                                                className={`${cx('slider')}`}
                                            >
                                                <div
                                                    style={{
                                                        width: `${
                                                            (currTimeSong *
                                                                100) /
                                                            currAudio.duration
                                                                ? (currTimeSong *
                                                                      100) /
                                                                  currAudio.duration
                                                                : 0
                                                        }%`,
                                                    }}
                                                    className={`${cx(
                                                        'slider__track',
                                                    )}`}
                                                ></div>
                                            </div>
                                            <span>{data.timePlay}</span>
                                        </div>
                                    </div>
                                    <div
                                        className={`${cx(
                                            'control-right__container',
                                        )} d-flex align-items-center justify-content-end`}
                                    >
                                        <a
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalId"
                                            data-bs-lyric={`${currSong.lyric}`}
                                            href=""
                                            className="ms-3 me-2 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                        >
                                            <FontAwesomeIcon
                                                icon={faMicrophone}
                                            />
                                        </a>
                                        <div
                                            className={`${cx(
                                                '',
                                            )} d-flex align-items-center `}
                                        >
                                            <nav
                                                onClick={() => {
                                                    if (!isMute) {
                                                        currAudio.volume = 0;
                                                    } else {
                                                        currAudio.volume =
                                                            volume;
                                                    }
                                                    setIsMute(!isMute);
                                                }}
                                                className="pointer text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                            >
                                                {currAudio.volume === 0 ? (
                                                    <FontAwesomeIcon
                                                        icon={faVolumeXmark}
                                                    />
                                                ) : currAudio.volume <= 0.5 ? (
                                                    <FontAwesomeIcon
                                                        icon={faVolumeLow}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faVolumeHigh}
                                                    />
                                                )}
                                            </nav>
                                            <div
                                                onClick={(e) => {
                                                    var widthCurrent =
                                                        ((e.clientX -
                                                            e.target
                                                                .offsetLeft) *
                                                            100) /
                                                        100;
                                                    currAudio.volume =
                                                        widthCurrent / 100;
                                                    setVolume(
                                                        widthCurrent / 100,
                                                    );
                                                }}
                                                className={`${cx(
                                                    'slider',
                                                    'sound',
                                                )}`}
                                            >
                                                <div
                                                    style={{
                                                        width: `${
                                                            currAudio.volume *
                                                            100
                                                        }%`,
                                                    }}
                                                    className={`${cx(
                                                        'slider__track',
                                                    )}`}
                                                ></div>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() =>
                                                setTurnOnList(!turnOnList)
                                            }
                                            className=" border-start ms-2 ps-3"
                                        >
                                            <div
                                                style={{ transition: '0.3s' }}
                                                className={`rounded-1 p-2 d-flex align-items-center justify-content-center pointer ${
                                                    turnOnList && 'bg--primary'
                                                }`}
                                            >
                                                <FontAwesomeIcon
                                                    className="text-white"
                                                    icon={faCompactDisc}
                                                    spin={turnOnList}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {isTabletMobile && (
                            <div
                                className={`${cx(
                                    'control__container',
                                )} d-flex justify-content-center align-items-center flex-column flex-1 mt-3`}
                            >
                                <div
                                    className={` d-flex justify-content-center align-items-center`}
                                >
                                    <nav className="pointer fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30">
                                        <FontAwesomeIcon icon={faShuffle} />
                                    </nav>
                                    <nav
                                        onClick={() =>
                                            handleNavigationSong(PREV)
                                        }
                                        className="pointer fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                    >
                                        <FontAwesomeIcon
                                            icon={faBackwardStep}
                                        />
                                    </nav>
                                    <nav
                                        onClick={() => {
                                            if (isPlaying) {
                                                handlePause();
                                            } else {
                                                handlePlay();
                                            }
                                        }}
                                        href="#"
                                        className="pointer fs-1 ms-3 me-3 text-white rounded-circle d-flex align-items-center justify-content-center square_30"
                                    >
                                        {isPlaying ? (
                                            <FontAwesomeIcon
                                                icon={faCirclePause}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faCirclePlay}
                                            />
                                        )}
                                    </nav>
                                    <nav
                                        onClick={() =>
                                            handleNavigationSong(NEXT)
                                        }
                                        className="pointer fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                    >
                                        <FontAwesomeIcon icon={faForwardStep} />
                                    </nav>
                                    <nav
                                        onClick={() => {
                                            setIsRepeat(!isRepeat);
                                        }}
                                        className={`pointer ${
                                            isRepeat
                                                ? 'is_active'
                                                : 'text-white'
                                        } fs-5 ms-3 me-3 rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30`}
                                    >
                                        <FontAwesomeIcon icon={faRepeat} />
                                    </nav>
                                </div>
                                <div
                                    className={`${cx(
                                        'duration__container',
                                    )} subtitle_color d-flex align-items-center mt-2 f-family w-100`}
                                >
                                    <span>
                                        {formatTime(currTimeSong) || '00:00'}
                                    </span>
                                    <div
                                        onClick={(e) => {
                                            var widthCurrent =
                                                ((e.clientX -
                                                    e.target.offsetLeft) *
                                                    100) /
                                                500;
                                            currAudio.currentTime =
                                                (widthCurrent *
                                                    currAudio.duration) /
                                                100;
                                        }}
                                        className={`${cx('slider')} w-100`}
                                    >
                                        <div
                                            style={{
                                                width: `${
                                                    (currTimeSong * 100) /
                                                    currAudio.duration
                                                        ? (currTimeSong * 100) /
                                                          currAudio.duration
                                                        : 0
                                                }%`,
                                            }}
                                            className={`${cx('slider__track')}`}
                                        ></div>
                                    </div>
                                    <span>{data.timePlay}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        ref={refPlaylist}
                        className={`position-fixed bottom-0 top-0 end-0 h-100 ${cx(
                            'list__container',
                        )}`}
                    >
                        <div
                            className={` f-family ${cx(
                                'list__playlist',
                            )} h-100 mb-5 `}
                        >
                            <div className=" ">
                                {playlist
                                    .slice(0, getIndexSong() + 1)
                                    .map((song) => (
                                        <div
                                            key={song.id}
                                            className={`${
                                                song.id === data.id
                                                    ? `bg--primary rounded-2 position-sticky top-0 ${cx(
                                                          'active',
                                                      )}`
                                                    : `${cx(
                                                          'un_active',
                                                      )} position-relative`
                                            }`}
                                        >
                                            <ListSongItem
                                                song={song}
                                                songs={playlist}
                                                isInPlaylist={
                                                    song.id === data.id
                                                }
                                                placement="bottom-end"
                                            />
                                            {song.id !== data.id && (
                                                <div
                                                    className={`position-absolute top-0 start-0 w-100 h-100 ${cx(
                                                        'opacity-5',
                                                    )}`}
                                                ></div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                            <h5 className="mt-2">Playlist</h5>
                            <span>From playlist</span>
                            <div
                                className={`mt-2 h-100 ${cx('next__playlist')}`}
                            >
                                {playlist
                                    .slice(getIndexSong() + 1, playlist.length)
                                    .map((song) => (
                                        <ListSongItem
                                            key={song.id}
                                            song={song}
                                            songs={playlist}
                                            placement="bottom-end"
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    if (state) {
        return {
            data: state.data,
            isPlaying: state.isPlaying,
            currAudio: state.currSong,
            songs: state.songs,
        };
    }
};

export default connect(mapStateToProps)(Footer);
