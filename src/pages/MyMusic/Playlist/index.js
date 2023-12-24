import { useEffect, useState } from 'react';
import styles from './Playlist.module.scss';
import classNames from 'classnames/bind';
import CardSongItem from '~/components/CardSongItem';
import Loading from '~/components/Loading';
import Cookies from 'js-cookie';
import { getUser } from '~/utils/getUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import ModalConfirm from '../ModalConfirm';
import axios from 'axios';

const cx = classNames.bind(styles);

function Playlist() {
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    const [user, setUser] = useState();
    const [turnModal, setTurnModal] = useState(false);
    const [id, setId] = useState();

    const handleConfirmUnLike = () => {
        if (user) {
            axios
                .delete(
                    `http://localhost:8080/api/user/${user.id}?type=playlist&type_id=${id}`,
                )
                .then((res) => {
                    setUser(res.data);
                    setTurnModal(false);
                });
        }
    };

    const handleUnLike = (id) => {
        setTurnModal(true);
        setId(id);
    };

    const handleActive = (route) => {
        return slug === route;
    };

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const user = await getUser();
            if (!user) {
                Cookies.remove('token');
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        fetch();
    }, []);

    useEffect(() => {
        if (user) {
            if (slug) {
                setPlaylists((prev) =>
                    prev.filter((item) => item.createdBy === user.email),
                );
            } else {
                setPlaylists(user.playlist);
            }
        }
    }, [slug, user]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} f-family`}>
                    <div className="mb-3 pt-3">
                        <div className="border-bottom d-flex align-items-center pb-2">
                            <h4 className="mb-0 p-2 pe-3 border-end fw-semibold">
                                Playlist
                            </h4>
                            <div className="ms-3">
                                <Link
                                    to="/mymusic/playlist"
                                    className={` text-decoration-none p-3 me-3 pointer fw-medium ${cx(
                                        `${
                                            handleActive()
                                                ? 'active'
                                                : 'un_active'
                                        }`,
                                    )}`}
                                >
                                    ALL
                                </Link>
                                <Link
                                    to="/mymusic/playlist/owner"
                                    className={` text-decoration-none p-3 pointer fw-medium ${cx(
                                        `${
                                            handleActive('owner')
                                                ? 'active'
                                                : 'un_active'
                                        }`,
                                    )}`}
                                >
                                    MY PLAYLIST
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-2-4 col-md-3 col-sm-4 col-xs-6 h-100">
                                <div
                                    className={` mt-1 mb-2 position-relative h-100 border rounded-3 ${cx(
                                        'empty__playlist',
                                    )}`}
                                >
                                    <Link
                                        data-bs-toggle={'modal'}
                                        data-bs-target={
                                            !user
                                                ? '#modalLogin'
                                                : '#modalPlaylist'
                                        }
                                        className=" text-decoration-none position-absolute w-100  d-flex h-100 flex-column align-items-center justify-content-center"
                                    >
                                        <i>
                                            <FontAwesomeIcon
                                                className="fs-1 mb-2"
                                                icon={faPlusCircle}
                                            />
                                        </i>
                                        <span>Create new playlist</span>
                                    </Link>
                                </div>
                            </div>
                            {playlists.map((playlist) => (
                                <CardSongItem
                                    key={playlist.id}
                                    data={playlist}
                                    type="playlist"
                                    onClick={() => handleUnLike(playlist.id)}
                                />
                            ))}
                        </div>
                    </div>
                    {turnModal && (
                        <ModalConfirm
                            turnOffModal={() => setTurnModal(false)}
                            handleConfirm={handleConfirmUnLike}
                        />
                    )}
                </div>
            )}
        </>
    );
}

export default Playlist;
