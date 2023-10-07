import styles from './ListSong.module.scss';
import classNames from 'classnames/bind';
import ListSongItem from '../ListSongItem';

const cx = classNames.bind(styles);

function ListSong({ data }) {
    // call api data

    return (
        <div className={`${cx('wrapper')} mt-4`}>
            <div className="container mb-3">
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
                <ListSongItem key={index} song={song} songs={data} />
            ))}
        </div>
    );
}

export default ListSong;
