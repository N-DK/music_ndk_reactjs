import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import {
    faCirclePlay,
    faHeart,
    faCirclePause,
} from '@fortawesome/free-regular-svg-icons';
import {
    faBackwardStep,
    faEllipsis,
    faForwardStep,
    faMicrophone,
    faPlus,
    faRepeat,
    faShuffle,
    faVolumeHigh,
    faVolumeLow,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {
    reducer,
    setActive,
    setCurrAudio,
    setData,
    setPlaying,
} from '~/redux_';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

const NEXT = 'next';
const PREV = 'prev';

function Footer({ data, isPlaying, currAudio, songs }) {
    const [currSong, setCurrSong] = useState('');
    const [currTimeSong, setCurrTimeSong] = useState();
    const [isRepeat, setIsRepeat] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMute, setIsMute] = useState(false);
    const [isExpandControls, setIsExpandControls] = useState(false);
    const isTabletMobile = useMediaQuery({ maxWidth: 900 });
    const isMobile = useMediaQuery({ maxWidth: 766 });

    useSelector(() => reducer);
    const dispatch = useDispatch();

    const handlePlay = () => {
        currAudio.play();
        dispatch(setPlaying(true));
    };

    const handlePause = () => {
        currAudio.pause();
        dispatch(setPlaying(false));
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return seconds ? `${formattedMinutes}:${formattedSeconds}` : NaN;
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
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].id === data.id && songs[i + value]) {
                indexNextSong = i + value;
                break;
            }
        }
        if (indexNextSong >= 0) {
            dispatch(setData(songs[indexNextSong]));
            dispatch(setActive(songs[indexNextSong].id));
            dispatch(setPlaying(true));
            currAudio.pause();
            var audio = new Audio(songs[indexNextSong].audioUrl);
            dispatch(setCurrAudio(audio));
            audio.play();
        }
    };

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
    }, [currSong]);

    useEffect(() => {
        const handleAudioEnd = () => {
            if (isRepeat) {
                currAudio.play();
            } else {
                if (currSong.id === songs[songs.length - 1].id) {
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
    }, [isRepeat, currSong]);

    return (
        <>
            {currSong == '' ? (
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
                                    <div className="d-flex align-items-center">
                                        <div
                                            className={`${cx(
                                                'song__container--name',
                                            )} pe-3`}
                                        >
                                            <a
                                                href="#"
                                                className={`${cx(
                                                    ' text-decoration-none text-truncate',
                                                )} text-white f-family`}
                                            >
                                                {currSong.title}
                                            </a>
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
                                            <>
                                                <a
                                                    href=""
                                                    className="ms-4 me-2 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faHeart}
                                                    />
                                                </a>
                                                <a
                                                    href="#"
                                                    className="text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEllipsis}
                                                    />
                                                </a>
                                            </>
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
                                            <a
                                                href=""
                                                className="fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faShuffle}
                                                />
                                            </a>
                                            <a
                                                onClick={() =>
                                                    handleNavigationSong(PREV)
                                                }
                                                href="#"
                                                className="fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBackwardStep}
                                                />
                                            </a>
                                            <a
                                                onClick={() => {
                                                    if (isPlaying) {
                                                        handlePause();
                                                    } else {
                                                        handlePlay();
                                                    }
                                                }}
                                                href="#"
                                                className="fs-1 ms-3 me-3 text-white rounded-circle d-flex align-items-center justify-content-center square_30"
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
                                            </a>
                                            <a
                                                onClick={() =>
                                                    handleNavigationSong(NEXT)
                                                }
                                                href="#"
                                                className="fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faForwardStep}
                                                />
                                            </a>
                                            <a
                                                onClick={() => {
                                                    setIsRepeat(!isRepeat);
                                                }}
                                                href="#"
                                                className={`${
                                                    isRepeat
                                                        ? 'is_repeat'
                                                        : 'text-white'
                                                } fs-5 ms-3 me-3 rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faRepeat}
                                                />
                                            </a>
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
                                            <a
                                                onClick={() => {
                                                    if (!isMute) {
                                                        currAudio.volume = 0;
                                                    } else {
                                                        currAudio.volume =
                                                            volume;
                                                    }
                                                    setIsMute(!isMute);
                                                }}
                                                href="#"
                                                className="text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
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
                                            </a>
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
                                    <a
                                        href=""
                                        className="fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                    >
                                        <FontAwesomeIcon icon={faShuffle} />
                                    </a>
                                    <a
                                        onClick={() =>
                                            handleNavigationSong(PREV)
                                        }
                                        href="#"
                                        className="fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                    >
                                        <FontAwesomeIcon
                                            icon={faBackwardStep}
                                        />
                                    </a>
                                    <a
                                        onClick={() => {
                                            if (isPlaying) {
                                                handlePause();
                                            } else {
                                                handlePlay();
                                            }
                                        }}
                                        href="#"
                                        className="fs-1 ms-3 me-3 text-white rounded-circle d-flex align-items-center justify-content-center square_30"
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
                                    </a>
                                    <a
                                        onClick={() =>
                                            handleNavigationSong(NEXT)
                                        }
                                        href="#"
                                        className="fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                    >
                                        <FontAwesomeIcon icon={faForwardStep} />
                                    </a>
                                    <a
                                        onClick={() => {
                                            setIsRepeat(!isRepeat);
                                        }}
                                        href="#"
                                        className={`${
                                            isRepeat
                                                ? 'is_repeat'
                                                : 'text-white'
                                        } fs-5 ms-3 me-3 rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30`}
                                    >
                                        <FontAwesomeIcon icon={faRepeat} />
                                    </a>
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
