import SongItem from '~/components/SongItem';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Receptacle from '~/components/Receptacle';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={`${cx('wrapper')} pt-3`}>
            <aside
                className={`${cx(
                    'new-realeases__container',
                )} bg-white rounded-4 overflow-hidden`}
            >
                <h4 className={`mb-0 f-family p-3 pt-4 pb-4`}>New Realeases</h4>
                <div className={`${cx('bg__new')} p-4`}>
                    <SongItem />
                    <SongItem />
                    <SongItem />
                    <SongItem />
                </div>
            </aside>
            <Receptacle title="Featured Albums" control={true} />
            <Receptacle title="Trending Songs" limit={10} />
            <Receptacle title="Popular Hindi Songs" limit={10} />
            <Receptacle title="Hot songs" control={true} />
            <Receptacle title="Hot Video Songs" control={true} video={true} />
        </div>
    );
}

export default Home;
