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
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { reducer, setPlaying } from '~/redux_';

const cx = classNames.bind(styles);

function Footer({ data, isPlaying }) {
    const [currSong, setCurrSong] = useState('');
    useSelector(() => reducer);
    const dispatch = useDispatch();

    const handlePlay = () => {
        currSong.currAudio.play();
        dispatch(setPlaying(true));
    };

    const handlePause = () => {
        currSong.currAudio.pause();
        dispatch(setPlaying(false));
    };

    useEffect(() => {
        setCurrSong(data);
    }, [data]);

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
                                        href=""
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
                                        href=""
                                        className="fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                    >
                                        <FontAwesomeIcon icon={faForwardStep} />
                                    </a>
                                    <a
                                        href=""
                                        className="fs-5 ms-3 me-3 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                    >
                                        <FontAwesomeIcon icon={faRepeat} />
                                    </a>
                                </div>
                                <div className="subtitle_color d-flex align-items-center mt-2 f-family">
                                    <span>00:00</span>
                                    <div>
                                        <div
                                            className={`${cx('duration')}`}
                                        ></div>
                                    </div>
                                    <span>04:43</span>
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
                                        href=""
                                        className="text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                    >
                                        <FontAwesomeIcon icon={faVolumeHigh} />
                                    </a>
                                    <div>
                                        <div
                                            className={`${cx(
                                                'duration',
                                                'sound',
                                            )}`}
                                        ></div>
                                    </div>
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
        };
    }
};

export default connect(mapStateToProps)(Footer);

// // ConfigureStore.js
// import { createStore } from 'redux';
// import rootReducer from '../path/to/rootReducer';

// const store = createStore(rootReducer);

// export default store;

// // Footer.js
// import { connect } from 'react-redux';

// const Footer = ({ data }) => {
//   return <div>{data}</div>;
// };

// const mapStateToProps = (state) => ({
//   data: state.data,
// });

// export default connect(mapStateToProps)(Footer);

// // Home.js
// import store from '../path/to/configureStore';
// import { setData } from '../path/to/actions';

// const Home = () => {
//   const data = 'Dữ liệu từ Home';
//   store.dispatch(setData(data));
//   return <></>;
// };
