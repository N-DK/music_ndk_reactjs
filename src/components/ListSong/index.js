import styles from './ListSong.module.scss';
import classNames from 'classnames/bind';
import ListSongItem from '../ListSongItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getUser } from '~/utils/getUser';

const cx = classNames.bind(styles);

function ListSong({
    isShowAlbums,
    data,
    album_id,
    handleRemoveSongInPlaylist,
}) {
    const [user, setUser] = useState();
    const [allowEdit, setAllowEdit] = useState(false);

    const handleCheckExistPlaylist = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/playlist/user/${user.id}`,
            );

            return res.data.results;
        } catch (error) {}
    };

    useEffect(() => {
        const fetch = async () => {
            const user = await getUser();
            if (!user) {
                Cookies.remove('token');
            } else {
                setUser(user);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        if (user) {
            const fetch = async () => {
                const fetchAPICheckPlaylist = await handleCheckExistPlaylist();
                const playlistOfUser = fetchAPICheckPlaylist.find(
                    (item) => item.id == album_id,
                );
                setAllowEdit(playlistOfUser ? true : false);
            };

            fetch();
        }
    }, [user]);

    return (
        <div className={`${cx('wrapper')} mt-4`}>
            <div className="container">
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
            {data.map((song, index) => (
                <ListSongItem
                    isShowAlbum={isShowAlbums}
                    key={index}
                    song={song}
                    songs={data}
                    album_id={album_id}
                    user={user}
                    allowEdit={allowEdit}
                    onClick={() => handleRemoveSongInPlaylist(song.id)}
                />
            ))}
        </div>
    );
}

export default ListSong;
