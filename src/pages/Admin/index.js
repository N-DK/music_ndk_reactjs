import { useEffect, useState } from 'react';
import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import AdminTables from '~/components/AdminTables';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loading from '~/components/Loading';
import { getUser } from '~/utils/getUser';

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
    {
        content: 'playlist',
    },
    {
        content: 'topic',
    },
];

function Admin() {
    const [navActive, setNavActive] = useState('song');
    const [confirm, setConfirm] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        const fetch = async () => {
            const user = await getUser();
            if (!user) {
                Cookies.remove('token');
            } else {
                setUser(user);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        if (user && user.roleCode === 'user') {
            window.location.href = '/';
            setConfirm(false);
        } else if (user && user.roleCode === 'admin') {
            setConfirm(true);
        }
    }, [user]);

    return (
        <>
            {!confirm ? (
                <Loading />
            ) : (
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
                        <AdminTables user={user} category={navActive} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Admin;
