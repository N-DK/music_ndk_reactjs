import Home from '~/pages/Home';
import Album from '~/pages/Album';

// not need login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/album', component: Album },
];

// need login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
