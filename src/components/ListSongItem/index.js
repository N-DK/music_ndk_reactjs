import styles from './ListSongItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faMicrophone,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    reducer,
    setActive,
    setCurrAudio,
    setData,
    setPlaying,
} from '~/redux_';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function ListSongItem({ song, activeSong, isPlaying, currAudio, songs }) {
    useSelector(() => reducer);
    const dispatch = useDispatch();

    const handlePlay = (audioUrl, songActive) => {
        var audio = currAudio;
        if (songActive != activeSong) {
            audio = new Audio(audioUrl);
            if (currAudio) currAudio.pause();
        }
        audio.play();
        let song = songs.find((song) => song.id == songActive);
        dispatch(setPlaying(true));
        dispatch(setCurrAudio(audio));
        dispatch(setData(song));
        dispatch(setActive(songActive));
    };

    const handlePause = () => {
        currAudio.pause();
        dispatch(setPlaying(false));
    };

    return (
        <div className="container mb-3">
            <div className={`row border-bottom pb-3`}>
                <div className="col-5">
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
                                        handlePlay(song.audio, song.id);
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
                        <div className="ms-3">
                            <p className={`${cx('')} m-0 f-family`}>
                                {song.name}
                            </p>
                            <div className="fs-13 f-family subtitle_color">
                                {song.artists.map((artist, index) => (
                                    <Link
                                        key={index}
                                        to={`/artist/${artist}`}
                                        className={` subtitle_color is_truncate`}
                                    >
                                        {artist}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <a
                        href="#"
                        className={`ms-1 subtitle_color is_truncate d-flex align-items-center h-100`}
                    >
                        {song.album}
                    </a>
                </div>
                <div className="col-2">
                    <div
                        className={`${cx(
                            '',
                        )} d-flex align-items-center h-100 justify-content-end`}
                    >
                        <a
                            data-bs-toggle="modal"
                            data-bs-target="#modalId"
                            data-bs-lyric={song.lyric}
                            href="#"
                            className="me-3 text-dark rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                        >
                            <FontAwesomeIcon icon={faMicrophone} />
                        </a>
                        <a
                            href=""
                            className="me-3 text-dark rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                        >
                            <FontAwesomeIcon icon={faHeart} />
                        </a>
                        <a
                            href="#"
                            className="me-3 text-dark rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                        >
                            <FontAwesomeIcon icon={faEllipsis} />
                        </a>
                        <p className={`ms-1 mb-0 f-family`}>{song.time}</p>
                    </div>
                </div>
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
