import * as request from '~/utils/request';

export const search = async (query, page = 1) => {
    try {
        const res = await request.get('search/song', {
            params: {
                query,
                page,
            },
        });
        return res.results;
    } catch (err) {}
};
