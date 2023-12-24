import { useEffect, useRef } from 'react';
import styles from './ModalConfirm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ModalConfirm({ handleConfirm, turnOffModal }) {
    const wrapper = useRef();
    const modal = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modal.current && !modal.current.contains(e.target)) {
                turnOffModal();
            }
        };

        wrapper.current.addEventListener('click', handleClickOutside);
    }, []);

    return (
        <div
            ref={wrapper}
            className={`position-fixed w-100 h-100 top-0 start-0 f-family ${cx(
                'wrapper',
            )}`}
        >
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <div
                    ref={modal}
                    className={`bg-white rounded-2 p-3 ${cx('container')}`}
                >
                    <h5 className=" fw-semibold">Delete Playlist</h5>
                    <p>
                        Your playlist will be removed from your personal
                        library. Do you want to delete?
                    </p>
                    <div className=" float-end d-flex align-items-center">
                        <button
                            onClick={turnOffModal}
                            className="p-1 pe-4 ps-4 border rounded-5 me-3"
                        >
                            No
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="p-1 pe-4 ps-4 border-0 bg--primary rounded-5"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;
