import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './SongItem.module.scss';
import classNames from 'classnames/bind';
import {
    faEllipsis,
    faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function SongItem({ colorTextBlack }) {
    return (
        <div className={`${cx('wrapper')} d-flex align-items-center pb-2 pt-2`}>
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
                    <div className={`${cx('song__container--name')} pe-3`}>
                        <a
                            href="#"
                            className={`${cx(
                                ' text-decoration-none text-truncate',
                            )} ${
                                colorTextBlack ? 'text-black' : 'text-white'
                            } f-family`}
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
                </div>
            </div>
            <h5
                className={`${
                    colorTextBlack ? 'text-black' : 'text-white'
                } f-family m-0 ms-5 me-5`}
            >
                9:52
            </h5>
            <a
                href=""
                className={`ms-4 me-4 ${
                    colorTextBlack ? 'text-black' : 'text-white'
                } rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30`}
            >
                <FontAwesomeIcon className="fs-5" icon={faHeart} />
            </a>
            <a
                href=""
                className={`fs-2 ms-4 me-4 ${
                    colorTextBlack ? 'text-black' : 'text-white'
                } rounded-circle d-flex align-items-center justify-content-center square_30`}
            >
                <FontAwesomeIcon icon={faCirclePlay} />
                {/* <FontAwesomeIcon icon={faCirclePause} /> */}
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

export default SongItem;
