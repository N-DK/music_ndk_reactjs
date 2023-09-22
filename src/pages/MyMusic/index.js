import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MyMusic.module.scss';
import classNames from 'classnames/bind';
import {
    faChevronRight,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import CardSongItem from '~/components/CardSongItem';
import { useState } from 'react';
import SongItem from '~/components/SongItem';
import ListSong from '~/components/ListSong';
import MyAlbum from '~/components/MyAlbum';

const cx = classNames.bind(styles);

const items = [
    {
        name: 'Song',
        id: 1,
    },
    {
        name: 'Album',
        id: 2,
    },
];

function MyMusic() {
    const [item, setItem] = useState(1);

    return (
        <div className={`${cx('wrapper')} pt-4`}>
            <div className={`${cx('playlist__container')} mb-5`}>
                <div
                    className={` d-flex align-items-center justify-content-between mb-3`}
                >
                    <div className={` d-flex align-items-center`}>
                        <p
                            className={` text-uppercase f-family fw-bold m-0 fs-5`}
                        >
                            playlist
                        </p>
                        <a
                            href="#"
                            className="ms-2 f-family text-black fs-5 d-flex align-items-center text-decoration-none"
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </a>
                    </div>
                    <a
                        href="#"
                        className="f-family text--primary d-flex align-items-center text-decoration-none"
                    >
                        <span className="me-2">View more</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                </div>
                <div className={` row`}>
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                </div>
            </div>
            <div>
                <div className={`border-bottom pb-2`}>
                    {items.map((v, i) => (
                        <a
                            key={i}
                            className={`f-family text-dark text-uppercase text-decoration-none d-inline-block me-4 ${
                                v.id == item && `${cx('active')}`
                            }`}
                            onClick={() => setItem(v.id)}
                        >
                            {v.name}
                        </a>
                    ))}
                </div>
                <div className="">{item == 1 ? <ListSong /> : <MyAlbum />}</div>
            </div>
        </div>
    );
}

export default MyMusic;
