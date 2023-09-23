import ListSong from '~/components/ListSong';
import styles from './Album.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Album() {
    return (
        <div className={`${cx('wrapper')} pt-5`}>
            <div className={`${cx('')} row`}>
                <div className="col-4">
                    <div className={`${cx('')} text-center f-family`}>
                        <div className={`${cx('')} rounded-4 overflow-hidden`}>
                            <img
                                className="w-100 h-100"
                                src="https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/4/5/4/9/45493e859cde749c75fb4377c14d0db3.jpg"
                                alt=""
                            />
                        </div>
                        <p
                            className={`${cx(
                                '',
                            )} text-capitalize fs-5 mt-2 mb-1`}
                        >
                            nhạc lofi chill gây nghiện
                        </p>
                        <p className={`${cx('')} mb-1`}>
                            Update date: 20/09/2023
                        </p>
                        <div className="fs-13 f-family subtitle_color">
                            <a
                                href="#"
                                className={` subtitle_color is_truncate`}
                            >
                                Da LAB
                            </a>
                            ,
                            <a
                                href="#"
                                className={`ms-1 subtitle_color is_truncate`}
                            >
                                Miu Lê
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className={`${cx('list-song__container')} f-family`}>
                        <p>
                            <span className="subtitle_color">Preface</span> Thả
                            mình vào những giai điệu Lofi Chill nghe là nghiện
                        </p>
                        <ListSong />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Album;
