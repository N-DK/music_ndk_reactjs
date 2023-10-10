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
        content: 'albums',
    },
];

function Admin() {
    const [navActive, setNavActive] = useState('genres');
    const handleFindCate = () => {
        listNav.filter((nav) => {
            if (nav.id == navActive) return nav.content;
        });
    };

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
            <div className="modal fade f-family" id="modalDelete">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <h4
                                    className="modal-title text-center mb-4"
                                    id="modalTitleId"
                                >
                                    Do you want to delete?
                                </h4>
                                <div>
                                    <button
                                        style={{ borderRadius: 9999999 }}
                                        type="button"
                                        className="btn btn-secondary float-end border bg-transparent text-dark pe-4 ps-4"
                                        data-bs-dismiss="modal"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        style={{ borderRadius: 9999999 }}
                                        type="button"
                                        className="btn btn-secondary float-end border bg-transparent text-dark pe-4 ps-4 me-2"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;
