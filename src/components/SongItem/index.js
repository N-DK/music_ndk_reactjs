import {
    faCirclePause,
    faCirclePlay,
    faHeart,
} from '@fortawesome/free-regular-svg-icons';
import styles from './SongItem.module.scss';
import classNames from 'classnames/bind';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
    reducer,
    setActive,
    setCurrAudio,
    setData,
    setPlaying,
} from '~/redux_';
import { useSelector, useDispatch, connect } from 'react-redux';

const cx = classNames.bind(styles);

function SongItem({
    colorTextBlack,
    song,
    activeSong,
    isPlaying,
    currAudio,
    songs,
}) {
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
        <div className={`${cx('wrapper')} d-flex align-items-center pb-2 pt-2`}>
            <div className="d-flex align-items-center w-25">
                <div
                    className={`${cx(
                        'thumbnail',
                    )} rounded-2 overflow-hidden me-2 position-relative`}
                >
                    <img src={song.thumbnail} alt="" />
                    {song.id == activeSong && isPlaying && (
                        <div
                            className={`${cx(
                                'wave-music',
                            )} position-absolute w-100 h-100 top-0`}
                        ></div>
                    )}
                </div>
                <div className="d-flex align-items-center">
                    <div className={`${cx('song__container--name')} pe-3`}>
                        <a
                            href="#"
                            className={`${cx(
                                ' text-decoration-none text-truncate',
                            )} ${
                                colorTextBlack ? 'text-black' : 'text-white'
                            } f-family`}
                        >
                            {song.name}
                        </a>
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
            <h5
                className={`${
                    colorTextBlack ? 'text-black' : 'text-white'
                } f-family m-0 ms-5 me-5`}
            >
                {song.time}
            </h5>
            <a
                href="#"
                className={`ms-4 me-4 ${
                    colorTextBlack ? 'text-black' : 'text-white'
                } rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30`}
            >
                <FontAwesomeIcon className="fs-5" icon={faHeart} />
            </a>
            <a
                onClick={() => {
                    if (isPlaying && song.id == activeSong) {
                        handlePause();
                    } else {
                        handlePlay(song.audio, song.id);
                    }
                }}
                href="#"
                className={`fs-2 ms-4 me-4 ${
                    colorTextBlack ? 'text-black' : 'text-white'
                } rounded-circle d-flex align-items-center justify-content-center square_30`}
            >
                {song.id == activeSong && isPlaying ? (
                    <FontAwesomeIcon icon={faCirclePause} />
                ) : (
                    <FontAwesomeIcon icon={faCirclePlay} />
                )}
            </a>
            <a
                href=""
                className={`ms-4 me-4 ${
                    colorTextBlack ? 'text-black' : 'text-white'
                } rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30`}
            >
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </a>
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

export default connect(mapStateToProps)(SongItem);
