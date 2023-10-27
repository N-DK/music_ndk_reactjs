import { useParams } from 'react-router-dom';
import styles from './AdminItems.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '~/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tinymce/tinymce-react';

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
    const [genres, setGenres] = useState([]);
    const [listArtist, setListArtist] = useState([]);
    const [listAlbum, setListAlbum] = useState([]);
    const [data, setData] = useState({
        title: '',
        audioUrl: '',
        thumbnail: '',
        timePlay: '',
        lyric: '',
        genresCode: '',
        artists: [],
        albums: [],
    });
    const [title, setTitle] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [timePlay, setTimePlay] = useState('');
    const [lyric, setLyric] = useState('');
    const [genresCode, setGenresCode] = useState('');
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

    const handleExists = (artist) => {
        return artists.indexOf(artist) !== -1;
    };

    const handleExistsAlbum = (album) => {
        return albums.indexOf(album) !== -1;
    };

    const handleEditorChange = (content, editor) => {
        setLyric(editor.getContent());
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return seconds ? `${formattedMinutes}:${formattedSeconds}` : NaN;
    };

    useEffect(() => {
        const getTimePlay = (audio) => {
            setTimePlay(formatTime(audio.duration));
        };

        var audio = new Audio(audioUrl);

        audio.addEventListener('loadeddata', () => getTimePlay(audio));

        return () => {
            audio.removeEventListener('loadedmetadata', getTimePlay);
        };
    }, [audioUrl]);

    useEffect(() => {
        setData(() => {
            return {
                title,
                audioUrl,
                thumbnail,
                timePlay,
                lyric,
                genresCode,
                artists,
                albums,
            };
        });
    }, [
        title,
        audioUrl,
        thumbnail,
        lyric,
        genresCode,
        artists,
        albums,
        timePlay,
    ]);

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

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/album')
            .then((res) => setListAlbum(res.data.results))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="p-3">
            <div className="mb-3">
                <label className="d-block mb-1">Title:</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Audio url:</label>
                <input
                    type="text"
                    onChange={(e) => setAudioUrl(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Thumbnail:</label>
                <input
                    type="text"
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Lyric:</label>
                <Editor
                    apiKey="4a4w5wva37x67iujqkgi67o68zzwjj26p18xeqvwkilhp33e"
                    init={{
                        plugins: [
                            'advlist',
                            'autolink',
                            'link',
                            'image',
                            'lists',
                            'charmap',
                            'anchor',
                            'pagebreak',
                            'searchreplace',
                            'wordcount',
                            'visualblocks',
                            'code',
                            'fullscreen',
                            'insertdatetime',
                            'media',
                            'table',
                            'emoticons',
                            'codesample',
                        ],
                        toolbar:
                            'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' +
                            'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                            'forecolor backcolor emoticons',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request, respondWith) =>
                            respondWith.string(() =>
                                Promise.reject(
                                    'See docs to implement AI Assistant',
                                ),
                            ),
                    }}
                    // onInit={(e, editor) => (editorRef.current = editor)}
                    onChange={handleEditorChange}
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
            <label className="d-block mb-1">Artist:</label>
            <select
                onChange={(e) => {
                    if (e.target.value !== '') {
                        setArtists(() => [...artists, e.target.value]);
                    }
                }}
                value={''}
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
            <div className="mt-3">
                {artists.map((artist, index) => (
                    <span className="border rounded-2 p-2 me-2" key={index}>
                        {artist}
                        <FontAwesomeIcon
                            onClick={() => {
                                setArtists(() => {
                                    let arr = [...artists];
                                    arr.splice(index, 1);
                                    return arr;
                                });
                            }}
                            className="ms-2"
                            icon={faXmark}
                        />
                    </span>
                ))}
            </div>
            <label className="d-block mb-1 mt-4">Album:</label>
            <select
                onChange={(e) => {
                    if (e.target.value !== '') {
                        setAlbums(() => [...albums, e.target.value]);
                    }
                }}
                value={''}
                className="form-control"
            >
                <option value={''}>--Albums--</option>
                {listAlbum.map((album) => (
                    <option
                        key={album.id}
                        value={album.name}
                        disabled={handleExistsAlbum(album.name)}
                    >
                        {album.name}
                    </option>
                ))}
            </select>
            <div className="mt-3">
                {albums.map((album, index) => (
                    <span className="border rounded-2 p-2 me-2" key={index}>
                        {album}
                        <FontAwesomeIcon
                            onClick={() => {
                                setAlbums(() => {
                                    let arr = [...albums];
                                    arr.splice(index, 1);
                                    return arr;
                                });
                            }}
                            className="ms-2"
                            icon={faXmark}
                        />
                    </span>
                ))}
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
                <textarea
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
        return artists.indexOf(artist) !== -1;
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
                            setArtists(() => [...artists, e.target.value]);
                        }
                    }}
                    value={''}
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
                <div className="mt-3">
                    {artists.map((artist, index) => (
                        <span className="border rounded-2 p-2 me-2" key={index}>
                            {artist}
                            <FontAwesomeIcon
                                onClick={() => {
                                    setArtists(() => {
                                        let arr = [...artists];
                                        arr.splice(index, 1);
                                        return arr;
                                    });
                                }}
                                className="ms-2"
                                icon={faXmark}
                            />
                        </span>
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

    const handleCrateSong = (data) => {
        setLoading(true);
        axios
            .post('http://localhost:8080/api/song', {
                title: data.title,
                audioUrl: data.audioUrl,
                thumbnail: data.thumbnail,
                timePlay: data.timePlay,
                lyric: data.lyric,
                totalListen: 0,
                genresCode: data.genresCode,
                artists: data.artists,
                albums: data.albums,
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
                handleCrateSong(data);
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
                                    if (nav.content === item)
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
