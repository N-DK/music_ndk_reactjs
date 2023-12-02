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
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import Cookies from 'js-cookie';
const cx = classNames.bind(styles);

function Header() {
    const token = Cookies.get('token');
    const [search, setSearch] = useState('');
    const [songs, setSongs] = useState([]);
    const [current, setCurrent] = useState(window.location.href);
    const [back, setBack] = useState([]);
    const [forward, setForward] = useState([]);
    const [isEnter, setIsEnter] = useState(true);
    const [isPopstate, setIsPopstate] = useState(false);
    const [isBlur, setIsBlur] = useState(false);
    const [isTurnOnMenu, setIsTurnOnMenu] = useState(false);
    const [isTurnOnSearch, setIsTurnOnSearch] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
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
        if (token) {
            axios
                .get('http://localhost:8080/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => setUser(res.data))
                .catch((err) => {
                    Cookies.remove('token');
                    console.log(err);
                });
        }
    }, [token]);

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
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/search/song?page=1&query=${search}`)
            .then((res) => {
                setSongs(res.data.results);
            })
            .catch((err) => console.log(err));
    }, [search]);

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
                                            setIsTurnOnMenu(!isTurnOnMenu)
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
                                    onFocus={() => setIsBlur(false)}
                                    onBlur={() =>
                                        setTimeout(() => {
                                            setIsBlur(true);
                                        }, 150)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            navigate(
                                                `/search/?query=${search}`,
                                            );
                                            setIsBlur(true);
                                            setSearch('');
                                        }
                                    }}
                                />
                                {search && !isBlur && songs.length > 0 && (
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
                                                onClick={() => {
                                                    setIsBlur(true);
                                                    setSearch('');
                                                }}
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
                                        setIsTurnOnMenu(!isTurnOnMenu)
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
                                data-bs-toggle={!token && 'modal'}
                                data-bs-target={!token && '#modalLogin'}
                                href="#"
                                className="rounded-circle square_40 d-block overflow-hidden"
                            >
                                <figure>
                                    <img
                                        src={
                                            user.avatar
                                                ? user.avatar
                                                : 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.67/static/media/user-default.3ff115bb.png'
                                        }
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
                                                onClick={() =>
                                                    setIsTurnOnSearch(
                                                        !isTurnOnSearch,
                                                    )
                                                }
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
                onClick={() => setIsTurnOnMenu(false)}
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
                            onClick={() => setIsTurnOnMenu(!isTurnOnMenu)}
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
