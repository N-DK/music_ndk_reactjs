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

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/${type}/${id}`)
            .then((res) => {
                setData(res.data.results);
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
            {loading ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} pt-5`}>
                    <div className={`${cx('')} row`}>
                        <div className="col-xl-4 col-md-4">
                            <div
                                className={` d-flex flex-column align-items-center justify-content-center ${cx(
                                    '',
                                )} text-center f-family`}
                            >
                                <div
                                    className={`${cx(
                                        'thumbnail',
                                    )} rounded-4 overflow-hidden w-75`}
                                >
                                    <img
                                        className="w-100 h-100"
                                        src={data[0].thumbnail}
                                        alt=""
                                    />
                                </div>
                                <p
                                    style={{ fontWeight: 600 }}
                                    className={`${cx(
                                        '',
                                    )} text-capitalize fs-5 mt-2 mb-2 mt-4`}
                                >
                                    {data[0].title || data[0].name}
                                </p>
                                <p className={`${cx('')} mb-2`}>
                                    <span>Update date: </span>
                                    {formatDate(data[0].modifiedDate)}
                                </p>
                                <div
                                    className={`${cx(
                                        'text',
                                    )} fs-13 f-family subtitle_color w-100`}
                                >
                                    {data[0].artists.map((artist, index) => (
                                        <Link
                                            key={index}
                                            to={`/artist/${artist.id}`}
                                            className={` subtitle_color is_truncate pe-1`}
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
                                {type === 'playlist' && (
                                    <p>
                                        <span className="subtitle_color pe-2">
                                            Preface
                                        </span>
                                        {data[0].name}
                                    </p>
                                )}
                                <ListSong
                                    isShowAlbums={type === 'playlist'}
                                    data={songs}
                                    album_id={data[0].id}
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
