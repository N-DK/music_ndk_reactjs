import ListSong from '~/components/ListSong';
import styles from './Album.module.scss';
import classNames from 'classnames/bind';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Album() {
    const [data, setData] = useState([]);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    let { id } = useParams();
    const { search } = useLocation();
    const param = new URLSearchParams(search);
    const type = param.get('type');

    const formatDate = (date) => {
        const dateTime = new Date(date);
        return `${dateTime.getDate()}/${
            dateTime.getMonth() + 1
        }/${dateTime.getFullYear()}`;
    };

    const handleAddArtists = (data) => {
        let artists = [];

        for (const item of data) {
            item.songs.map((song) => {
                let artist = [...song.artists];
                for (let i = 0; i < artist.length; i++) {
                    if (
                        artists.length == 0 ||
                        artists[i].name !== artist[i].name
                    ) {
                        artists.push(artist[i]);
                    }
                }
            });
        }

        let results = data.map((item) => {
            return { ...item, artists };
        });

        return results;
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/${type}/${id}`)
            .then((res) => {
                if (type === 'playlist') {
                    setData(handleAddArtists(res.data.results));
                } else if (type === 'song' || 'thumbnail') {
                    setData(res.data.results);
                }
                if (res.data.results[0].songs) {
                    setSongs(res.data.results[0].songs);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [type, id]);
    return (
        <>
            {loading && data ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} pt-5`}>
                    <div className={`${cx('')} row`}>
                        <div className="col-xl-4 col-md-4">
                            <div
                                className={` d-flex flex-column align-items-center justify-content-center ${cx(
                                    '',
                                )} text-center f-family mb-3`}
                            >
                                <div
                                    className={`${cx(
                                        '',
                                    )} rounded-4 overflow-hidden w-75`}
                                >
                                    <img
                                        className="w-100 h-100"
                                        src={data[0].thumbnail}
                                        alt=""
                                    />
                                </div>
                                <p
                                    className={`${cx(
                                        '',
                                    )} text-capitalize fs-5 mt-2 mb-1`}
                                >
                                    {data[0].title || data[0].name}
                                </p>
                                <p className={`${cx('')} mb-1`}>
                                    <span>Update date: </span>
                                    {formatDate(data[0].modifiedDate)}
                                </p>
                                <div className="fs-13 f-family subtitle_color">
                                    {data[0].artists.map((artist, index) => (
                                        <Link
                                            key={index}
                                            to={`/artist/${artist.id}`}
                                            className={` subtitle_color is_truncate`}
                                        >
                                            {artist.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-md-8">
                            <div
                                className={`${cx(
                                    'list-song__container',
                                )} f-family`}
                            >
                                <p>
                                    <span className="subtitle_color">
                                        Preface
                                    </span>{' '}
                                    Thả mình vào những giai điệu Lofi Chill nghe
                                    là nghiện
                                </p>
                                <ListSong
                                    isShowAlbums={false}
                                    data={
                                        (type === 'song' && data) ||
                                        ((type === 'album' ||
                                            type === 'playlist') &&
                                            songs)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Album;
