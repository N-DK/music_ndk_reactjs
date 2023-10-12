import { useState } from 'react';
import styles from './CardArtist.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CardArtist() {
    const [numberInterested, setNumberInterested] = useState(2447764);
    const [isInterested, setIsInterested] = useState(false);

    const convertNumber = (number) => {
        var suffixes = ['', 'K', 'M', 'B', 'T'];
        var suffixNum = 0;

        while (number >= 1000) {
            number /= 1000;
            suffixNum++;
        }

        return number.toFixed(1) + suffixes[suffixNum];
    };

    return (
        <div
            className={`${cx(
                'wrapper',
            )} col-2-4 col-md-3 col-sm-4 col-xs-6 mb-3`}
        >
            <div className="text-center f-family">
                <div className={`${cx('')} rounded-circle overflow-hidden`}>
                    <img
                        className="w-100 h-100"
                        src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/f/b/f/1/fbf16d7352a3eea6be8cf5d4b217516d.jpg"
                        alt=""
                    />
                </div>
                <Link
                    to="/artist/son-tung-m-tp"
                    className="mt-2 d-inline-block text-decoration-none text-dark"
                >
                    Sơn Tùng M-TP
                </Link>
                <p className="fs-13 subtitle_color">
                    <span>{convertNumber(numberInterested)}</span> quan tâm
                </p>
                {!isInterested ? (
                    <div
                        onClick={() => {
                            setNumberInterested((prev) => prev + 1);
                            setIsInterested(true);
                        }}
                        className={`${cx(
                            'interested',
                        )} border fs-13 rounded-5 w-75 m-auto p-1 `}
                    >
                        <FontAwesomeIcon icon={faUserPlus} className="me-2 " />
                        <span className=" text-uppercase">quan tâm</span>
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            setNumberInterested((prev) => prev - 1);
                            setIsInterested(false);
                        }}
                        className={`${cx(
                            'interested',
                        )} border fs-13 rounded-5 w-75 m-auto p-1  `}
                    >
                        <FontAwesomeIcon icon={faCheck} className="me-2 " />
                        <span className=" text-uppercase">đã quan tâm</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardArtist;
