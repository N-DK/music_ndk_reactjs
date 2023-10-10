import { useParams } from 'react-router-dom';
import styles from './AdminItems.module.scss';
import classNames from 'classnames/bind';
import Album from '~/pages/Album';

const cx = classNames.bind(styles);

const GENRES = 'genres';
const SONG = 'song';
const ARTIST = 'artist';
const ALBUMS = 'albums';

const CreateGenres = ({ handleCreate, type }) => {
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

const CreateAlbums = ({ handleCreate, type }) => {
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
        content: 'albums',
        component: CreateAlbums,
    },
];

function AdminItems() {
    let { item } = useParams();

    const handleCreate = (type) => {
        switch (type) {
            case GENRES:
                console.log('Crating genres');
                break;
            case SONG:
                console.log('Crating Song');
                break;
            case ARTIST:
                console.log('Crating artist');
                break;
            case ALBUMS:
                console.log('Crating albums');
                break;
            default:
                break;
        }
    };

    return (
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
                    <h3 className={`${cx('')} mb-0 text-capitalize`}>
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
    );
}

export default AdminItems;
