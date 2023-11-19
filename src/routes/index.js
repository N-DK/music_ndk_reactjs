import Admin from '~/pages/Admin';
import AdminItems from '~/pages/Admin/AdminItems';
import Album from '~/pages/Album';
import Artist from '~/pages/Artist';
import ArtistMore from '~/pages/Artist/ArtistMore';
import Home from '~/pages/Home';
import MyMusic from '~/pages/MyMusic';
import Search from '~/pages/Search';
import Topic from '~/pages/Topic';

// not need login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/mymusic', component: MyMusic },
    { path: '/hub', component: Topic },
    { path: '/artist/:id', component: Artist },
    { path: '/artist/:id/:slug', component: ArtistMore },
    { path: '/album/:id', component: Album },
    { path: '/search', component: Search },
    { path: '/admin', component: Admin },
    { path: '/admin/:item/', component: AdminItems },
    { path: '/admin/:item/:id', component: AdminItems },
];

// need login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
