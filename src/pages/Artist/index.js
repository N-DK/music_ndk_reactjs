import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Artist.module.scss';
import classNames from 'classnames/bind';
import {
    faCheck,
    faChevronRight,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Receptacle from '~/components/Receptacle';
import zing from '~/img/zing_music.png';
import ListSongItem from '~/components/ListSongItem';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Artist() {
    const [songs, setSongs] = useState([]);
    const [artist, setArtist] = useState();
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numberInterested, setNumberInterested] = useState(2447764);
    const [isInterested, setIsInterested] = useState(false);
    const isTabletMobile = useMediaQuery({ maxWidth: 900 });
    let { id } = useParams();

    // 111111 -> 111.111
    const convertNumber = (number) => {
        return number.replace(/,/g, '.');
    };

    const handleFilterAlbumsSingle = (albums) => {
        return albums.filter((album) =>
            album.name.toLowerCase().includes('single'),
        );
    };

    useEffect(() => {
        if (artist) {
            setNumberInterested(artist.numberFollower);
        }
    }, [artist]);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/artist/${id}`)
            .then((res) => {
                setLoading(false);
                setSongs(res.data.songs);
                setArtist(...res.data.results);
                setAlbums(res.data.album);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div
                    className={`${cx(
                        'wrapper',
                        `${isTabletMobile && 'is-mobile'}`,
                    )} `}
                >
                    <div
                        className={`${cx(
                            'banner__artist',
                        )} h-100 position-absolute end-0 ${
                            isTabletMobile && 'w-100'
                        }`}
                    >
                        <div
                            className={`${cx(
                                'banner__artist--item',
                            )} d-flex align-items-center container position-absolute ${
                                isTabletMobile && 'w-100'
                            }`}
                        >
                            <div
                                className={`${cx(
                                    'artist__avatar',
                                )} rounded-circle overflow-hidden me-4`}
                            >
                                <img
                                    className="w-100 h-100"
                                    src={artist.profilePath}
                                    alt=""
                                />
                            </div>
                            <div className={`${cx('')} f-family`}>
                                <h1 className={`${cx('artist__name')} mb-0`}>
                                    {artist.artistName}
                                </h1>
                                <div
                                    className={` ${cx(
                                        '',
                                    )} d-flex align-items-center mt-3 ${
                                        isTabletMobile && 'flex-column'
                                    }`}
                                >
                                    <p className="mb-0">
                                        <span>
                                            {convertNumber(
                                                numberInterested.toLocaleString(),
                                            )}
                                        </span>{' '}
                                        người quan tâm
                                    </p>
                                    {!isInterested ? (
                                        <div
                                            onClick={() => {
                                                setNumberInterested(
                                                    (prev) => prev + 1,
                                                );
                                                setIsInterested(true);
                                            }}
                                            className={`${cx(
                                                'btn-interested',
                                            )} border border-dark fs-13 rounded-5 ms-4 p-1 ps-3 pe-3`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUserPlus}
                                                className="me-2 "
                                            />
                                            <span className=" text-uppercase">
                                                quan tâm
                                            </span>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => {
                                                setNumberInterested(
                                                    (prev) => prev - 1,
                                                );
                                                setIsInterested(false);
                                            }}
                                            className={` border-dark ${cx(
                                                'btn-interested',
                                            )} border fs-13 rounded-5 ms-4 p-1 ps-3 pe-3`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="me-2 "
                                            />
                                            <span className=" text-uppercase">
                                                đã quan tâm
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('distance')}>
                        <div
                            className={`${cx(
                                'hot-song__container',
                            )} rounded-4 p-3 mb-5`}
                        >
                            <div
                                className={`${cx(
                                    '',
                                )} d-flex align-items-center justify-content-between f-family mb-2`}
                            >
                                <h4 className={`${cx('')} mb-2 fs-4`}>
                                    Hot song
                                </h4>
                                <a
                                    href="#"
                                    className="f-family text--primary d-flex align-items-center text-decoration-none"
                                >
                                    <span className="me-2">View more</span>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </a>
                            </div>
                            <div className={`${cx('')} row `}>
                                <div className="col-xl-6 col-md-12">
                                    {songs.map((song, index) => (
                                        <ListSongItem
                                            key={index}
                                            song={song}
                                            songs={songs}
                                        />
                                    ))}
                                </div>
                                <div className="col-xl-6 col-md-12"></div>
                            </div>
                        </div>
                        <Receptacle
                            title="Single & EP"
                            data={handleFilterAlbumsSingle(albums)}
                        />
                        <Receptacle title="Album" />
                        <Receptacle title="MV" video={true} control={true} />
                        <div className={`${cx('about__artist')} f-family mt-5`}>
                            <h4 className={`${cx('')}`}>
                                About {artist.artistName}
                            </h4>
                            <div className={`${cx('')} mt-4`}>
                                <div className="row">
                                    <div className="col-12 col-xl-4 col-md-4">
                                        <div
                                            className={`${cx(
                                                'about__artist--img',
                                            )} overflow-hidden rounded-2 mb-3`}
                                        >
                                            <img
                                                className="w-100 h-100"
                                                src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/f/b/f/1/fbf16d7352a3eea6be8cf5d4b217516d.jpg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-xl-8 col-md-8">
                                        <div className={`${cx('content')}`}>
                                            <p className="mb-5">
                                                {artist.biography}
                                            </p>
                                            <div
                                                className={`${cx(
                                                    '',
                                                )} d-flex align-items-center`}
                                            >
                                                <div className="me-5">
                                                    <span className="d-block fs-5 fw-bold">
                                                        {convertNumber(
                                                            artist.numberFollower.toLocaleString(),
                                                        )}
                                                    </span>
                                                    <span>Người quan tâm</span>
                                                </div>
                                                <div className="me-5">
                                                    <span className="d-block fs-5 fw-bold">
                                                        3
                                                    </span>
                                                    <span>Giải thưởng</span>
                                                </div>
                                                <div>
                                                    <img
                                                        style={{
                                                            width: 40,
                                                            height: 40,
                                                        }}
                                                        src={zing}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Artist;
