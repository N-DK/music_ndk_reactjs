import { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import ListSong from '~/components/ListSong';
import CardSongItem from '~/components/CardSongItem';
import CardVideoSongItem from '~/components/CardVideoSongItem';
import CardArtist from '~/components/CardArtist';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

const items = [
    {
        name: 'song',
        id: 1,
    },
    {
        name: 'album',
        id: 2,
    },
    {
        name: 'artist',
        id: 3,
    },
];

function Search() {
    const [item, setItem] = useState(1);
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const { search } = useLocation();
    const param = new URLSearchParams(search);
    const query = param.get('query');

    useEffect(() => {
        let nav = items.find((i) => i.id === item);
        setLoading(true);
        axios
            .get(
                `http://localhost:8080/api/search/${nav.name}?page=1&query=${query}`,
            )
            .then((res) => {
                setResults(res.data.results);
                setLoading(false);
            })
            .catch((err) => setLoading(false));
    }, [item, query]);

    useEffect(() => {
        setItem(1);
    }, [query]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} pt-4`}>
                    <div className={`${cx('')} d-flex align-items-center`}>
                        <div className={`border-bottom pb-2 w-100`}>
                            {items.map((v, i) => (
                                <Link
                                    to={`/search/?query=${query}`}
                                    key={i}
                                    className={`f-family text-dark text-uppercase text-decoration-none d-inline-block me-4 ${
                                        v.id == item && `${cx('active')}`
                                    }`}
                                    onClick={() => setItem(v.id)}
                                >
                                    {v.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {item == 1 &&
                        (results.length > 0 ? (
                            <ListSong isShowAlbums={true} data={results} />
                        ) : (
                            <div className="d-flex align-items-center justify-content-center bg-light mt-4 p-4">
                                <div className="text-center">
                                    <div>
                                        <img
                                            src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.105/static/media/music-icon.cfa4aa91.svg"
                                            alt=""
                                        />
                                    </div>
                                    <span className="f-family mt-2 d-inline-block">
                                        No Songs found
                                    </span>
                                </div>
                            </div>
                        ))}
                    {item == 2 &&
                        (results.length > 0 ? (
                            <div className="row mt-4">
                                {results.map((song, index) => (
                                    <CardSongItem key={index} data={song} />
                                ))}
                            </div>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center bg-light mt-4 p-4">
                                <div className="text-center">
                                    <div>
                                        <img
                                            src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.105/static/media/dics-music-icon.3925fc01.svg"
                                            alt=""
                                        />
                                    </div>
                                    <span className="f-family mt-2 d-inline-block">
                                        No Albums found
                                    </span>
                                </div>
                            </div>
                        ))}
                    {item == 3 &&
                        (results.length > 0 ? (
                            <div className="row mt-4">
                                {results.map((song, index) => (
                                    <CardArtist key={index} data={song} />
                                ))}
                            </div>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center bg-light mt-4 p-4">
                                <div className="text-center">
                                    <div>
                                        <img
                                            src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.105/static/media/artist-icon.0b64fd14.svg"
                                            alt=""
                                        />
                                    </div>
                                    <span className="f-family mt-2 d-inline-block">
                                        No Artist found
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
}

export default Search;
