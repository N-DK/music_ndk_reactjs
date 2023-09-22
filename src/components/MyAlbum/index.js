import CardSongItem from '../CardSongItem';
import Receptacle from '../Receptacle';
import styles from './MyAlbum.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MyAlbum({ data }) {
    // call api
    return (
        <div className={`${cx('wrapper')} mt-4`}>
            <CardSongItem />
        </div>
    );
}

export default MyAlbum;
