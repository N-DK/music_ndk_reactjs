import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Artist.module.scss';
import classNames from 'classnames/bind';
import {
    faCheck,
    faChevronRight,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import SongItem from '~/components/SongItem';
import Receptacle from '~/components/Receptacle';
import zing from '~/img/zing_music.png';
import ListSongItem from '~/components/ListSongItem';

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

function Artist() {
    const [numberInterested, setNumberInterested] = useState(2447764);
    const [isInterested, setIsInterested] = useState(false);

    // 111111 -> 111.111
    const convertNumber = (number) => {
        return number.replace(/,/g, '.');
    };

    return (
        <div className={`${cx('wrapper')}`}>
            <div
                className={`${cx(
                    'banner__artist',
                )} h-100 position-absolute end-0`}
            >
                <div
                    className={`${cx(
                        'banner__artist--item',
                    )} d-flex align-items-center container position-absolute`}
                >
                    <div
                        className={`${cx(
                            'artist__avatar',
                        )} rounded-circle overflow-hidden me-4`}
                    >
                        <img
                            className="w-100 h-100"
                            src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/f/b/f/1/fbf16d7352a3eea6be8cf5d4b217516d.jpg"
                            alt=""
                        />
                    </div>
                    <div className={`${cx('')} f-family`}>
                        <h1 className={cx('artist__name')}>Sơn Tùng M-TP</h1>
                        <div
                            className={`${cx(
                                '',
                            )} d-flex align-items-center mt-3`}
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
                                        setNumberInterested((prev) => prev + 1);
                                        setIsInterested(true);
                                    }}
                                    className={`${cx(
                                        '',
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
                                        setNumberInterested((prev) => prev - 1);
                                        setIsInterested(false);
                                    }}
                                    className={` border-dark ${cx(
                                        '',
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
                        <h4 className={`${cx('')} mb-2 fs-4`}>Hot song</h4>
                        <a
                            href="#"
                            className="f-family text--primary d-flex align-items-center text-decoration-none"
                        >
                            <span className="me-2">View more</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </a>
                    </div>
                    <div className={`${cx('')} row `}>
                        <div className="col-6">
                            {songs.map((song, index) => (
                                <ListSongItem
                                    key={index}
                                    song={song}
                                    songs={songs}
                                />
                            ))}
                        </div>
                        <div className="col-6"></div>
                    </div>
                </div>
                <Receptacle title="Single & EP" />
                <Receptacle title="Album" />
                <Receptacle title="MV" video={true} />
                <div className={`${cx('about__artist')} f-family mt-5`}>
                    <h4 className={`${cx('')}`}>About Sơn Tùng M-TP</h4>
                    <div className={`${cx('')} d-flex align-items-start mt-4`}>
                        <div
                            className={`${cx(
                                'about__artist--img',
                            )} overflow-hidden rounded-2`}
                        >
                            <img
                                className="w-100 h-100"
                                src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/f/b/f/1/fbf16d7352a3eea6be8cf5d4b217516d.jpg"
                                alt=""
                            />
                        </div>
                        <div className={`${cx('content')} ms-4`}>
                            <p className="mb-5">
                                Thanh Tùng bắt đầu chơi nhạc từ cấp ba với nghệ
                                danh M-TP và được biết đến với "Cơn Mưa Ngang
                                Qua". Năm 2012, anh đậu thủ khoa Nhạc viện TPHCM
                                và ký hợp đồng với Văn Production, đổi nghệ danh
                                sang Sơn Tùng M-TP. Từ 2013 đến 2015, anh có
                                nhiều bản hit như "Em Của Ngày Hôm Qua", "Nắng
                                Ấm Xa Dần"... Năm 2015, anh rời khỏi công ty cũ
                                và gia nhập WePro, tổ chức minishow đầu tiên
                                "M-TP and Friends". Năm 2017, anh rời khỏi WePro
                                để thành lập M-TP Entertainment, ra mắt "Lạc
                                Trôi" và "Nơi Này Có Anh". Anh ra mắt album đầu
                                tay "m-tp M-TP". Năm 2018 anh ra mắt "Chạy Ngay
                                Đi" và "Hãy Trao Cho Anh" năm 2019. Cả hai bài
                                hát đều trở thành hit. Đặc biệt "Hãy Trao Cho
                                Anh" kết hợp với Snopp Dogg đã đưa tên tuổi anh
                                ra thế giới.
                            </p>
                            <div
                                className={`${cx(
                                    '',
                                )} d-flex align-items-center`}
                            >
                                <div className="me-5">
                                    <span className="d-block fs-5 fw-bold">
                                        {convertNumber(
                                            numberInterested.toLocaleString(),
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
                                        style={{ width: 40, height: 40 }}
                                        src={zing}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Artist;