import CardSongItem from '../CardSongItem';
import Receptacle from '../Receptacle';
import styles from './MyAlbum.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MyAlbum({ data }) {
    return (
        <div className={`${cx('wrapper')} mt-4`}>
            <div className="row">
                {data.map((item) => (
                    <CardSongItem key={item.id} data={item} type="album" />
                ))}
            </div>
        </div>
    );
}

export default MyAlbum;
