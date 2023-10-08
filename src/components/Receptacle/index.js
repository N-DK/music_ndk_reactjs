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
import React, { useRef } from 'react';
import Slider from 'react-slick';

const cx = classNames.bind(styles);

const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

const setting_3item = {
    ...settings,
    slidesToShow: 3,
};

function Receptacle({ title, control, limit = 5, video = false }) {
    const slider = useRef();

    const next = () => {
        slider.current.slickNext();
    };

    const prev = () => {
        slider.current.slickPrev();
    };

    return (
        <div className={`${cx('wrapper')} rounded-4 overflow-hidden mt-5 `}>
            <div
                className={` border-bottom d-flex align-item justify-content-between p-3 pt-4 pb-4`}
            >
                <h4 className={`mb-0 f-family `}>{title}</h4>
                {control ? (
                    <div className={`d-flex align-content-center me-3`}>
                        <a
                            onClick={prev}
                            className={`me-4 text-decoration-none me-2 text--primary`}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </a>
                        <a
                            onClick={next}
                            className={` text-decoration-none me-2 text--primary`}
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </a>
                    </div>
                ) : (
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
                {control ? (
                    video ? (
                        <Slider
                            ref={slider}
                            className={`${cx('')} pt-3 pb-3`}
                            {...setting_3item}
                        >
                            {Array(10)
                                .fill(10)
                                .map((element, index) => (
                                    <div key={index} className="ps-1 pe-1">
                                        <CardVideoSongItem isSlider={true} />
                                    </div>
                                ))}
                        </Slider>
                    ) : (
                        <Slider
                            ref={slider}
                            className={`${cx('')} pt-3 pb-3`}
                            {...settings}
                        >
                            {Array(10)
                                .fill(10)
                                .map((element, index) => (
                                    <div key={index} className="">
                                        <CardSongItem isSlider={true} />
                                    </div>
                                ))}
                        </Slider>
                    )
                ) : (
                    <div className={`row pt-3 pb-3`}>
                        {video
                            ? Array(3)
                                  .fill(3)
                                  .map((element, index) => (
                                      <CardVideoSongItem key={index} />
                                  ))
                            : Array(limit)
                                  .fill(limit)
                                  .map((element, index) => (
                                      <CardSongItem key={index} />
                                  ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Receptacle;
