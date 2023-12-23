import styles from './ReceptacleTippy.module.scss';
import classNames from 'classnames/bind';

import {
    faAngleRight,
    faCirclePlus,
    faCompactDisc,
    faDownload,
    faLink,
    faPodcast,
} from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
import clipboard from 'clipboard-copy';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reducer, setMessage } from '~/redux_';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function ReceptacleTippy({
    children,
    song,
    hide,
    visible,
    user,
    handlePlay,
    album_id,
    placement,
    allowEdit,
    onClick,
}) {
    const [playlist, setPlaylist] = useState([]);
    const [downloading, setDownloading] = useState(false);
    const [searchPlaylist, setSearchPlaylist] = useState('');
    useSelector(() => reducer);
    const dispatch = useDispatch();

    const handleDownload = (url, title) => {
        setDownloading(true);
        axios({
            url,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const blob = new Blob([response.data], { type: 'audio/mp3' });
            saveAs(blob, title + '.mp3');
            setDownloading(false);
        });
    };

    const createMessageAddSuccess = (title) => (
        <div className={` bg-white rounded-2 f-family p-3 ${cx('message')}`}>
            Đã thêm bài hát “<span className=" fw-bold">{title}</span>” vào
            playlist thành công
        </div>
    );

    const createMessCopied = () => (
        <div className={` bg-white rounded-2 f-family p-3 ${cx('message')}`}>
            Link đã được sao chép vào clipboard
        </div>
    );

    const handleCopyToClipboard = () => {
        clipboard(
            `http://localhost:3001/album/${
                song.albums ? song.albums[0].id : album_id
            }?type=album`,
        );
        dispatch(setMessage(createMessCopied()));
        setTimeout(() => {
            dispatch(setMessage());
        }, 2000);
    };

    const handleIntoPlayList = (id) => {
        axios
            .put(`http://localhost:8080/api/playlist/addToPlaylist/${id}`, {
                favoriteSong: [song.title],
                thumbnail: song.thumbnail,
            })
            .then((res) => {
                dispatch(setMessage(createMessageAddSuccess(song.title)));
                setTimeout(() => {
                    dispatch(setMessage());
                }, 2000);
            })
            .then((err) => console.log(err));
    };

    useEffect(() => {
        if (user) {
            axios
                .get(`http://localhost:8080/api/playlist/user/${user.id}`)
                .then((res) => setPlaylist(res.data.results))
                .catch((err) => console.log(err));
        }
    }, [user]);

    return (
        <HeadlessTippy
            placement="top-start"
            interactive
            visible={visible}
            render={(attrs) => (
                <div
                    className={` box bg-white rounded-2 text-dark ${cx('')}`}
                    tabIndex="-1"
                    {...attrs}
                >
                    <div
                        className={`rounded-2 f-family ${cx(
                            'more__container',
                        )}`}
                    >
                        <div className="d-flex align-items-center p-3 pb-0">
                            <figure className="w-25 h-25 rounded-1 overflow-hidden mb-0 me-2">
                                <img
                                    src={song.thumbnail}
                                    alt=""
                                    className="w-100 h-100"
                                />
                            </figure>
                            <div>
                                <Link
                                    to={`/album/${
                                        song.albums
                                            ? song.albums[0].id
                                            : album_id
                                    }?type=album`}
                                    className={`fs-13 text-decoration-none text-dark text--primary ${cx(
                                        '',
                                    )} m-0`}
                                >
                                    {song.title}
                                </Link>
                                <div className="fs-13 f-family subtitle_color">
                                    {song.artists &&
                                        song.artists.map((artist, index) => {
                                            let artist_name = artist.name;
                                            if (
                                                artist !==
                                                song.artists[
                                                    song.artists.length - 1
                                                ]
                                            ) {
                                                artist_name += ',';
                                            }
                                            return (
                                                <Link
                                                    key={artist.id}
                                                    to={`/artist/${artist.id}`}
                                                    className={` subtitle_color is_truncate pe-1`}
                                                >
                                                    {artist_name}
                                                </Link>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className="p-3 pb-2">
                            <div
                                onClick={() =>
                                    handleDownload(
                                        song.audioUrl,
                                        'NDK - ' + song.title,
                                    )
                                }
                                className={`text-decoration-none rounded-2 d-flex justify-content-center align-items-center rounded-2 bg--primary ${cx(
                                    'down_btn',
                                    'pointer',
                                )}`}
                            >
                                {downloading ? (
                                    <img
                                        src="https://res.cloudinary.com/dmvyx3gwr/image/upload/v1701431805/loading-circle-5662747-4719071-unscreen_y4rshy.gif"
                                        alt=""
                                        className="h-25 w-25"
                                    />
                                ) : (
                                    <div className="d-flex flex-column p-1">
                                        <FontAwesomeIcon icon={faDownload} />
                                        <span className="fs-13 mt-1">
                                            Download
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <ul className=" list-unstyled fs-15">
                            <HeadlessTippy
                                interactive
                                placement={placement ?? 'right'}
                                render={(attrs) => (
                                    <div
                                        tabIndex="-1"
                                        className=" rounded-1 f-family bg-white fs-15"
                                        {...attrs}
                                    >
                                        <div
                                            className={`bg-white rounded-1 ${cx(
                                                'add__playlist',
                                            )}`}
                                        >
                                            <div className=" ps-3 pe-3 pt-3 mb-2">
                                                <input
                                                    value={searchPlaylist}
                                                    className="rounded-5 border w-100 ps-3 pe-3"
                                                    placeholder="Find playlist"
                                                    onChange={(e) =>
                                                        setSearchPlaylist(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div
                                                onClick={hide}
                                                data-bs-toggle={'modal'}
                                                data-bs-target={
                                                    !user
                                                        ? '#modalLogin'
                                                        : '#modalPlaylist'
                                                }
                                                className={`d-flex align-items-center p-3 pt-2 pb-2 ${cx(
                                                    'more__item',
                                                )}`}
                                            >
                                                <img
                                                    src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.108/static/media/thumb-add.2971eb21.svg"
                                                    alt=""
                                                />
                                                <span className="ms-2">
                                                    Create new playlist
                                                </span>
                                            </div>
                                            <ul className=" list-unstyled">
                                                {playlist
                                                    .filter((item) =>
                                                        item.name
                                                            .toLowerCase()
                                                            .includes(
                                                                searchPlaylist.toLowerCase(),
                                                            ),
                                                    )
                                                    .map((pl) => (
                                                        <li
                                                            key={pl.id}
                                                            onClick={() =>
                                                                handleIntoPlayList(
                                                                    pl.id,
                                                                )
                                                            }
                                                            className={`p-3 pt-2 pb-2 ${cx(
                                                                'more__item',
                                                            )}`}
                                                        >
                                                            <div className="d-flex align-items-center">
                                                                <FontAwesomeIcon
                                                                    style={{
                                                                        fontSize: 20,
                                                                    }}
                                                                    className="me-2"
                                                                    icon={
                                                                        faCompactDisc
                                                                    }
                                                                />
                                                                <span>
                                                                    {pl.name}
                                                                </span>
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            >
                                <li
                                    className={`d-flex align-items-center justify-content-between p-3 pt-2 pb-2 ${cx(
                                        'more__item',
                                    )}`}
                                >
                                    <div>
                                        <FontAwesomeIcon
                                            className="me-2"
                                            icon={faCirclePlus}
                                        />
                                        <span>Add to playlist</span>
                                    </div>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </li>
                            </HeadlessTippy>
                            <li
                                className={`d-flex align-items-center p-3 pt-2 pb-2 ${cx(
                                    'more__item',
                                )}`}
                                onClick={handlePlay}
                            >
                                <FontAwesomeIcon
                                    className="me-2"
                                    icon={faPodcast}
                                />
                                <span>Play similar content</span>
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
                                <span>Copy link</span>
                            </li>
                            {allowEdit && (
                                <li
                                    onClick={onClick}
                                    className={`d-flex align-items-center p-3 pt-2 pb-2 ${cx(
                                        'more__item',
                                    )}`}
                                >
                                    <FontAwesomeIcon
                                        className="me-2"
                                        icon={faTrashCan}
                                    />
                                    <span>Remove from this playlist</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
            onClickOutside={hide}
        >
            {children}
        </HeadlessTippy>
    );
}

export default ReceptacleTippy;
