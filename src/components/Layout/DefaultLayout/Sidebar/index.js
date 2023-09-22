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
const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div
            className={`${cx(
                'wrapper',
            )} ps-4 pe-4 position-fixed top-0 start-0`}
        >
            <div className={`${cx('header')} pt-3`}>
                <img src={logo} alt="" />
            </div>
            <div>
                <ul className={` m-0 p-0 list-unstyled mt-4`}>
                    <li>
                        <Link
                            to="/"
                            className={`pt-3 pb-3 d-block text-decoration-none d-flex align-items-center text--primary`}
                        >
                            <FontAwesomeIcon icon={faHouse} />
                            <span className={`${cx('')} ms-2`}>Home</span>
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
                            <span className="ms-2">Create new playlist</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
