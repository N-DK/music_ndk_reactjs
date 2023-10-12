import {
    faArrowLeft,
    faArrowRight,
    faCompactDisc,
    faGear,
    faHouse,
    faIcons,
    faMagnifyingGlass,
    faPlus,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import logo from '~/img/logo.png';
import bar from '~/img/bar.png';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListSongItem from '~/components/ListSongItem';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
const cx = classNames.bind(styles);

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

function Header() {
    const [search, setSearch] = useState('');
    const [current, setCurrent] = useState(window.location.href);
    const [back, setBack] = useState([]);
    const [forward, setForward] = useState([]);
    const [isEnter, setIsEnter] = useState(true);
    const [isPopstate, setIsPopstate] = useState(false);
    const [isBlur, setIsBlur] = useState(false);
    const navigate = useNavigate();
    const [isTurnOnMenu, setIsTurrOnMenu] = useState(false);
    const [isTurnOnSearch, setIsTurnOnSearch] = useState(false);
    const isTabletMobile = useMediaQuery({ maxWidth: 900 });
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const goToPreviousPage = () => {
        var lastItemBack = back.pop();
        navigate(-1);
        setForward((prev) => [...prev, current]);
        setIsEnter(true);
        setCurrent(lastItemBack);
    };

    const goToNextPage = () => {
        var lastItemForward = forward.pop();
        navigate(1);
        setBack((prev) => [...prev, current]);
        setIsEnter(true);
        setCurrent(lastItemForward);
    };

    useEffect(() => {
        if (!isEnter) {
            setBack([...back, current]);
            setCurrent(window.location.href);
            if (!isPopstate) {
                setForward([]);
            }
        }
        setIsEnter(false);
    }, [window.location.href]);

    useEffect(() => {
        const handlePopstate = () => {
            setIsPopstate(true);
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    useEffect(() => {
        if (isPopstate && !isEnter) {
            var length = back.length;
            setBack((prev) => {
                var lastItem = prev.pop();
                if (prev.length == length) {
                    return prev;
                } else {
                    return [...prev, lastItem];
                }
            });
            if (window.location.href == back[back.length - 1]) {
                var lastItemBack = back.pop();
                setForward([...forward, current]);
                setCurrent(lastItemBack);
                setBack(back);
            } else if (window.location.href == forward[forward.length - 1]) {
                var lastItemForward = forward.pop();
                setBack([...back, current]);
                setCurrent(lastItemForward);
                setForward(forward);
            }
        }
        setIsPopstate(false);
    }, [isPopstate]);

    useEffect(() => {
        document.body.style.overflow =
            isTurnOnMenu || (isTurnOnSearch && isMobile) ? 'hidden' : 'scroll';
    }, [isTurnOnMenu, isTurnOnSearch, isMobile]);

    // call api
    useEffect(() => {}, [search]);

    return (
        <>
            <div
                className={`${cx('wrapper')}  position-fixed top-0 end-0 ${
                    isTabletMobile && 'w-100'
                }`}
            >
                <div className="container">
                    <div
                        className={` d-flex align-items-center justify-content-between pt-3 pb-3 `}
                    >
                        <div
                            className={`d-flex align-items-center ${
                                isMobile && 'd-none'
                            }`}
                        >
                            {!isTabletMobile ? (
                                <div
                                    className={`d-flex align-content-center me-3`}
                                >
                                    <a
                                        onClick={
                                            !(back.length < 1)
                                                ? goToPreviousPage
                                                : () => {}
                                        }
                                        className={`${cx(
                                            back.length < 1
                                                ? 'is_disable'
                                                : 'is_active',
                                        )} me-4 text-decoration-none me-2 text--primary`}
                                    >
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </a>
                                    <a
                                        onClick={
                                            !(forward.length < 1)
                                                ? goToNextPage
                                                : () => {}
                                        }
                                        className={`${cx(
                                            forward.length < 1
                                                ? 'is_disable'
                                                : 'is_active',
                                        )} text-decoration-none me-2 text--primary`}
                                    >
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </a>
                                </div>
                            ) : (
                                <>
                                    <a
                                        onClick={() =>
                                            setIsTurrOnMenu(!isTurnOnMenu)
                                        }
                                        href="#"
                                        style={{ width: '40px' }}
                                        className={`${cx('')} me-2`}
                                    >
                                        <img
                                            className="w-100 h-100"
                                            src={bar}
                                            alt=""
                                        />
                                    </a>
                                </>
                            )}
                            <div
                                className={` position-relative ${cx(
                                    'search',
                                )} d-flex align-items-center`}
                            >
                                <a
                                    href="#"
                                    className={` text-decoration-none me-2 text--primary`}
                                >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </a>
                                <input
                                    type="text"
                                    className={` border-0 bg-transparent f-family`}
                                    placeholder="Search song..."
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                    onBlur={() => setIsBlur(true)}
                                    onFocus={() => setIsBlur(false)}
                                />
                                {search && !isBlur && (
                                    <div
                                        className={` bg-white ${cx(
                                            'result',
                                        )} rounded-3 position-absolute start-0 w-100 top-100 mt-2 pt-3 pb-3`}
                                    >
                                        {songs.map((song, index) => (
                                            <ListSongItem
                                                key={index}
                                                song={song}
                                                songs={songs}
                                                isSearchItem={true}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {isMobile && (
                            <>
                                <a
                                    onClick={() =>
                                        setIsTurrOnMenu(!isTurnOnMenu)
                                    }
                                    href="#"
                                    className={`${cx('logo')}`}
                                >
                                    <img
                                        className="w-50 h-100"
                                        src={bar}
                                        alt=""
                                    />
                                </a>
                                <div className={`${cx('logo')}`}>
                                    <img
                                        className="w-100 h-100"
                                        src={logo}
                                        alt=""
                                    />
                                </div>
                            </>
                        )}
                        <div className={`${cx('')} d-flex align-items-center`}>
                            <a
                                onClick={() => {
                                    if (isMobile) {
                                        setIsTurnOnSearch(!isTurnOnSearch);
                                    }
                                }}
                                href="#"
                                className="me-3 text-white rounded-circle d-flex align-items-center is_circle justify-content-center square_40"
                            >
                                <FontAwesomeIcon
                                    icon={
                                        isMobile
                                            ? !isTurnOnSearch
                                                ? faMagnifyingGlass
                                                : faXmark
                                            : faGear
                                    }
                                    className={`text-dark`}
                                />
                            </a>
                            <a
                                data-bs-toggle="modal"
                                data-bs-target="#modalLogin"
                                href="#"
                                className="rounded-circle square_40 d-block overflow-hidden"
                            >
                                <figure>
                                    <img
                                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.67/static/media/user-default.3ff115bb.png"
                                        alt=""
                                        className="w-100 h-100"
                                    />
                                </figure>
                            </a>
                        </div>
                    </div>
                </div>
                {isMobile && (
                    <div className="container">
                        <div
                            className={`${cx(
                                !isTurnOnSearch ? 'not-is-search' : 'is-search',
                            )}`}
                        >
                            <div
                                className={` position-relative ${cx(
                                    'search',
                                )} d-flex align-items-center`}
                            >
                                <a
                                    href="#"
                                    className={` text-decoration-none me-2 text--primary`}
                                >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </a>
                                <input
                                    type="text"
                                    className={` border-0 bg-transparent f-family`}
                                    placeholder="Search song..."
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                    onBlur={() => setIsBlur(true)}
                                    onFocus={() => setIsBlur(false)}
                                />
                                {search && (
                                    <div
                                        className={` bg-white ${cx(
                                            'result',
                                        )} rounded-3 position-absolute start-0 w-100 top-100 mt-2 pt-3 pb-3`}
                                    >
                                        {songs.map((song, index) => (
                                            <ListSongItem
                                                key={index}
                                                song={song}
                                                songs={songs}
                                                isSearchItem={true}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div
                onClick={() => setIsTurrOnMenu(false)}
                className={` ${cx(
                    'menu-mobi',
                    `${isTurnOnMenu && 'active'}`,
                )} position-fixed top-0 start-0 bottom-0 end-0`}
            >
                <div
                    className={` position-absolute top-0 start-0 bottom-0 p-3 ${cx(
                        'menu__container',
                        `${isTurnOnMenu && 'active'}`,
                    )}`}
                >
                    <div className="float-end">
                        <p
                            onClick={() => setIsTurrOnMenu(!isTurnOnMenu)}
                            className="fs-3 text--primary text-decoration-none"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </p>
                    </div>
                    <div className="pt-3">
                        <ul className={` m-0 p-0 list-unstyled mt-4`}>
                            <li>
                                <Link
                                    to="/"
                                    className={`pt-3 pb-3 d-block text-decoration-none d-flex align-items-center text--primary`}
                                >
                                    <FontAwesomeIcon icon={faHouse} />
                                    <span className={`${cx('')} ms-2`}>
                                        Home
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/mymusic"
                                    className={`pt-3 pb-3 d-block text-decoration-none d-flex align-items-center text--primary`}
                                >
                                    <FontAwesomeIcon icon={faCompactDisc} />
                                    <span className={`${cx('')} ms-2 `}>
                                        My space music
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/hub"
                                    className={`pt-3 pb-3 d-block text-decoration-none d-flex align-items-center text--primary`}
                                >
                                    <FontAwesomeIcon icon={faIcons} />
                                    <span className={`${cx('')} ms-2`}>
                                        Topic and Genre
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`pt-3 pb-3 d-block text-decoration-none d-flex align-items-center text--primary`}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span className="ms-2">
                                        Create new playlist
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
