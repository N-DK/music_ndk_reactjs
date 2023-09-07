import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faBackwardStep,
    faEllipsis,
    faForwardStep,
    faMicrophone,
    faRepeat,
    faShuffle,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
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
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/d/5/8/a/d58aa48a38c0a8dc89c95277b456bc75.jpg"
                                    alt=""
                                />
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
                                        Gác Lại Âu Lo
                                    </a>
                                    <div className="fs-13 f-family subtitle_color">
                                        <a
                                            href="#"
                                            className={` subtitle_color is_truncate`}
                                        >
                                            Da LAB
                                        </a>
                                        ,
                                        <a
                                            href="#"
                                            className={`ms-1 subtitle_color is_truncate`}
                                        >
                                            Miu Lê
                                        </a>
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
                                    <FontAwesomeIcon icon={faEllipsis} />
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
                                <FontAwesomeIcon icon={faBackwardStep} />
                            </a>
                            <a
                                href=""
                                className="fs-1 ms-3 me-3 text-white rounded-circle d-flex align-items-center justify-content-center square_30"
                            >
                                <FontAwesomeIcon icon={faCirclePlay} />
                                {/* <FontAwesomeIcon icon={faCirclePause} /> */}
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
                                <div className={`${cx('duration')}`}></div>
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
                            href=""
                            className="ms-3 me-2 text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                        >
                            <FontAwesomeIcon icon={faMicrophone} />
                        </a>
                        <div className={`${cx('')} d-flex align-items-center `}>
                            <a
                                href=""
                                className="text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                            >
                                <FontAwesomeIcon icon={faVolumeHigh} />
                            </a>
                            <div>
                                <div
                                    className={`${cx('duration', 'sound')}`}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
