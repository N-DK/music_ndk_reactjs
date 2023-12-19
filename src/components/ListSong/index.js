import styles from './ListSong.module.scss';
import classNames from 'classnames/bind';
import ListSongItem from '../ListSongItem';

const cx = classNames.bind(styles);

function ListSong({ isShowAlbums, data, album_id }) {
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
                />
            ))}
        </div>
    );
}

export default ListSong;
