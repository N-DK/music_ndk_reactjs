import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    useEffect(() => {
        var modal = document.getElementById('modalId');
        modal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget;
            var recipient = button.getAttribute('data-bs-lyric');
            modal.querySelector('.lyricModal').innerHTML = recipient;
        });
    }, []);

    return (
        <>
            <div className="overflow-hidden">
                <Sidebar />
                <div className="w-main float-end">
                    <Header />
                    <div className="mt-header">
                        <div className="container">
                            <div className="content">{children}</div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <div className="modal fade f-family" id="modalId">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <h4 className="modal-title" id="modalTitleId">
                                    Lyric
                                </h4>
                                <div
                                    style={{ height: 300 }}
                                    className={`mt-3 mb-3 border rounded-3 overflow-hidden`}
                                >
                                    <div
                                        className={`${cx(
                                            'lyric',
                                        )} h-100 p-2 lyricModal`}
                                    ></div>
                                </div>
                                <button
                                    style={{ borderRadius: 9999999 }}
                                    type="button"
                                    className="btn btn-secondary float-end border bg-transparent text-dark pe-4 ps-4"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;
