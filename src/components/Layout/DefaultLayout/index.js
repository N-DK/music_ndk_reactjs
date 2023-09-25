import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

function DefaultLayout({ children }) {
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
                                    <div className=" overflow-y-scroll h-100 p-2 lh-lg">
                                        Đưa em về nhà
                                        <br />
                                        Mây trôi chiều tà <br />
                                        Sao trong lòng muốn Lối đi về càng thêm
                                        xa
                                        <br /> Đưa em về nhà Xe đi tà tà <br />
                                        Đi ngang nhà hát mua ly trà
                                        <br /> Vị giống như ngày đầu mới yêu
                                        <br /> Nói ra bao điều Nhẹ nhàng cùng
                                        feel
                                        <br /> Mà trong đầu không một chút nghĩ
                                        suy
                                        <br /> Về gần tới nơi Mà mình đâu nào
                                        muốn rời
                                        <br /> Còn bao điều chưa kịp trao
                                        <br />
                                        Thôi đành hôm khác <br />
                                        Đưa em về nhà Mây trôi chiều tà <br />
                                        Thật lòng chỉ muốn Lối đi này càng về
                                        càng xa <br />
                                        Và đưa em về nhà <br />
                                        Con tim thật thà
                                        <br /> Đèn đỏ ơi nếu, nếu như mà được
                                        <br />
                                        Thì đỏ hết thêm năm thêm bảy ngã tư
                                        <br />
                                        Đưa em về, đưa em về <br />
                                        Đưa em về, đưa em về <br />
                                        Đưa em về, đưa em về <br />
                                    </div>
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
