import { useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import ListSong from '~/components/ListSong';
import CardSongItem from '~/components/CardSongItem';
import CardVideoSongItem from '~/components/CardVideoSongItem';
import CardArtist from '~/components/CardArtist';

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
    {
        name: 'Artist',
        id: 3,
    },
    {
        name: 'MV',
        id: 4,
    },
];

function Search() {
    const [item, setItem] = useState(1);

    return (
        <div className={`${cx('wrapper')} pt-4`}>
            <div className={`${cx('')} d-flex align-items-center`}>
                <div className={`border-bottom pb-2 w-100`}>
                    {items.map((v, i) => (
                        <a
                            href="#"
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
            </div>
            {item == 1 && <ListSong />}
            {item == 2 && (
                <div className="row mt-4">
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                </div>
            )}
            {item == 3 && (
                <div className="row mt-4">
                    <CardArtist />
                    <CardArtist />
                    <CardArtist />
                    <CardArtist />
                </div>
            )}
            {item == 4 && (
                <div className="row mt-4">
                    <CardVideoSongItem />
                    <CardVideoSongItem />
                    <CardVideoSongItem />
                    <CardVideoSongItem />
                </div>
            )}
        </div>
    );
}

export default Search;
