import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import logo from '~/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompactDisc,
    faHouse,
    faIcons,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const cx = classNames.bind(styles);

function Sidebar() {
    const token = Cookies.get('token');

    const handleRouter = (route) => {
        if (route === '/') {
            return window.location.pathname === route;
        } else {
            return window.location.pathname.includes(route);
        }
    };

    return (
        <div className={`${cx('wrapper')}  position-fixed top-0 start-0`}>
            <div className="ps-4 pe-4">
                <div className={`${cx('header')} pt-3`}>
                    <Link to={'/'} className="d-block">
                        <img src={logo} alt="" />
                    </Link>
                </div>
            </div>
            <div>
                <ul className={` m-0 p-0 list-unstyled mt-4`}>
                    <li
                        className={`ps-4 pe-4 ${
                            handleRouter('/') && `${cx('active')}`
                        }`}
                    >
                        <Link
                            to="/"
                            className={` pt-3 pb-3 d-block text-decoration-none d-flex align-items-center text--primary`}
                        >
                            <FontAwesomeIcon icon={faHouse} />
                            <span className={`${cx('')} ms-2`}>Home</span>
                        </Link>
                    </li>
                    <li
                        className={`ps-4 pe-4 ${
                            handleRouter('/mymusic') && `${cx('active')}`
                        }`}
                    >
                        <Link
                            to="/mymusic"
                            data-bs-toggle={!token && 'modal'}
                            data-bs-target={!token && '#modalLogin'}
                            className={`pt-3 pb-3 d-block text-decoration-none d-flex align-items-center text--primary`}
                        >
                            <FontAwesomeIcon icon={faCompactDisc} />
                            <span className={`${cx('')} ms-2 `}>
                                My space music
                            </span>
                        </Link>
                    </li>
                    <li
                        className={`ps-4 pe-4 ${
                            handleRouter('/hub') && `${cx('active')}`
                        }`}
                    >
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
                    <li className={`ps-4 pe-4 `}>
                        <Link
                            data-bs-toggle={'modal'}
                            data-bs-target={
                                !token ? '#modalLogin' : '#modalPlaylist'
                            }
                            to=""
                            className={`pt-3 pb-3 d-block text-decoration-none d-flex align-items-center text--primary`}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span className="ms-2">Create new playlist</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
