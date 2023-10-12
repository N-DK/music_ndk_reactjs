import styles from './CardVideoSongItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CardVideoSongItem({ isSlider }) {
    return (
        <div
            className={`${isSlider ? '' : 'col-xl-4 col-md-4 col-sm-6'} ${cx(
                '',
            )} mb-1 mt-1`}
        >
            <div className={`${cx('wrapper')} overflow-hidden rounded-3`}>
                <div>
                    {/* <video className="w-100 h-100" controls>
                        <source
                            src="https://templates.iqonic.design/muzik/html/images/dashboard/song-video/video-3.mp4"
                            type="video/mp4"
                        />
                    </video> */}
                    <a href="#">
                        <img
                            src="https://photo-resize-zmp3.zmdcdn.me/w600_r300x169_webp/thumb_video/e/3/e/9/e3e9f8e3c8b9e974152becc0c10ca554.jpg    "
                            alt=""
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </a>
                </div>
                <div
                    className={` text-center pt-4 pb-4 border rounded-3 border-top-0 rounded-top-0 f-family`}
                >
                    <h6 className="mb-1">Chạy ngay đi</h6>
                    <a href="#" className="subtitle_color  is_truncate">
                        Sơn Tùng M-TP
                    </a>
                    {/* <p className="subtitle_color">{389382}k Views</p> */}
                </div>
            </div>
        </div>
    );
}

export default CardVideoSongItem;
