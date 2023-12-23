import axios from 'axios';
import Cookies from 'js-cookie';

export const getUser = async () => {
    const token = Cookies.get('token');
    try {
        if (token) {
            const res = await axios.get('http://localhost:8080/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        } else {
            return;
        }
    } catch (error) {}
};
