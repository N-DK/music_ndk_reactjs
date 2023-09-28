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

const cx = classNames.bind(styles);

// aip res => return
const songs = [
    {
        id: 1,
        thumbnail:
            'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/f/0/c/6/f0c6b74652e9ed643f3183c7617aaa30.jpg',
        name: 'Chúng ta của hiện tại',
        audio: 'https://vnso-zn-23-tf-a320-zmp3.zmdcdn.me/ef080817ff86ee5eddf9133440c0aae4?authen=exp=1695819245~acl=/ef080817ff86ee5eddf9133440c0aae4/*~hmac=702a78f1961d7c69593714ff1c39fdfc',
        artists: ['Sơn Tùng M-TP'],
        lyric: '',
        genre: [''],
        album_id: '',
        time: '05:02',
        prevSong: 0,
        nextSong: 2,
    },
    {
        id: 2,
        name: 'Có Chắc yêu là đây',
        thumbnail:
            'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/9/d/7/9/9d79ebd03bbb6482bab748d67bbe0afb.jpg',
        audio: 'https://vnso-zn-10-tf-a320-zmp3.zmdcdn.me/82b05166a489d1b883ee28b63a0fcb8f?authen=exp=1695822415~acl=/82b05166a489d1b883ee28b63a0fcb8f/*~hmac=76dcf3a9ebf3f8783a2496eaa7861c3d',
        artists: ['Sơn Tùng M-TP'],
        lyric: '',
        genre: [''],
        album_id: '',
        time: '03:35',
        nextSong: 3,
        prevSong: 1,
    },
];
const NEXT = 'next';
const PREV = 'prev';

function Footer({ data, isPlaying, currAudio }) {
    const [currSong, setCurrSong] = useState('');
    const [currTimeSong, setCurrTimeSong] = useState();
    const [isRepeat, setIsRepeat] = useState(false);
    const [disableNext, setDisableNext] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [isMute, setIsMute] = useState(false);

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
            var audio = new Audio(songs[indexNextSong].audio);
            dispatch(setCurrAudio(audio));
            audio.play();
        } else {
            // if next (value = 1)
            // set disable next song
            // else prev
            // set disable prev song
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
                currAudio.pause();
                dispatch(setPlaying(false));
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
                        )} position-fixed bottom-0 end-0 bg-dark start-0 p-4 pt-3 pb-3`}
                    >
                        <div
                            className={`${cx(
                                '',
                            )} d-flex align-items-center justify-content-between`}
                        >
                            <div className={`${cx('song__container')}`}>
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
                                                {currSong.name}
                                            </a>
                                            <div className="fs-13 f-family subtitle_color">
                                                {currSong.artists.map(
                                                    (artist, index) => (
                                                        <a
                                                            key={index}
                                                            href="#"
                                                            className={` subtitle_color is_truncate`}
                                                        >
                                                            {artist}
                                                        </a>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                        <a
                                            href=""
                                            className="ms-4 me-2 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                        >
                                            <FontAwesomeIcon icon={faHeart} />
                                        </a>
                                        <a
                                            href="#"
                                            className="text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                        >
                                            <FontAwesomeIcon
                                                icon={faEllipsis}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
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
                                    )} subtitle_color d-flex align-items-center mt-2 f-family`}
                                >
                                    <span>
                                        {formatTime(currTimeSong) || '00:00'}
                                    </span>
                                    <input
                                        className={`${cx('duration')}`}
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={
                                            (currTimeSong * 100) /
                                            currAudio.duration
                                                ? Math.ceil(
                                                      (currTimeSong * 100) /
                                                          currAudio.duration,
                                                  )
                                                : 0
                                        }
                                        readOnly={true}
                                        onChange={(e) =>
                                            (currAudio.currentTime =
                                                (e.target.value *
                                                    currAudio.duration) /
                                                100)
                                        }
                                    />
                                    <span>{data.time}</span>
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
                                    href=""
                                    className="ms-3 me-2 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                >
                                    <FontAwesomeIcon icon={faMicrophone} />
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
                                                currAudio.volume = volume;
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
                                    <input
                                        className={`${cx('duration', 'sound')}`}
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={currAudio.volume * 100}
                                        onChange={(e) => {
                                            currAudio.volume =
                                                e.target.value / 100;
                                            setVolume(e.target.value / 100);
                                        }}
                                        readOnly={true}
                                    />
                                </div>
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
        };
    }
};

export default connect(mapStateToProps)(Footer);
