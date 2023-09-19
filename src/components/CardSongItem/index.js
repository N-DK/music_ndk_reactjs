import styles from './CardSongItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CardSongItem() {
    return (
        <div className="col-2-4">
            <div className={`${cx('wrapper')} overflow-hidden rounded-3 mb-3`}>
                <div>
                    <img
                        src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/d/5/8/a/d58aa48a38c0a8dc89c95277b456bc75.jpg"
                        alt=""
                        className="w-100 h-100"
                    />
                </div>
                <div
                    className={` text-center pt-4 pb-4 border rounded-3 border-top-0 rounded-top-0 f-family`}
                >
                    <h6 className="mb-1">Cheese (Single)</h6>
                    <a href="#" className="subtitle_color  is_truncate">
                        Cravity
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CardSongItem;