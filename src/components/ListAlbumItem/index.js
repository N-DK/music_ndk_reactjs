import styles from './ListAlbumItem.module.scss';
import classNames from 'classnames/bind';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
    faDownload,
    faEllipsis,
    faHeart,
    faLink,
    faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import clipboard from 'clipboard-copy';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { reducer, setListSongs, setMessage } from '~/redux_';
import axios from 'axios';

const cx = classNames.bind(styles);

function ListAlbumItem({ data, playlist, user }) {
    const [visible, setVisible] = useState(false);
    const [like, setLike] = useState(false);
    useSelector(() => reducer);
    const dispatch = useDispatch();

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const handleDistanceTwoDays = () => {
        // Tạo hai đối tượng Date
        const releaseDate = new Date(data.createdDate);
        const currentDate = new Date();

        // Tính toán khoảng cách giữa hai ngày (kết quả sẽ ở đơn vị milliseconds)
        const timeDifference = currentDate.getTime() - releaseDate.getTime();

        // Chuyển đổi milliseconds sang số ngày
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        return convertDate(parseInt(daysDifference));
    };

    const convertDate = (date) => {
        if (date === 0) return 'Today';
        else if (date === 1) return 'Yesterday';
        else if (date >= 2 && date <= 6) return `${date} days before`;
        else if (date >= 7 && date < 30)
            return `${parseInt(date / 7)} week ago`;
        else if (date > 31) return `${parseInt(date / 30)} month ago`;
    };

    const handleCheckExist = (id) => {
        if (user) {
            const wishlist = user.albums;
            return wishlist.find((wish) => wish.id === id) ? true : false;
        }
    };

    const handleLike = () => {
        if (user) {
            setLike(!like);
            if (!like) {
                axios.put(`http://localhost:8080/api/user/${user.id}`, {
                    album: [data.id],
                    roleCode: user.roleCode,
                });
            } else {
                axios.delete(
                    `http://localhost:8080/api/user/${user.id}?type=album&type_id=${data.id}`,
                );
            }
        }
    };

    const createMessCopied = () => (
        <div className={` bg-white rounded-2 f-family p-3 ${cx('message')}`}>
            Link đã được sao chép vào clipboard
        </div>
    );

    const createMess = (content) => (
        <div className={` bg-white rounded-2 f-family p-3 ${cx('message')}`}>
            {content}
        </div>
    );

    const handleCopyToClipboard = () => {
        clipboard(`http://localhost:3001/album/${data.id}?type=album`);
        dispatch(setMessage(createMessCopied()));
        setTimeout(() => {
            dispatch(setMessage());
        }, 2000);
    };

    const handleIntoPlaylist = () => {
        for (let song of data.songs) {
            if (!song.album) {
                song.albums = [{ id: data.id }];
            }
        }
        let res = playlist ? [...playlist] : [...data.songs];
        if (playlist) {
            for (const item of data.songs) {
                const isExist = playlist.find((pl) => item.id === pl.id);
                if (!isExist) {
                    res.push(item);
                }
            }
        }
        dispatch(setListSongs(res));
        dispatch(
            setMessage(
                createMess(
                    `Đã thêm ${data.songs.length} bài hát vào danh sách phát`,
                ),
            ),
        );
        setTimeout(() => {
            dispatch(setMessage());
        }, 2000);
    };

    useEffect(() => {
        if (user) {
            setLike(handleCheckExist(data.id));
        }
    }, [user, data.id]);

    return (
        <>
            <div
                className={`pt-3 pb-3 border-bottom ${cx(
                    'wrapper',
                )} rounded-3 p-3`}
            >
                <div className=" position-relative">
                    <div className="row align-items-center">
                        <div className=" col-xl-7">
                            <div className="  ">
                                <div className="d-flex align-items-center ">
                                    <div
                                        className={` position-relative ${cx(
                                            'thumbnail',
                                        )}`}
                                    >
                                        <figure
                                            className={`${cx(
                                                'img-thumbnail',
                                            )} rounded-2 overflow-hidden w-100 h-100 mb-0`}
                                        >
                                            <img
                                                className="w-100 h-100"
                                                src={data.thumbnail}
                                                alt=""
                                            />
                                        </figure>
                                        <div
                                            className={`position-absolute start-0 top-0 w-100 h-100 ${cx(
                                                'disc',
                                            )}`}
                                        >
                                            <img
                                                className="w-100 h-100"
                                                src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/album-disk.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="ms-4">
                                        <h6>
                                            <Link
                                                to={`http://localhost:3001/album/${data.id}?type=album`}
                                                className=" text-decoration-none text--primary"
                                            >
                                                {data.name}
                                            </Link>
                                        </h6>
                                        <div>
                                            {data.artists &&
                                                data.artists.map(
                                                    (artist, index) => {
                                                        let artist_name =
                                                            artist.name;
                                                        if (
                                                            artist !==
                                                            data.artists[
                                                                data.artists
                                                                    .length - 1
                                                            ]
                                                        ) {
                                                            artist_name += ',';
                                                        }
                                                        return (
                                                            <Link
                                                                className="fs-13 subtitle_color is_truncate pe-1"
                                                                key={artist.id}
                                                                to={`/artist/${artist.id}`}
                                                            >
                                                                {artist_name}
                                                            </Link>
                                                        );
                                                    },
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-xl-5">
                            <span>{handleDistanceTwoDays()}</span>
                        </div>
                    </div>
                    <div className={``}>
                        <div
                            className={`position-absolute h-100 end-0 top-0 ${cx(
                                'actions',
                            )}`}
                        >
                            <HeadlessTippy
                                interactive
                                visible={visible}
                                placement="bottom"
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
                                            <ul className="mb-0 p-0 fs-15">
                                                <li
                                                    // onClick={handleCopyToClipboard}
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
                                                    <span>Copy link</span>
                                                </li>
                                                <li
                                                    onClick={handleIntoPlaylist}
                                                    className={`d-flex align-items-center p-3 pt-2 pb-2 ${cx(
                                                        'more__item',
                                                    )}`}
                                                >
                                                    <FontAwesomeIcon
                                                        className="me-2"
                                                        icon={faSquarePlus}
                                                    />
                                                    <span>Add to playlist</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                onClickOutside={hide}
                            >
                                <div className="d-flex align-items-center justify-content-end h-100">
                                    <nav
                                        data-bs-toggle={!user && 'modal'}
                                        data-bs-target={!user && '#modalLogin'}
                                        onClick={handleLike}
                                        className={`pointer me-3 ${cx(
                                            `${like ? 'liked' : ''}`,
                                        )}`}
                                    >
                                        <i>
                                            <FontAwesomeIcon
                                                icon={
                                                    like
                                                        ? faHeart
                                                        : faHeartRegular
                                                }
                                            />
                                        </i>
                                    </nav>
                                    <nav onClick={show} className="pointer">
                                        <i>
                                            <FontAwesomeIcon
                                                icon={faEllipsis}
                                            />
                                        </i>
                                    </nav>
                                </div>
                            </HeadlessTippy>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    if (state) {
        return {
            playlist: state.songs,
        };
    }
};

export default connect(mapStateToProps)(ListAlbumItem);
