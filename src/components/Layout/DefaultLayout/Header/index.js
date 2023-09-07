import {
    faArrowLeft,
    faArrowRight,
    faGear,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={`${cx('wrapper')} container`}>
            <div
                className={` d-flex align-items-center justify-content-between pt-3 pb-3`}
            >
                <div className={`d-flex align-items-center`}>
                    <div className={`d-flex align-content-center me-3`}>
                        <a
                            href="#"
                            className={`me-4 text-decoration-none me-2 text--primary`}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </a>
                        <a
                            href="#"
                            className={` text-decoration-none me-2 text--primary`}
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </a>
                    </div>
                    <div
                        className={`${cx('search')} d-flex align-items-center`}
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
                        />
                    </div>
                </div>
                <div className={`${cx('')} d-flex align-items-center`}>
                    <a
                        href=""
                        className="me-3 text-white rounded-circle d-flex align-items-center is_circle justify-content-center square_40"
                    >
                        <FontAwesomeIcon
                            icon={faGear}
                            className={`text-dark`}
                        />
                    </a>
                    <a
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
    );
}

export default Header;
