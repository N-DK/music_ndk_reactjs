import Receptacle from '~/components/Receptacle';
import styles from './Topic.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Topic() {
    return (
        <div className={`${cx('wrapper')} pt-4`}>
            <div className={`${cx('banner')}`}>
                <div className={` overflow-hidden rounded-3`}>
                    <a href="#" className=" d-block">
                        <img
                            src="https://photo-zmp3.zmdcdn.me/cover/3/f/4/1/3f41f32d1ca9baeb2206137e5f2eab5c.jpg"
                            alt=""
                            className="w-100 h-100"
                        />
                    </a>
                </div>
            </div>
            <Receptacle title="Dance/Electronic" />
            <Receptacle title="Remix" />
            <Receptacle title="Hip-Hop" />
            <Receptacle title="Acoustic" />
            <Receptacle title="Indie" />
            <Receptacle title="Chill-Lofi" />
        </div>
    );
}

export default Topic;
