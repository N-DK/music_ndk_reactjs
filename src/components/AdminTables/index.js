import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AdminTables.module.scss';
import classNames from 'classnames/bind';
import {
    faAngleLeft,
    faAngleRight,
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function AdminTables({ category }) {
    const [cate, setCate] = useState(category);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        setCate(category);
        axios
            .get(`http://localhost:8080/api/${category}`)
            .then((res) => {
                setData(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [category]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div
                    className={` rounded-3 bg-white ${cx(
                        'wrapper',
                    )} f-family mb-3 pb-3`}
                >
                    <div
                        className={` d-flex align-items-center justify-content-between p-3 ${cx()} border-bottom`}
                    >
                        <h3 className={`${cx()} mb-0 text-capitalize`}>
                            {category} Lists
                        </h3>
                        <Link
                            to={`${category}`}
                            className={`${cx(
                                '',
                            )} border-0 rounded-3 p-2 bg--primary text-decoration-none`}
                        >
                            Add new {category}
                        </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-3 ">
                        <div className="d-flex align-items-center justify-content-center">
                            Show{' '}
                            <select
                                className={`${cx(
                                    'entries',
                                )} form-control ms-1 me-1`}
                            >
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={25}>25</option>
                            </select>{' '}
                            entries
                        </div>
                        <div>
                            <label>Search: </label>
                            <input
                                type="text"
                                placeholder=""
                                className="border rounded-1 ms-1"
                            />
                        </div>
                    </div>
                    <div className={`${cx('')} p-3`}>
                        {/* Genres */}
                        {cate == 'genres' && (
                            <table className={`${cx()} table border`}>
                                <thead className="border">
                                    <tr>
                                        <th className="border" scope="col">
                                            No
                                        </th>
                                        <th className="border" scope="col">
                                            Image
                                        </th>
                                        <th className="border" scope="col">
                                            Name
                                        </th>
                                        <th className="border" scope="col">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id}>
                                            <th className="border" scope="row">
                                                {item.id}
                                            </th>
                                            <td className="border">
                                                <div
                                                    className={`${cx(
                                                        'thumbnail',
                                                    )} rounded-3 overflow-hidden`}
                                                >
                                                    <img
                                                        src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/2/b/2/d/2b2d855c92cb396bead07ed70c33a00b.jpg"
                                                        alt=""
                                                        className="w-100 h-100"
                                                    />
                                                </div>
                                            </td>
                                            <td className="border">
                                                <p className="mb-0 d-flex align-items-center h-100">
                                                    {item.name}
                                                </p>
                                            </td>
                                            <td className="border">
                                                <div className="d-flex align-items-center">
                                                    <a
                                                        className={`bg--primary text-decoration-none rounded-2 d-flex align-items-center justify-content-center me-2 ${cx(
                                                            'action',
                                                        )}`}
                                                        href="#"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                        />
                                                    </a>
                                                    <a
                                                        className={`bg--primary text-decoration-none rounded-2 d-flex align-items-center justify-content-center ${cx(
                                                            'action',
                                                        )}`}
                                                        href="#"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#modalDelete"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {/* Song */}
                        {cate == 'song' && (
                            <table className={`${cx()} table border`}>
                                <thead className="border">
                                    <tr>
                                        <th className="border" scope="col">
                                            No
                                        </th>
                                        <th className="border" scope="col">
                                            Image
                                        </th>
                                        <th className="border" scope="col">
                                            Song Name
                                        </th>
                                        <th className="border" scope="col">
                                            Song Genres
                                        </th>
                                        <th className="border" scope="col">
                                            Artist
                                        </th>
                                        <th className="border" scope="col">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={item.id}>
                                            <th className="border" scope="row">
                                                1
                                            </th>
                                            <td className="border">
                                                <div
                                                    className={`${cx(
                                                        'thumbnail',
                                                    )} rounded-3 overflow-hidden`}
                                                >
                                                    <img
                                                        src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/a/3/1/c/a31cdf3a266dfa3fcbc586613c70ed52.jpg"
                                                        alt=""
                                                        className="w-100 h-100"
                                                    />
                                                </div>
                                            </td>
                                            <td className="border">
                                                <p className="mb-0 d-flex align-items-center h-100">
                                                    {item.title}
                                                </p>
                                            </td>
                                            <td className="border">
                                                <p className="mb-0 d-flex align-items-center h-100">
                                                    Pop, R&B, Indie Pop
                                                </p>
                                            </td>
                                            <td className="border">
                                                <p className="mb-0 d-flex align-items-center h-100">
                                                    {item.artists.map(
                                                        (artist) => (
                                                            <span
                                                                key={artist.id}
                                                            >
                                                                {artist.name}
                                                            </span>
                                                        ),
                                                    )}
                                                </p>
                                            </td>
                                            <td className="border">
                                                <div className="d-flex align-items-center">
                                                    <a
                                                        className={`bg--primary text-decoration-none rounded-2 d-flex align-items-center justify-content-center me-2 ${cx(
                                                            'action',
                                                        )}`}
                                                        href="#"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                        />
                                                    </a>
                                                    <a
                                                        className={`bg--primary text-decoration-none rounded-2 d-flex align-items-center justify-content-center ${cx(
                                                            'action',
                                                        )}`}
                                                        href="#"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {/* Artist */}
                        {cate == 'artist' && (
                            <table className={`${cx()} table border`}>
                                <thead className="border">
                                    <tr>
                                        <th className="border" scope="col">
                                            No
                                        </th>
                                        <th className="border" scope="col">
                                            Profile
                                        </th>
                                        <th className="border" scope="col">
                                            Artist Name
                                        </th>
                                        <th className="border" scope="col">
                                            Artist Description
                                        </th>
                                        <th className="border" scope="col">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id}>
                                            <th className="border" scope="row">
                                                1
                                            </th>
                                            <td className="border">
                                                <div
                                                    className={`${cx(
                                                        'thumbnail',
                                                    )} rounded-3 overflow-hidden`}
                                                >
                                                    <img
                                                        src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/f/b/f/1/fbf16d7352a3eea6be8cf5d4b217516d.jpg"
                                                        alt=""
                                                        className="w-100 h-100"
                                                    />
                                                </div>
                                            </td>
                                            <td className="border">
                                                <p className="mb-0 d-flex align-items-center h-100">
                                                    {item.artistName}
                                                </p>
                                            </td>
                                            <td
                                                className={`${cx(
                                                    'overlay',
                                                )} border position-relative`}
                                            >
                                                <p className=" mb-0 w-100 h-100 position-absolute">
                                                    {item.biography}
                                                </p>
                                            </td>
                                            <td className="border">
                                                <div className="d-flex align-items-center">
                                                    <a
                                                        className={`bg--primary text-decoration-none rounded-2 d-flex align-items-center justify-content-center me-2 ${cx(
                                                            'action',
                                                        )}`}
                                                        href="#"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                        />
                                                    </a>
                                                    <a
                                                        className={`bg--primary text-decoration-none rounded-2 d-flex align-items-center justify-content-center ${cx(
                                                            'action',
                                                        )}`}
                                                        href="#"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {/* Albums */}
                        {cate == 'album' && (
                            <table className={`${cx()} table border`}>
                                <thead className="border">
                                    <tr>
                                        <th className="border" scope="col">
                                            No
                                        </th>
                                        <th className="border" scope="col">
                                            Image
                                        </th>
                                        <th className="border" scope="col">
                                            Album Name
                                        </th>
                                        <th className="border" scope="col">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id}>
                                            <th className="border" scope="row">
                                                {item.id}
                                            </th>
                                            <td className="border">
                                                <div
                                                    className={`${cx(
                                                        'thumbnail',
                                                    )} rounded-3 overflow-hidden`}
                                                >
                                                    <img
                                                        src="https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/f/0/c/6/f0c6b74652e9ed643f3183c7617aaa30.jpg"
                                                        alt=""
                                                        className="w-100 h-100"
                                                    />
                                                </div>
                                            </td>
                                            <td className="border">
                                                <p className="mb-0 d-flex align-items-center h-100">
                                                    {item.name}
                                                </p>
                                            </td>
                                            <td className="border">
                                                <div className="d-flex align-items-center">
                                                    <a
                                                        className={`bg--primary text-decoration-none rounded-2 d-flex align-items-center justify-content-center me-2 ${cx(
                                                            'action',
                                                        )}`}
                                                        href="#"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                        />
                                                    </a>
                                                    <a
                                                        className={`bg--primary text-decoration-none rounded-2 d-flex align-items-center justify-content-center ${cx(
                                                            'action',
                                                        )}`}
                                                        href="#"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="">
                        <div className="d-flex algin-items-center justify-content-center">
                            <a
                                className={`${cx(
                                    'pagination-item',
                                )} rounded-1 ms-1 me-1 d-flex align-items-center justify-content-center`}
                                href="#"
                            >
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </a>
                            <span
                                className={`${cx(
                                    'pagination-item',
                                    'active',
                                )} rounded-1 ms-1 me-1 d-flex align-items-center justify-content-center`}
                            >
                                1
                            </span>
                            <span
                                className={`${cx(
                                    'pagination-item',
                                )} rounded-1 ms-1 me-1 d-flex align-items-center justify-content-center`}
                            >
                                2
                            </span>
                            <span
                                className={`${cx(
                                    'pagination-item',
                                )} rounded-1 ms-1 me-1 d-flex align-items-center justify-content-center`}
                            >
                                3
                            </span>
                            <span
                                className={`${cx(
                                    'pagination-item',
                                )} rounded-1 ms-1 me-1 d-flex align-items-center justify-content-center`}
                            >
                                4
                            </span>
                            <span
                                className={`${cx(
                                    'pagination-item',
                                )} rounded-1 ms-1 me-1 d-flex align-items-center justify-content-center`}
                            >
                                5
                            </span>
                            <a
                                className={`${cx(
                                    'pagination-item',
                                )} rounded-1 ms-1 me-1 d-flex align-items-center justify-content-center`}
                                href="#"
                            >
                                <FontAwesomeIcon icon={faAngleRight} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminTables;
