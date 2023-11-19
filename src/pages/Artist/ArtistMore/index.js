import { useParams } from 'react-router-dom';
import styles from './ArtistMore.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Album from '~/pages/Album';
import Loading from '~/components/Loading';
import CardSongItem from '~/components/CardSongItem';
import ListSong from '~/components/ListSong';

const cx = classNames.bind(styles);

const allSongsPage = ({ data, artist }) => {
    return (
        <div>
            <div>
                <p className={`${cx('title')}`}>
                    {artist.artistName} - All Songs
                </p>
                <ListSong isShowAlbums={true} data={data} />
            </div>
        </div>
    );
};

const singlePage = ({ data, artist }) => {
    return (
        <div>
            <div className="">
                <p className={`${cx('title')}`}>
                    {artist.artistName} - All Single & Ep
                </p>
                <div className="row">
                    {data.map((item, index) => (
                        <CardSongItem type="song" key={index} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const albumPage = () => {};

const playListPage = () => {};

const ALL = 'song';
const SINGLE = 'single';
const ALBUM = 'album';
const PLAYLIST = 'playlist';

const pages = [
    {
        content: ALL,
        component: allSongsPage,
    },
    {
        content: SINGLE,
        component: singlePage,
    },
    {
        content: ALBUM,
        component: albumPage,
    },
    {
        content: PLAYLIST,
        component: playListPage,
    },
];

function ArtistMore() {
    let { id, slug } = useParams();
    const [artist, setArtist] = useState();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const handleFilterAlbumsSingle = (albums) => {
        return albums.filter((album) =>
            album.name.toLowerCase().includes('single'),
        );
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/artist/${id}`)
            .then((res) => {
                setArtist(res.data.results[0]);
                if (slug === SINGLE) {
                    setData(handleFilterAlbumsSingle(res.data.album));
                } else if (slug === ALL) {
                    setData(res.data.songs);
                } else if (slug === ALBUM) {
                    setData(res.data.album);
                }
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} f-family pt-3`}>
                    {pages.map((page, index) => {
                        if (page.content === slug) {
                            const Page = page.component;
                            return (
                                <Page key={index} data={data} artist={artist} />
                            );
                        }
                    })}
                </div>
            )}
        </>
    );
}

export default ArtistMore;
