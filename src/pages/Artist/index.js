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

const cx = classNames.bind(styles);

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
                    <div className={`${cx('')} f-family text-white`}>
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
                                    )} border fs-13 rounded-5 ms-4 p-1 ps-3 pe-3`}
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
                                    className={`${cx(
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
                            <SongItem colorTextBlack={true} />
                            <SongItem colorTextBlack={true} />
                            <SongItem colorTextBlack={true} />
                        </div>
                        <div className="col-6">
                            <SongItem colorTextBlack={true} />
                            <SongItem colorTextBlack={true} />
                            <SongItem colorTextBlack={true} />
                        </div>
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
