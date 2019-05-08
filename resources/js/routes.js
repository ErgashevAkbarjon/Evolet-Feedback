
import Feedbacks from './views/Feedbacks';
import Feedback from './views/Feedback';

export default [
    {
        path: '/feedbacks/group/:id',
        component: Feedbacks
    },
    {
        path: '/feedbacks/:id',
        component: Feedback
    },
]

export const SidebarGroups = {
    path: '/api/groups'
}
