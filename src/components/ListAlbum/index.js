import ListAlbumItem from '../ListAlbumItem';

function ListAlbum({ data }) {
    return (
        <div className="mt-4">
            <div className=" border-bottom pb-2 pe-3 ps-3">
                <div className="row">
                    <div className=" col-xl-7">
                        <span>ALBUM</span>
                    </div>
                    <div className=" col-xl-5">
                        <span>PHÁT HÀNH</span>
                    </div>
                </div>
            </div>
            {data.map((album) => (
                <ListAlbumItem key={album.id} data={album} />
            ))}
        </div>
    );
}

export default ListAlbum;
