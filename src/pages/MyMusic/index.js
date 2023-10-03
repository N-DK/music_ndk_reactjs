import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MyMusic.module.scss';
import classNames from 'classnames/bind';
import {
    faChevronRight,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import CardSongItem from '~/components/CardSongItem';
import { useState } from 'react';
import SongItem from '~/components/SongItem';
import ListSong from '~/components/ListSong';
import MyAlbum from '~/components/MyAlbum';

const cx = classNames.bind(styles);

const items = [
    {
        name: 'Song',
        id: 1,
    },
    {
        name: 'Album',
        id: 2,
    },
];

const songs = [
    {
        id: 1,
        thumbnail:
            'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/a/3/1/c/a31cdf3a266dfa3fcbc586613c70ed52.jpg',
        name: 'Âm thầm bên em',
        audio: 'https://vnso-zn-10-tf-a320-zmp3.zmdcdn.me/523fb2bef2f3b3c8497c6efe228c737c?authen=exp=1696090690~acl=/523fb2bef2f3b3c8497c6efe228c737c/*~hmac=4e53a75d8b5a2e1b3ac7fb4a785a65d6',
        artists: ['Sơn Tùng M-TP'],
        lyric: '<p>Khi b&ecirc;n anh em thấy điều chi</p><p>Khi b&ecirc;n anh em thấy điều g&igrave;</p><p>Nước mắt rơi</p><p>Gần kề l&agrave;n mi</p><p>Chẳng c&ograve;n những gi&acirc;y ph&uacute;t</p><p>Chẳng c&ograve;n những &acirc;n t&igrave;nh</p><p>Gi&oacute; mang em rời xa nơi đ&acirc;y</p><p>Khi xa anh em nhớ về ai</p><p>Khi xa anh em nhớ</p><p>Một người chắc kh&ocirc;ng phải</p><p>Một người như anh</p><p>Người từng l&agrave;m em kh&oacute;c</p><p>Người từng khiến em buồn</p><p>Bu&ocirc;ng b&agrave;n tay</p><p>Rời xa lặng thinh bước đi</p><p>Hạt mưa rơi bủa v&acirc;y</p><p>Tr&aacute;i tim hiu quạnh</p><p>Ng&agrave;n y&ecirc;u thương</p><p>Vụt tan bỗng xa</p><p>Người từng n&oacute;i ở b&ecirc;n</p><p>Cạnh anh mỗi khi anh buồn</p><p>Cớ sao giờ</p><p>Lời n&oacute;i kia như gi&oacute; bay</p><p>Đừng bỏ rơi</p><p>B&agrave;n tay ấy bơ vơ m&agrave;</p><p>Một m&igrave;nh anh lặng im chốn đ&acirc;y</p><p>Y&ecirc;u em &acirc;m thầm b&ecirc;n em</p><p>Y&ecirc;u thương kh&ocirc;ng c&ograve;n nơi đ&acirc;y</p><p>Em mang t&igrave;nh buồn theo m&acirc;y</p><p>Cơn mơ về mong manh c&acirc;u thề</p><p>Tan tr&ocirc;i qua mau</p><p>Qu&ecirc;n đi ph&uacute;t gi&acirc;y</p><p>Mưa rơi tr&ecirc;n đ&ocirc;i mi qua lối vắng</p><p>&Aacute;nh s&aacute;ng mờ</p><p>Bu&ocirc;ng lơi l&agrave;n kh&oacute;i trắng</p><p>B&oacute;ng d&aacute;ng em</p><p>Nụ cười ng&agrave;y h&ocirc;m qua</p><p>K&yacute; ức c&oacute; ngủ qu&ecirc;n</p><p>Ch&igrave;m trong m&agrave;n sương đắng</p><p>Anh nhớ giọt nước mắt s&acirc;u lắng</p><p>Anh nhớ nỗi buồn</p><p>Của em ng&agrave;y kh&ocirc;ng nắng</p><p>Bu&ocirc;ng b&agrave;n tay</p><p>Rời xa lặng thinh bước đi</p><p>Hạt mưa rơi bủa v&acirc;y</p><p>Tr&aacute;i tim hiu quạnh</p><p>Ng&agrave;n y&ecirc;u thương</p><p>Vụt tan bỗng xa</p><p>Người từng n&oacute;i ở b&ecirc;n</p><p>Cạnh anh mỗi khi anh buồn</p><p>Cớ sao giờ</p><p>Lời n&oacute;i kia như gi&oacute; bay</p><p>B&agrave;n tay bơ vơ m&agrave;</p><p>Cầm b&ocirc;ng hoa chờ mong nhớ thương</p><p>L&agrave;m sao qu&ecirc;n người ơi</p><p>T&igrave;nh anh m&atilde;i như h&ocirc;m n&agrave;o</p><p>Vẫn y&ecirc;u người</p><p>V&agrave; vẫn mong em về đ&acirc;y</p><p>Giọt nước mắt</p><p>Tại sao cứ lăn rơi ho&agrave;i</p><p>Ở b&ecirc;n anh chỉ c&oacute; đớn đau</p><p>Th&igrave; anh xin nhận hết</p><p>Ng&agrave;n đau đớn để thấy em cười</p><p>Dẫu biết rằng</p><p>Người đến kh&ocirc;ng như giấc mơ</p><p>Y&ecirc;u em &acirc;m thầm b&ecirc;n em</p><p>Y&ecirc;u em &acirc;m thầm b&ecirc;n em</p><p>Th&igrave; anh xin nhận hết</p><p>Ng&agrave;n đau đớn để thấy em cười</p><p>Dẫu biết rằng</p><p>Người đến kh&ocirc;ng như giấc mơ</p><p>Y&ecirc;u em &acirc;m thầm b&ecirc;n em</p>',
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

function MyMusic() {
    const [item, setItem] = useState(1);

    return (
        <div className={`${cx('wrapper')} pt-4`}>
            <div className={`${cx('playlist__container')} mb-5`}>
                <div
                    className={` d-flex align-items-center justify-content-between mb-3`}
                >
                    <div className={` d-flex align-items-center`}>
                        <p
                            className={` text-uppercase f-family fw-bold m-0 fs-5`}
                        >
                            playlist
                        </p>
                        <a
                            href="#"
                            className="ms-2 f-family text-black fs-5 d-flex align-items-center text-decoration-none"
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </a>
                    </div>
                    <a
                        href="#"
                        className="f-family text--primary d-flex align-items-center text-decoration-none"
                    >
                        <span className="me-2">View more</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                </div>
                <div className={` row`}>
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                </div>
            </div>
            <div>
                <div className={`border-bottom pb-2`}>
                    {items.map((v, i) => (
                        <a
                            key={i}
                            className={`f-family text-dark text-uppercase text-decoration-none d-inline-block me-4 ${
                                v.id == item && `${cx('active')}`
                            }`}
                            onClick={() => setItem(v.id)}
                        >
                            {v.name}
                        </a>
                    ))}
                </div>
                <div className="">
                    {item == 1 ? <ListSong data={songs} /> : <MyAlbum />}
                </div>
            </div>
        </div>
    );
}

export default MyMusic;
