import styles from './ListSong.module.scss';
import classNames from 'classnames/bind';
import ListSongItem from '../ListSongItem';
import { connect, useDispatch, useSelector } from 'react-redux';
import { reducer, setListSongs } from '~/redux_';

const cx = classNames.bind(styles);

function ListSong({ isShowAlbums, data, album_id, playlist }) {
    useSelector(() => reducer);
    const dispatch = useDispatch();

    const handleListSongClick = () => {
        let res = playlist ? [...playlist] : [...data];
        if (playlist) {
            for (const item of data) {
                const isExist = playlist.find((pl) => item.id === pl.id);
                if (!isExist) {
                    res.push(item);
                }
            }
        }
        dispatch(setListSongs(res));
    };

    return (
        <div className={`${cx('wrapper')} mt-4`} onClick={handleListSongClick}>
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
                />
            ))}
        </div>
    );
}

const mapStateToProps = (state) => {
    if (state) {
        return {
            playlist: state.songs,
        };
    }
};

export default connect(mapStateToProps)(ListSong);
