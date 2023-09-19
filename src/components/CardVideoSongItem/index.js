import styles from './CardVideoSongItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CardVideoSongItem() {
    return (
        <div className={`${cx('')} col-xl-6 mb-3`}>
            <div className={`${cx('wrapper')} overflow-hidden rounded-3`}>
                <div>
                    <video className="w-100 h-100" controls>
                        <source
                            src="https://templates.iqonic.design/muzik/html/images/dashboard/song-video/video-3.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
                <div
                    className={` text-center pt-4 pb-4 border rounded-3 border-top-0 rounded-top-0 f-family`}
                >
                    <h6 className="mb-1">Cheese (Single)</h6>
                    <p className="subtitle_color">{389382}k Views</p>
                </div>
            </div>
        </div>
    );
}

export default CardVideoSongItem;
