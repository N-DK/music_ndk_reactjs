import {
    faCirclePlay,
    faHeart as faHeartRegular,
} from '@fortawesome/free-regular-svg-icons';
import styles from './CardSongItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload,
    faEllipsis,
    faHeart,
    faLink,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import clipboard from 'clipboard-copy';
import HeadlessTippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function CardSongItem({ data, isSlider, type }) {
    const token = Cookies.get('token');
    const [like, setLike] = useState(false);
    const [user, setUser] = useState();
    const [visible, setVisible] = useState(false);
    const [mess, setMess] = useState();

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:8080/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => setUser(res.data))
                .catch((err) => {
                    Cookies.remove('token');
                    console.log(err);
                });
        }
    }, [token]);

    const handleLike = () => {
        if (user && token) {
            setLike(!like);
            if (!like) {
                axios.put(`http://localhost:8080/api/user/${user.id}`, {
                    [type]: [data.id],
                });
            } else {
                axios.delete(
                    `http://localhost:8080/api/user/${user.id}?type=${type}&type_id=${data.id}`,
                );
            }
        }
    };

    const handleCheckExist = (id) => {
        if (user) {
            const wishlist = type == 'album' ? user.albums : user.playlist;
            return wishlist.find((wish) => wish.id === id) ? true : false;
        }
    };

    const createMessCopied = () => (
        <div className={` bg-white rounded-2 f-family p-3 ${cx('message')}`}>
            Link đã được sao chép vào clipboard
        </div>
    );

    const handleCopyToClipboard = () => {
        clipboard(`http://localhost:3001/album/${data.id}?type=${type}`);
        setMess(createMessCopied);
        setTimeout(() => {
            setMess();
        }, 2000);
    };

    useEffect(() => {
        setLike(handleCheckExist(data.id));
    }, [user]);

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
                <HeadlessTippy
                    interactive
                    visible={visible}
                    placement="bottom-end"
                    render={(attrs) => (
                        <div
                            className=" bg-white rounded-1"
                            tabIndex="-1"
                            {...attrs}
                        >
                            <div
                                className={`pt-2 pb-2 rounded-1 f-family ${cx(
                                    'more__container',
                                )} bg-white `}
                            >
                                <ul className="mb-0 p-0">
                                    <li
                                        onClick={handleCopyToClipboard}
                                        className={`d-flex align-items-center p-3 pt-2 pb-2 ${cx(
                                            'more__item',
                                        )}`}
                                    >
                                        <FontAwesomeIcon
                                            className="me-2"
                                            icon={faDownload}
                                        />
                                        <span>Download</span>
                                    </li>
                                    <li
                                        onClick={handleCopyToClipboard}
                                        className={`d-flex align-items-center p-3 pt-2 pb-2 ${cx(
                                            'more__item',
                                        )}`}
                                    >
                                        <FontAwesomeIcon
                                            className="me-2"
                                            icon={faLink}
                                        />
                                        <span>Sao chép Link</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    onClickOutside={hide}
                >
                    <div
                        className={`${cx(
                            'thumbnail__container',
                        )} overflow-hidden position-relative`}
                    >
                        <img
                            src={data.thumbnail}
                            alt=""
                            className="w-100 h-100"
                        />
                        <div
                            className={`${cx(
                                'action__container',
                            )} position-absolute w-100 h-100 start-0 top-0 d-flex align-items-center justify-content-center`}
                        >
                            <Link
                                onClick={handleLike}
                                to=""
                                className={`rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30 ${cx(
                                    `${like ? 'liked' : 'like'}`,
                                )}`}
                            >
                                <FontAwesomeIcon
                                    icon={like ? faHeart : faHeartRegular}
                                />
                            </Link>
                            <Link
                                to={`/album/${data.id}?type=${type}`}
                                className="fs-1 ms-4 me-4 text-white rounded-circle d-flex align-items-center justify-content-center square_30"
                            >
                                <FontAwesomeIcon icon={faCirclePlay} />
                            </Link>
                            <Tippy content="Khác">
                                <Link
                                    onClick={show}
                                    className="text-white rounded-circle d-flex align-items-center is-hover-circle justify-content-center square_30"
                                >
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </Link>
                            </Tippy>
                        </div>
                    </div>
                </HeadlessTippy>
                <div
                    className={` text-center pt-4 pb-4 p-2 border rounded-3 border-top-0 rounded-top-0 f-family`}
                >
                    <Link
                        to={`/album/${data.id}?type=${type}`}
                        className={`${cx(
                            'text',
                        )} mb-1 d-block text-decoration-none text-black`}
                    >
                        {data.name}
                    </Link>
                    {type !== 'playlist' &&
                        data.artists &&
                        data.artists.map((artist, index) => {
                            let artist_name = artist.name;
                            if (
                                artist !== data.artists[data.artists.length - 1]
                            ) {
                                artist_name += ',';
                            }
                            return (
                                <Link
                                    key={index}
                                    to={`/artist/${artist.id}`}
                                    className={`${cx(
                                        'text',
                                    )} subtitle_color  is_truncate pe-1`}
                                >
                                    {artist_name}
                                </Link>
                            );
                        })}
                </div>
            </div>
            <div
                style={{ zIndex: 9999 }}
                className=" position-fixed start-0 bottom-0 m-3"
            >
                {mess}
            </div>
        </div>
    );
}

export default CardSongItem;
