import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardSongItem from '../CardSongItem';
import styles from './Receptacle.module.scss';
import classNames from 'classnames/bind';
import {
    faArrowLeft,
    faArrowRight,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import CardVideoSongItem from '../CardVideoSongItem';

const cx = classNames.bind(styles);

function Receptacle({ title, control, limit = 5, video = false }) {
    return (
        <div className={`${cx('wrapper')} rounded-4 overflow-hidden mt-5 `}>
            <div
                className={` border-bottom d-flex align-item justify-content-between p-3 pt-4 pb-4`}
            >
                <h4 className={`mb-0 f-family `}>{title}</h4>
                {control && (
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
                )}
                {!control && (
                    <a
                        href="#"
                        className="f-family text--primary d-flex align-items-center text-decoration-none"
                    >
                        <span className="me-2">View more</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                )}
            </div>
            <div className={`p-3`}>
                <div className={` row pt-3 pb-3`}>
                    {video &&
                        Array(3)
                            .fill(3)
                            .map((element, index) => (
                                <CardVideoSongItem key={index} />
                            ))}
                    {!video &&
                        Array(limit)
                            .fill(limit)
                            .map((element, index) => (
                                <CardSongItem key={index} />
                            ))}

                    {/* <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem />
                    <CardSongItem /> */}
                </div>
            </div>
        </div>
    );
}

export default Receptacle;
