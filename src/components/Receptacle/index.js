import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardSongItem from '../CardSongItem';
import styles from './Receptacle.module.scss';
import classNames from 'classnames/bind';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

// const settings = {
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//         {
//             breakpoint: 1200,
//             settings: {
//                 slidesToShow: 4,
//                 slidesToScroll: 4,
//             },
//         },
//         {
//             breakpoint: 1024,
//             settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 3,
//                 infinite: true,
//             },
//         },
//         {
//             breakpoint: 768,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//                 initialSlide: 2,
//             },
//         },
//         {
//             breakpoint: 480,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 1,
//             },
//         },
//     ],
// };

// const setting_3item = {
//     ...settings,
//     slidesToShow: 3,
//     responsive: [
//         {
//             breakpoint: 768,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//                 initialSlide: 2,
//             },
//         },
//         {
//             breakpoint: 480,
//             settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//             },
//         },
//     ],
// };

function Receptacle({ title, limit = 5, data, more, type }) {
    // const slider = useRef();
    // const next = () => {
    //     slider.current.slickNext();
    // };
    // const prev = () => {
    //     slider.current.slickPrev();
    // };

    return (
        <div className={`${cx('wrapper')} rounded-4 overflow-hidden mt-5 `}>
            <div
                className={` border-bottom d-flex align-item justify-content-between p-3 pt-4 pb-4`}
            >
                <h4 className={`mb-0 f-family `}>{title}</h4>
                {/* {control ? (
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
                    <Link
                        to={more}
                        className="f-family text--primary d-flex align-items-center text-decoration-none"
                    >
                        <span className="me-2">View more</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                )} */}

                <Link
                    to={more}
                    className="f-family text--primary d-flex align-items-center text-decoration-none"
                >
                    <span className="me-2">View more</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
            </div>
            <div className={`p-3`}>
                {/* {control ? (
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
                            {data &&
                                data.map((element, index) => (
                                    <div key={index} className="">
                                        <CardSongItem
                                            data={element}
                                            isSlider={true}
                                            type={type}
                                        />
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
                            : data &&
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
                )} */}
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
