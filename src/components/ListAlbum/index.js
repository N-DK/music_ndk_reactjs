import Cookies from 'js-cookie';
import ListAlbumItem from '../ListAlbumItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from '~/utils/getUser';

function ListAlbum({ data }) {
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

    return (
        <div className="mt-4">
            <div className=" border-bottom pb-2 pe-3 ps-3">
                <div className="row">
                    <div className=" col-xl-7">
                        <span>ALBUM</span>
                    </div>
                    <div className=" col-xl-5">
                        <span>RELEASE</span>
                    </div>
                </div>
            </div>
            {data.map((album) => (
                <ListAlbumItem user={user} key={album.id} data={album} />
            ))}
        </div>
    );
}

export default ListAlbum;
