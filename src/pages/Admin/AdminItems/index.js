import { useParams } from 'react-router-dom';
import styles from './AdminItems.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

const GENRES = 'genres';
const SONG = 'song';
const ARTIST = 'artist';
const ALBUMS = 'album';

const CreateGenres = ({ handleCreate, type }) => {
    const [data, setData] = useState({
        name: '',
        code: '',
    });
    const [name, setName] = useState('');

    const convertToCode = (name) => {
        return name.toLowerCase().replace(/ /g, '-');
    };

    useEffect(() => {
        setData(() => {
            return {
                name,
                code: convertToCode(name),
            };
        });
    }, [name]);

    return (
        <div className="p-3">
            <div className="mb-3">
                <label className="d-block mb-1">Name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <button
                className="border-0 rounded-3 pt-2 pb-2 bg--primary p-2 mt-4"
                onClick={() => handleCreate(type, data)}
            >
                Add new {type}
            </button>
        </div>
    );
};

const CreateSong = ({ handleCreate, type }) => {
    return (
        <div className="p-3">
            <div className="mb-3">
                <label className="d-block mb-1">Name:</label>
                <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Image:</label>
                <input type="file" className="form-control" />
            </div>
            <button
                className="border-0 rounded-3 pt-2 pb-2 bg--primary p-2 mt-4"
                onClick={() => handleCreate(type)}
            >
                Add new {type}
            </button>
        </div>
    );
};

