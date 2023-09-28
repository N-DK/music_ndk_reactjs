import SongItem from '~/components/SongItem';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Receptacle from '~/components/Receptacle';

const cx = classNames.bind(styles);

// aip res => return
const songs = [
    {
        id: 1,
        thumbnail:
            'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/a/3/1/c/a31cdf3a266dfa3fcbc586613c70ed52.jpg',
        name: 'Âm thầm bên em',
        audio: 'https://vnso-zn-10-tf-a320-zmp3.zmdcdn.me/523fb2bef2f3b3c8497c6efe228c737c?authen=exp=1696090690~acl=/523fb2bef2f3b3c8497c6efe228c737c/*~hmac=4e53a75d8b5a2e1b3ac7fb4a785a65d6',
        artists: ['Sơn Tùng M-TP'],
        lyric: 'Yêu em âm thầm bên em',
        genre: [''],
        album_id: '',
        time: '04:51',
        prevSong: 0,
        nextSong: 2,
    },
    {
        id: 2,
        name: 'Có Chắc yêu là đây',
        thumbnail:
            'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/9/d/7/9/9d79ebd03bbb6482bab748d67bbe0afb.jpg',
        audio: 'https://vnso-zn-10-tf-a320-zmp3.zmdcdn.me/82b05166a489d1b883ee28b63a0fcb8f?authen=exp=1695822415~acl=/82b05166a489d1b883ee28b63a0fcb8f/*~hmac=76dcf3a9ebf3f8783a2496eaa7861c3d',
        artists: ['Sơn Tùng M-TP'],
        lyric: 'Có Chắc yêu là đây',
        genre: [''],
        album_id: '',
        time: '03:35',
        nextSong: 3,
        prevSong: 1,
    },
];

function Home() {
    return (
        <div className={`${cx('wrapper')} pt-3`}>
            <aside
                className={`${cx(
                    'new-realeases__container',
                )} bg-white rounded-4 overflow-hidden`}
            >
                <h4 className={`mb-0 f-family p-3 pt-4 pb-4`}>New Realeases</h4>
                <div className={`${cx('bg__new')} p-4`}>
                    {songs.map((song) => (
                        <SongItem key={song.id} song={song} songs={songs} />
                    ))}
                </div>
            </aside>
            <Receptacle title="Featured Albums" control={true} />
            <Receptacle title="Trending Songs" limit={10} />
            <Receptacle title="Popular Hindi Songs" limit={10} />
            <Receptacle title="Hot songs" control={true} />
            <Receptacle title="Hot Video Songs" control={true} video={true} />
        </div>
    );
}

export default Home;
