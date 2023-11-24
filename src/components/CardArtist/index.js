import { useEffect, useState } from 'react';
import styles from './CardArtist.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CardArtist({ data }) {
    const [numberInterested, setNumberInterested] = useState(0);
    const [isInterested, setIsInterested] = useState(false);

    const convertNumber = (number = 0) => {
        var suffixes = ['', 'K', 'M', 'B', 'T'];
        var suffixNum = 0;

        while (number >= 1000) {
            number /= 1000;
            suffixNum++;
        }

        return suffixNum > 0
            ? number.toFixed(1) + suffixes[suffixNum]
            : number.toFixed(0) + suffixes[suffixNum];
    };

    useEffect(() => {
        setNumberInterested(data.numberFollower);
    }, [data]);

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
                        src={data.profilePath}
                        alt=""
                    />
                </div>
                <Link
                    to={`/artist/${data.id}`}
                    className="mt-2 d-inline-block text-decoration-none text-dark"
                >
                    {data.artistName}
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
