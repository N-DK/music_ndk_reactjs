import ListSong from '~/components/ListSong';
import styles from './Album.module.scss';
import classNames from 'classnames/bind';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '~/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload,
    faEllipsis,
    faLink,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import clipboard from 'clipboard-copy';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { reducer, setMessage } from '~/redux_';

const cx = classNames.bind(styles);

function Album() {
    const token = Cookies.get('token');
    const [user, setUser] = useState();
    const [data, setData] = useState([]);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [liked, setLiked] = useState(false);
    let { id } = useParams();
    const { search } = useLocation();
    const param = new URLSearchParams(search);
    const type = param.get('type');
    useSelector(() => reducer);
    const dispatch = useDispatch();

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const formatDate = (date) => {
        const dateTime = new Date(date);
        return `${dateTime.getDate()}/${
            dateTime.getMonth() + 1
        }/${dateTime.getFullYear()}`;
    };

    const handleLike = () => {
        if (user && token) {
            setLiked(!liked);
            if (!liked) {
                axios.put(`http://localhost:8080/api/user/${user.id}`, {
                    [type]: [id],
                });
            } else {
                axios.delete(
                    `http://localhost:8080/api/user/${user.id}?type=${type}&type_id=${id}`,
                );
            }
        }
    };

    const handleCheckExist = (id) => {
        if (user) {
            const wishlist = type == 'album' ? user.albums : user.playlist;
            return wishlist.find((wish) => wish.id === Number(id))
                ? true
                : false;
        }
    };

    const createMessCopied = () => (
        <div className={` bg-white rounded-2 f-family p-3 ${cx('message')}`}>
            Link đã được sao chép vào clipboard
        </div>
    );

    const handleCopyToClipboard = () => {
        clipboard(`http://localhost:3001/album/${id}?type=${type}`);
        dispatch(setMessage(createMessCopied));
        setTimeout(() => {
            dispatch(setMessage());
        }, 2000);
    };

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:8080/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.data === '') {
                        Cookies.remove('token');
                    } else {
                        setUser(res.data);
                    }
                })
                .catch((err) => {
                    Cookies.remove('token');
                    console.log(err);
                });
        }
    }, [token]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/${type}/${id}`)
            .then((res) => {
                setData(res.data.results);
                if (res.data.results[0].songs) {
                    setSongs(res.data.results[0].songs);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [type, id]);

    useEffect(() => {
        setLiked(handleCheckExist(id));
    }, [user]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} pt-5`}>
                    <div className={`${cx('')} row`}>
                        <div className="col-xl-4 col-md-4">
                            <div
                                className={` d-flex flex-column align-items-center justify-content-center ${cx(
                                    '',
                                )} text-center f-family`}
                            >
                                <div
                                    className={`${cx(
                                        'thumbnail',
                                    )} rounded-4 overflow-hidden w-75`}
                                >
                                    <img
                                        className="w-100 h-100"
                                        src={data[0].thumbnail}
                                        alt=""
                                    />
                                </div>
                                <p
                                    style={{ fontWeight: 600 }}
                                    className={`${cx(
                                        '',
                                    )} text-capitalize fs-5 mt-2 mb-2 mt-4`}
                                >
                                    {data[0].title || data[0].name}
                                </p>
                                <p className={`${cx('')} mb-2`}>
                                    <span>Update date: </span>
                                    {formatDate(data[0].modifiedDate)}
                                </p>
                                <div
                                    className={`${cx(
                                        'text',
                                    )} fs-13 f-family subtitle_color w-100`}
                                >
                                    {data[0].artists.map((artist, index) => (
                                        <Link
                                            key={index}
                                            to={`/artist/${artist.id}`}
                                            className={` subtitle_color is_truncate pe-1`}
                                        >
                                            {artist.name}
                                        </Link>
                                    ))}
                                </div>
                                <HeadlessTippy
                                    interactive
                                    visible={visible}
                                    placement="bottom-start"
                                    render={(attrs) => (
                                        <div
                                            className=" bg-white rounded-1 ms-5"
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
                                                        onClick={
                                                            handleCopyToClipboard
                                                        }
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
                                                        onClick={
                                                            handleCopyToClipboard
                                                        }
                                                        className={`d-flex align-items-center p-3 pt-2 pb-2 ${cx(
                                                            'more__item',
                                                        )}`}
                                                    >
                                                        <FontAwesomeIcon
                                                            className="me-2"
                                                            icon={faLink}
                                                        />
                                                        <span>
                                                            Sao chép Link
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    onClickOutside={hide}
                                >
                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                        <span
                                            onClick={handleLike}
                                            className="pointer text-dark rounded-circle d-flex align-items-center bg--gray justify-content-center square_40"
                                        >
                                            <FontAwesomeIcon
                                                className={`${
                                                    liked && 'color--primary'
                                                }`}
                                                icon={
                                                    liked
                                                        ? faHeart
                                                        : faHeartRegular
                                                }
                                            />
                                        </span>
                                        <Tippy content="Khác">
                                            <span
                                                onClick={show}
                                                className="ms-2 pointer text-dark rounded-circle d-flex align-items-center bg--gray justify-content-center square_40"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEllipsis}
                                                />
                                            </span>
                                        </Tippy>
                                    </div>
                                </HeadlessTippy>
                            </div>
                        </div>
                        <div className="col-xl-8 col-md-8">
                            <div
                                className={`${cx(
                                    'list-song__container',
                                )} f-family`}
                            >
                                {type === 'playlist' && (
                                    <p>
                                        <span className="subtitle_color pe-2">
                                            Preface
                                        </span>
                                        {data[0].name}
                                    </p>
                                )}
                                <ListSong
                                    isShowAlbums={type === 'playlist'}
                                    data={songs}
                                    album_id={data[0].id}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Album;
