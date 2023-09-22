import { faHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './ListSong.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faMicrophone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ListSong({ data }) {
    // call api data

    return (
        <div className={`${cx('wrapper')} mt-4`}>
            <div className="container mb-3">
                <div className={`row border-bottom`}>
                    <div className="col-5">
                        <p className={` text-uppercase f-family`}>Song</p>
                    </div>
                    <div className="col-5">
                        <p className={` text-uppercase f-family`}>Album</p>
                    </div>
                    <div className="col-2">
                        <p className={` text-uppercase f-family text-end`}>
                            Times
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mb-3">
                <div className={`row border-bottom pb-3`}>
                    <div className="col-5">
                        <div className={` d-flex align-items-center `}>
                            <div
                                className={` overflow-hidden rounded-2 ${cx(
                                    'thumbnail',
                                )}`}
                            >
                                <a href="#" className={` d-block`}>
                                    <img
                                        src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/6/d/9/6/6d961b2a82f151a0f9af7de928e8f809.jpg"
                                        alt=""
                                        className="w-100 h-100"
                                    />
                                </a>
                            </div>
                            <div className="ms-3">
                                <p className={`${cx('')} m-0 f-family`}>
                                    À lôi
                                </p>
                                <div className="fs-13 f-family subtitle_color">
                                    <a
                                        href="#"
                                        className={` subtitle_color is_truncate`}
                                    >
                                        Double2T
                                    </a>
                                    ,
                                    <a
                                        href="#"
                                        className={`ms-1 subtitle_color is_truncate`}
                                    >
                                        Masew
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <a
                            href="#"
                            className={`ms-1 subtitle_color is_truncate d-flex align-items-center h-100`}
                        >
                            À Lôi (Single)
                        </a>
                    </div>
                    <div className="col-2">
                        <div
                            className={`${cx(
                                '',
                            )} d-flex align-items-center h-100 justify-content-end`}
                        >
                            <a
                                href=""
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
                            <p className={`ms-1 mb-0 f-family`}>03:17</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListSong;
