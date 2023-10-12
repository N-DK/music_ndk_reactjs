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
import { useMediaQuery } from 'react-responsive';
const cx = classNames.bind(styles);

function ListSongItem({
    song,
    activeSong,
    isPlaying,
    currAudio,
    songs,
    isSearchItem,
    isShowAlbum,
}) {
    useSelector(() => reducer);
    const dispatch = useDispatch();
    const isTabletMobile = useMediaQuery({ maxWidth: 1200 });

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
        <div className={`${cx('wrapper')} container pt-3`}>
            <div className={`row ${isSearchItem ? '' : 'border-bottom pb-3'}`}>
                <div
                    className={`${
                        !isSearchItem ? 'col-xl-5 col-sm-9 col-9' : 'col-12'
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
                {!isSearchItem && (
                    <>
                        {!isTabletMobile && (
                            <div className="col-xl-4 col-md-0 fs-13 f-family">
                                {isShowAlbum && (
                                    <Link
                                        to={`/album/${song.album}`}
                                        className={`ms-1 subtitle_color is_truncate d-flex align-items-center h-100`}
                                    >
                                        {song.album}
                                    </Link>
                                )}
                            </div>
                        )}
                        <div className="col-xl-3 col-md-3 col-3">
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
                                    {song.time}
                                </p>
                                <div
                                    className={` position-absolute d-flex algin-items-center end-0 ${cx(
                                        'action_hover',
                                    )}`}
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
                                        className="text-dark rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                    >
                                        <FontAwesomeIcon icon={faEllipsis} />
                                    </a>
                                </div>
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
        };
    }
};

export default connect(mapStateToProps)(ListSongItem);
