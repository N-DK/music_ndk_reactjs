import { faCirclePlay, faHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './CardSongItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CardSongItem({ data, isSlider, type }) {
    return (
        <div
            className={`${
                isSlider ? '' : 'col-2-4 col-md-3 col-sm-4 col-xs-6'
            }`}
        >
            <div
                className={`${cx(
                    'wrapper',
                )} overflow-hidden rounded-3 mb-2 mt-1`}
            >
                <div
                    className={`${cx(
                        'thumbnail__container',
                    )} overflow-hidden position-relative`}
                >
                    <img src={data.thumbnail} alt="" className="w-100 h-100" />
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
                        <Link
                            to={`/album/${data.id}?type=${type}`}
                            className="fs-1 ms-4 me-4 text-white rounded-circle d-flex align-items-center justify-content-center square_30"
                        >
                            <FontAwesomeIcon icon={faCirclePlay} />
                        </Link>
                        <a
                            href=""
                            className="text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                        >
                            <FontAwesomeIcon icon={faEllipsis} />
                        </a>
                    </div>
                </div>
                <div
                    className={` text-center pt-4 pb-4 p-2 border rounded-3 border-top-0 rounded-top-0 f-family`}
                >
                    <a
                        href="#"
                        className={`${cx(
                            'text',
                        )} mb-1 d-block text-decoration-none text-black`}
                    >
                        {data.name}
                    </a>
                    {type !== 'playlist' && (
                        <a
                            href="#"
                            className={`${cx(
                                'text',
                            )} subtitle_color  is_truncate`}
                        >
                            {data.artists.map((artist, index) => (
                                <span className="pe-1" key={artist.id}>
                                    {artist.name}
                                </span>
                            ))}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CardSongItem;
