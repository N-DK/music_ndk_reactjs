import Receptacle from '~/components/Receptacle';
import styles from './Topic.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

const CHILL =
    'https://photo-zmp3.zmdcdn.me/cover/3/f/4/1/3f41f32d1ca9baeb2206137e5f2eab5c.jpg';
const REMIX =
    'https://photo-zmp3.zmdcdn.me/cover/7/0/5/c/705c00fb2d17dd62845323205334119e.jpg';
const DEFAULT = [
    {
        title: 'Chill-Lofi',
        code: 'chill',
    },
    {
        title: 'Remix',
        code: 'remix',
    },
];

function Topic() {
    let { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState(DEFAULT);
    const [bg, setBg] = useState(REMIX);

    // async await để thực hiện trong vòng for một cách tuần tự vì trong vòng for không chờ đợi call api
    const updateDataForCategory = async () => {
        setLoading(true);
        for (const category of DEFAULT) {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/playlist/topic/${category.code}`,
                );
                category.data = res.data.results;
            } catch (error) {
                console.log(error);
            }
        }
        setCategories([...DEFAULT]);
        setLoading(false);
    };

    useEffect(() => {
        if (slug) {
            switch (slug) {
                case 'chill':
                    setBg(CHILL);
                    break;
                case 'remix':
                    setBg(REMIX);
                    break;
                default:
                    setBg(REMIX);
                    break;
            }
        }
    }, [slug]);

    useEffect(() => {
        if (slug) {
            setLoading(true);
            axios
                .get(`http://localhost:8080/api/playlist/topic/genres/${slug}`)
                .then((res) => {
                    setCategories([...res.data]);
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        } else {
            setCategories(DEFAULT);
            updateDataForCategory();
        }
    }, [slug]);

    useEffect(() => {
        if (!slug) {
            updateDataForCategory();
        }
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={`${cx('wrapper')} pt-4`}>
                    <div className={`${cx('banner')}`}>
                        <div className={` overflow-hidden rounded-3`}>
                            <a href="#" className=" d-block">
                                <img src={bg} alt="" className="w-100 h-100" />
                            </a>
                        </div>
                    </div>
                    {categories.map((cate, index) => (
                        <Receptacle
                            key={index}
                            title={cate.title}
                            more={cate.code}
                            data={cate.data}
                            type={'playlist'}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Topic;
