import { Link, useParams } from 'react-router-dom';
import styles from './NewRelease.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ListSong from '~/components/ListSong';
import Loading from '~/components/Loading';
import axios from 'axios';
import ListAlbum from '~/components/ListAlbum';

const cx = classNames.bind(styles);

const nav = [
    {
        id: 1,
        title: 'song',
    },
    {
        id: 2,
        title: 'album',
    },
];

function NewRelease() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [navActive, setNavActive] = useState();
    let { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/${slug}`)
            .then((res) => {
                let results;
                if (slug === 'album') {
                    results = res.data.results.filter(
                        (item) => !item.name.includes('Single'),
                    );
                } else {
                    results = res.data.results;
                }
                setData(results.reverse());
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [slug]);

    useEffect(() => {
        const item = nav.find((i) => i.title === slug);
        setNavActive(item.id);
    }, [slug]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} f-family`}>
                    <div className="pt-5">
                        <div className="">
                            <h1 className={`pb-4 ${cx('title')}`}>
                                New Release
                            </h1>
                            <div>
                                <div className="border-bottom">
                                    <div className="d-flex align-items-center">
                                        {nav.map((item) => (
                                            <Link
                                                to={`/new-release/${item.title}`}
                                                key={item.id}
                                                className={` text-decoration-none fs-5 fw-medium pointer text-uppercase pb-3 me-4 mb-0 ${cx(
                                                    `${
                                                        item.id === navActive
                                                            ? 'active'
                                                            : 'not__active'
                                                    }`,
                                                )}`}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {slug === 'song' ? (
                                <ListSong isShowAlbums={true} data={data} />
                            ) : (
                                <ListAlbum data={data} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NewRelease;
