import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="overflow-hidden">
            <Sidebar />
            <div className="w-main float-end">
                <Header />
                <div className="container">
                    <div className="content">{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
