import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './CardSongItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CardSongItem() {
    return (
        <div className="col-2-4">
            <div className={`${cx('wrapper')} overflow-hidden rounded-3 mb-3`}>
                <div
                    className={`${cx(
                        'thumbnail__container',
                    )} overflow-hidden position-relative`}
                >
                    <img
                        src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/d/5/8/a/d58aa48a38c0a8dc89c95277b456bc75.jpg"
                        alt=""
                        className="w-100 h-100"
                    />
                    <div
                        className={`${cx(
                            'action__container',
                        )} position-absolute w-100 h-100 start-0 top-0 d-flex align-items-center justify-content-center`}
                    >
                        <a
                            href=""
                            className="text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                        >
                            <FontAwesomeIcon icon={faHeart} />
                        </a>
                        <a
                            href=""
                            className="fs-1 ms-4 me-4 text-white rounded-circle d-flex align-items-center justify-content-center square_30"
                        >
                            <FontAwesomeIcon icon={faCirclePlay} />
                        </a>
                        <a
                            href=""
                            className="text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                        >
                            <FontAwesomeIcon icon={faEllipsis} />
                        </a>
                    </div>
                </div>
                <div
                    className={` text-center pt-4 pb-4 border rounded-3 border-top-0 rounded-top-0 f-family`}
                >
                    <a
                        href="#"
                        className="mb-1 d-block text-decoration-none text-black"
                    >
                        Cheese (Single)
                    </a>
                    <a href="#" className="subtitle_color  is_truncate">
                        Cravity
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CardSongItem;
