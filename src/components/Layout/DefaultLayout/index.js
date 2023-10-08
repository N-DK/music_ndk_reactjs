import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [isLogin, setIsLogin] = useState(true);
    const [userNameLogin, setUserNameLogin] = useState('');
    const [passLogin, setPassLogin] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passSignUp, setPassSignUp] = useState('');
    const [nickName, setNickName] = useState('');
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleLogin = () => {
        console.log('Handling log in');
    };

    const validEmail = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$',
    );

    const handleSignUp = () => {
        console.log('Handling sign up');
    };

    const isCheckLeapYear = (year) => {
        return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
    };

    const checkInputFormSignUp = () => {
        var arr = [emailSignUp, passSignUp, nickName, date, month, year];
        var flagEmpty = true;
        var limitDate = 31;
        var isYear = year >= 1900 && year <= 2023;
        var isEmail = validEmail.test(emailSignUp);

        arr.map((item) => {
            if (item == '') flagEmpty = false;
        });

        switch (month) {
            case '01':
            case '03':
            case '05':
            case '07':
            case '08':
            case '10':
            case '12':
                limitDate = 31;
                break;
            case '04':
            case '06':
            case '09':
            case '11':
                limitDate = 30;
                break;
            case '02':
                limitDate = isCheckLeapYear(year) ? 29 : 28;
                break;
            default:
                break;
        }

        var isDate = date <= limitDate;

        return flagEmpty && isDate && isYear && isEmail;
    };

    const checkInputFormLogin = () => {
        var arr = [userNameLogin, passLogin];
        var flag = true;
        arr.map((item) => {
            if (item == '') flag = false;
        });
        return flag;
    };

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
            <div className="modal fade f-family" id="modalLogin">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="p-5 pt-4">
                                {isLogin ? (
                                    <div className="border-bottom pb-4 mb-4">
                                        <h3 className="text-center mb-4">
                                            Log in to Mulienfe
                                        </h3>
                                        <div className="pb-3">
                                            <label className="d-block pb-1">
                                                Email or username
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setUserNameLogin(
                                                        e.target.value,
                                                    )
                                                }
                                                value={userNameLogin}
                                                className={`${cx(
                                                    'input-form',
                                                )} w-100 form-control`}
                                            />
                                        </div>
                                        <div className="pb-3">
                                            <label className="d-block pb-1">
                                                Password
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setPassLogin(e.target.value)
                                                }
                                                value={passLogin}
                                                className={`${cx(
                                                    'input-form',
                                                )} w-100 form-control`}
                                                type="password"
                                            />
                                        </div>
                                        <button
                                            onClick={
                                                checkInputFormLogin()
                                                    ? handleLogin
                                                    : () => {}
                                            }
                                            className={`${cx(
                                                checkInputFormLogin()
                                                    ? 'is-active'
                                                    : 'is-disable',
                                                'btn-login',
                                            )} w-100 rounded-5 mt-4 border-0`}
                                        >
                                            Log In
                                        </button>
                                        <div className="text-center mt-4">
                                            <a
                                                href="#"
                                                className="fs-6 text--primary "
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border-bottom pb-4 mb-4">
                                        <h3 className="text-center mb-4">
                                            Sign up for Mulienfe
                                        </h3>
                                        <div className="pb-3">
                                            <label className="d-block pb-1">
                                                What's your email?
                                            </label>
                                            <input
                                                type="email"
                                                onChange={(e) =>
                                                    setEmailSignUp(
                                                        e.target.value,
                                                    )
                                                }
                                                value={emailSignUp}
                                                className={`${cx(
                                                    'input-form',
                                                )} w-100 form-control`}
                                                required
                                            />
                                        </div>
                                        <div className="pb-3">
                                            <label className="d-block pb-1">
                                                Create a password
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setPassSignUp(
                                                        e.target.value,
                                                    )
                                                }
                                                value={passSignUp}
                                                className={`${cx(
                                                    'input-form',
                                                )} w-100 form-control`}
                                                type="password"
                                            />
                                        </div>
                                        <div className="pb-3">
                                            <label className="d-block pb-1">
                                                What should we call you?
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setNickName(e.target.value)
                                                }
                                                value={nickName}
                                                className={`${cx(
                                                    'input-form',
                                                )} w-100 form-control`}
                                            />
                                        </div>
                                        <div className="pb-3">
                                            <label className="d-block pb-1">
                                                What's your date of birth?
                                            </label>
                                            <div className="d-flex align-items-center">
                                                <div className="row">
                                                    <div className="col-3">
                                                        <input
                                                            className={`${cx(
                                                                'input-form',
                                                            )} form-control`}
                                                            placeholder="DD"
                                                            maxLength={2}
                                                            onChange={(e) =>
                                                                setDate(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            value={date}
                                                        />
                                                    </div>
                                                    <div className="col-5">
                                                        <select
                                                            value={month}
                                                            className={`${cx(
                                                                'input-form',
                                                            )} form-control`}
                                                            placeholder="DD"
                                                            onChange={(e) => {
                                                                setMonth(
                                                                    e.target
                                                                        .value,
                                                                );
                                                            }}
                                                        >
                                                            <option
                                                                disabled={
                                                                    month != ''
                                                                }
                                                                value=""
                                                            >
                                                                Month
                                                            </option>
                                                            <option value="01">
                                                                January
                                                            </option>
                                                            <option value="02">
                                                                February
                                                            </option>
                                                            <option value="03">
                                                                March
                                                            </option>
                                                            <option value="04">
                                                                April
                                                            </option>
                                                            <option value="05">
                                                                May
                                                            </option>
                                                            <option value="06">
                                                                June
                                                            </option>
                                                            <option value="07">
                                                                July
                                                            </option>
                                                            <option value="08">
                                                                August
                                                            </option>
                                                            <option value="09">
                                                                September
                                                            </option>
                                                            <option value="10">
                                                                October
                                                            </option>
                                                            <option value="11">
                                                                November
                                                            </option>
                                                            <option value="12">
                                                                December
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="col-4">
                                                        <input
                                                            className={`${cx(
                                                                'input-form',
                                                            )} form-control`}
                                                            placeholder="YYYY"
                                                            maxLength={4}
                                                            onChange={(e) =>
                                                                setYear(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            value={year}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={
                                                checkInputFormSignUp()
                                                    ? handleSignUp
                                                    : () => {}
                                            }
                                            className={`${cx(
                                                checkInputFormSignUp()
                                                    ? 'is-active'
                                                    : 'is-disable',
                                                'btn-login',
                                            )} w-100 rounded-5 mt-4 border-0`}
                                        >
                                            Sign up
                                        </button>
                                        <div className="text-center mt-4">
                                            <a
                                                href="#"
                                                className="fs-6 text--primary "
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>
                                )}
                                <div className="text-center pt-3">
                                    {isLogin
                                        ? "Don't have an account?"
                                        : 'Already have an account?'}
                                    <a
                                        onClick={() => setIsLogin(!isLogin)}
                                        href="#"
                                        className="ps-1 text--primary"
                                    >
                                        {isLogin
                                            ? 'Sign up for Mulienfe'
                                            : 'Log in to Mulienfe'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;
