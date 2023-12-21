import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardSongItem from '../CardSongItem';
import styles from './Receptacle.module.scss';
import classNames from 'classnames/bind';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Receptacle({ title, limit = 5, data, more, type }) {
    return (
        <div className={`${cx('wrapper')} rounded-4 overflow-hidden mt-5 `}>
            <div
                className={` border-bottom d-flex align-item justify-content-between p-3 pt-4 pb-4`}
            >
                <h4 className={`mb-0 f-family `}>{title}</h4>

                {more && (
                    <Link
                        to={more}
                        className="f-family text--primary d-flex align-items-center text-decoration-none"
                    >
                        <span className="me-2">View more</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                )}
            </div>
            <div className={`p-3`}>
                <div className={`row pt-3 pb-3`}>
                    {data &&
                        data
                            .slice(0, limit)
                            .map((element, index) => (
                                <CardSongItem
                                    data={element}
                                    key={index}
                                    type={type}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
}

export default Receptacle;
