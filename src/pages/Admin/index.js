import { useState } from 'react';
import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import AdminTables from '~/components/AdminTables';

const cx = classNames.bind(styles);

const listNav = [
    {
        content: 'genres',
    },
    {
        content: 'song',
    },
    {
        content: 'artist',
    },
    {
        content: 'album',
    },
];

function Admin() {
    const [navActive, setNavActive] = useState('song');
    // const handleFindCate = () => {
    //     listNav.filter((nav) => {
    //         if (nav.id == navActive) return nav.content;
    //     });
    // };

    return (
        <>
            <div className={`${cx('wrapper')}`}>
                <div
                    className={`${cx(
                        '',
                    )} d-flex align-items-center f-family pt-3`}
                >
                    {listNav.map((nav, index) => (
                        <button
                            onClick={() => setNavActive(nav.content)}
                            key={index}
                            href="#"
                            className={` text-capitalize text-decoration-none rounded-4 p-2 text-dark me-2 ${cx(
                                'nav-item',
                                `${navActive == nav.content && 'active'}`,
                            )}`}
                        >
                            {nav.content}
                        </button>
                    ))}
                </div>
                <div className={`mt-3 ${cx('')}`}>
                    <AdminTables category={navActive} />
                </div>
            </div>
        </>
    );
}

export default Admin;
