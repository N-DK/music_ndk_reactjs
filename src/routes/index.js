import Album from '~/pages/Album';
import Artist from '~/pages/Artist';
import Home from '~/pages/Home';
import MyMusic from '~/pages/MyMusic';
import Topic from '~/pages/Topic';

// not need login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/mymusic', component: MyMusic },
    { path: '/hub', component: Topic },
    { path: '/artist/:slug', component: Artist },
    { path: '/album/:slug', component: Album },
];

// need login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