const CreateArtist = ({ handleCreate, type }) => {
    const [data, setData] = useState({
        artistName: '',
        gender: 3,
        birthday: '',
        biography: '',
        placeOfBirth: '',
        profilePath: '',
    });

    const [artistName, setArtistName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [biography, setBiography] = useState('');
    const [placeOfBirth, setPlaceOfBirth] = useState('');
    const [profilePath, setProfilePath] = useState('');

    useEffect(() => {
        setData(() => {
            return {
                artistName,
                gender,
                birthday,
                biography,
                placeOfBirth,
                profilePath,
            };
        });
    }, [artistName, gender, birthday, biography, placeOfBirth, profilePath]);

    return (
        <div className="p-3">
            <div className="mb-3">
                <label className="d-block mb-1">Name:</label>
                <input
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Gender:</label>
                <div className="d-flex">
                    <span className="me-1">Female</span>
                    <input
                        value={0}
                        type="radio"
                        name="gender"
                        className="me-2"
                        onClick={(e) => setGender(Number(e.target.value))}
                    />
                    <span className="me-1">male</span>
                    <input
                        value={1}
                        type="radio"
                        name="gender"
                        onClick={(e) => setGender(Number(e.target.value))}
                    />
                </div>
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Birthday:</label>
                <input
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    type="date"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Biography:</label>
                <input
                    onChange={(e) => setBiography(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Place of birth:</label>
                <input
                    onChange={(e) => setPlaceOfBirth(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Profile path:</label>
                <input
                    type="text"
                    onChange={(e) => setProfilePath(e.target.value)}
                    className="form-control"
                />
            </div>
            <button
                className="border-0 rounded-3 pt-2 pb-2 bg--primary p-2 mt-4"
                onClick={() => handleCreate(type, data)}
            >
                Add new {type}
            </button>
        </div>
    );
};

const CreateAlbums = ({ handleCreate, type }) => {
    const [genres, setGenres] = useState([]);
    const [listArtist, setListArtist] = useState([]);
    const [data, setData] = useState({
        name: '',
        thumbnail: '',
        genresCode: '',
        artists: [],
    });
    const [name, setName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [genresCode, setGenresCode] = useState('');
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        setData(() => {
            return {
                name,
                thumbnail,
                genresCode,
                artists,
            };
        });
    }, [name, thumbnail, genresCode, artists]);

    const handleExists = (artist) => {
        return artists.indexOf(artist) != -1;
    };

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/genres')
            .then((res) => setGenres(res.data.results))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/artist')
            .then((res) => setListArtist(res.data.results))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="p-3">
            <div className="mb-3">
                <label className="d-block mb-1">Name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Thumbnail:</label>
                <input
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Genres:</label>
                <select
                    value={genresCode}
                    onChange={(e) => setGenresCode(e.target.value)}
                    className="form-control"
                >
                    <option value={''}>--Genres--</option>
                    {genres.map((item) => (
                        <option value={item.code} key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Artist:</label>
                <select
                    onChange={(e) => {
                        if (e.target.value !== '') {
                            setArtists((prev) => [...prev, e.target.value]);
                        }
                    }}
                    className="form-control"
                >
                    <option value={''}>--Artists--</option>
                    {listArtist.map((artist) => (
                        <option
                            key={artist.id}
                            value={artist.artistName}
                            disabled={handleExists(artist.artistName)}
                        >
                            {artist.artistName}
                        </option>
                    ))}
                </select>
                <div>
                    {artists.map((artist, index) => (
                        <span key={index}>{artist}</span>
                    ))}
                </div>
            </div>
            <button
                className="border-0 rounded-3 pt-2 pb-2 bg--primary p-2 mt-4"
                onClick={() => handleCreate(type, data)}
            >
                Add new {type}
            </button>
        </div>
    );
};

const listNav = [
    {
        content: 'genres',
        component: CreateGenres,
    },
    {
        content: 'song',
        component: CreateSong,
    },
    {
        content: 'artist',
        component: CreateArtist,
    },
    {
        content: 'album',
        component: CreateAlbums,
    },
];

function AdminItems() {
    let { item } = useParams();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCrateSong = () => {
        setLoading(true);
        axios
            .post('http://localhost:8080/api/song', {
                title: 'Âm thầm bên em (Lofi)',
                audioUrl:
                    'https://vnso-zn-10-tf-a320-zmp3.zmdcdn.me/523fb2bef2f3b3c8497c6efe228c737c?authen=exp=1698159902~acl=/523fb2bef2f3b3c8497c6efe228c737c/*~hmac=3320b29fdece2da30f616fe8f7115a7d',
                thumbnail: '/son-tung-m-tp.png',
                timePlay: '4:03',
                lyric: 'Chúng ta của hiện tại',
                totalListen: 1000000,
                genresCode: 'chill-lofi',
                artists: ['Sơn Tùng M-TP'],
                albums: [],
                playLists: null,
            })
            .then(() => {
                setLoading(false);
                setShowModal(true);
                setSuccess(true);
            })
            .catch(() => {
                setLoading(false);
                setShowModal(true);
                setSuccess(false);
            });
    };

    const handleCreateGenres = (data) => {
        setLoading(true);
        axios
            .post('http://localhost:8080/api/genres', {
                name: data.name,
                code: data.code,
            })
            .then(() => {
                setLoading(false);
                setShowModal(true);
                setSuccess(true);
            })
            .catch(() => {
                setLoading(false);
                setShowModal(true);
                setSuccess(false);
            });
    };

    const handleCreateArtist = (data) => {
        setLoading(true);
        axios
            .post(
                'http://localhost:8080/api/artist',
                {
                    artistName: data.artistName,
                    gender: data.gender,
                    birthday: data.birthday,
                    biography: data.biography,
                    placeOfBirth: data.placeOfBirth,
                    profilePath: data.profilePath,
                },
                // Thời gian tối đa
                { timeout: 5000 },
            )
            .then(() => {
                setLoading(false);
                setShowModal(true);
                setSuccess(true);
            })
            .catch(() => {
                setLoading(false);
                setShowModal(true);
                setSuccess(false);
            });
    };

    const handleCreateAlbum = (data) => {
        setLoading(true);
        axios
            .post('http://localhost:8080/api/album', {
                name: data.name,
                thumbnail: data.thumbnail,
                genresCode: data.genresCode,
                artists: data.artists,
            })
            .then(() => {
                setLoading(false);
                setShowModal(true);
                setSuccess(true);
            })
            .catch(() => {
                setLoading(false);
                setShowModal(true);
                setSuccess(false);
            });
    };

    const handleCreate = (type, data) => {
        switch (type) {
            case GENRES:
                handleCreateGenres(data);
                break;
            case SONG:
                handleCrateSong();
                break;
            case ARTIST:
                handleCreateArtist(data);
                break;
            case ALBUMS:
                handleCreateAlbum(data);
                break;
            default:
                break;
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <div className="pt-4">
                        <div
                            className={` rounded-3 bg-white ${cx(
                                'wrapper',
                            )} f-family mb-3 pb-3 `}
                        >
                            <div
                                className={` d-flex align-items-center justify-content-between p-3 ${cx(
                                    '',
                                )} border-bottom`}
                            >
                                <h3
                                    className={`${cx('')} mb-0 text-capitalize`}
                                >
                                    Add {item}
                                </h3>
                            </div>
                            <div>
                                {listNav.map((nav, index) => {
                                    var Page = nav.component;
                                    if (nav.content == item)
                                        return (
                                            <Page
                                                key={index}
                                                handleCreate={handleCreate}
                                                type={nav.content}
                                            />
                                        );
                                })}
                            </div>
                        </div>
                    </div>

                    {showModal && (
                        <div
                            style={{
                                background: 'rgba(0,0,0,0.5)',
                                zIndex: '100000',
                            }}
                            className="f-family d-flex position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center"
                        >
                            <div
                                style={{ width: 300 }}
                                className="bg-white rounded-3"
                            >
                                <div className="border-bottom p-3">
                                    <h4 className="mb-0">Message</h4>
                                </div>
                                <div className="border-bottom p-3">
                                    <p className="mb-0">
                                        {success
                                            ? 'Create new successfully'
                                            : 'Fail create new'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className=" bg-transparent rounded-3 float-end m-2"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default AdminItems;
