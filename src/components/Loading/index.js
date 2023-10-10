import styles from './Loading.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div
            className={` d-flex align-items-center justify-content-center position-fixed top-0 bottom-0 end-0 start-0 bg-white ${cx(
                'wrapper',
            )}`}
        >
            <div
                className={`${cx(
                    'img-container',
                )} d-flex algin-items-center justify-content-center`}
            >
                <img
                    src="https://i.pinimg.com/originals/cc/0e/d3/cc0ed34dd09adf414a19a69b460804f4.gif"
                    alt=""
                />
            </div>
        </div>
    );
}

export default Loading;
