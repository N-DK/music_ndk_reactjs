import Home from '~/pages/Home';
import MyMusic from '~/pages/MyMusic';
import Topic from '~/pages/Topic';

// not need login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/mymusic', component: MyMusic },
    { path: '/hub', component: Topic },
];

// need login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
