
import Feedbacks from './views/employee/Feedbacks';
import Feedback from './views/employee/Feedback';

export const EmployeeRoutes = [
    {
        path: '/feedbacks/group/:id',
        component: Feedbacks
    },
    {
        path: '/feedbacks/:id',
        component: Feedback
    },
]

export const ApiRoutes = {
    feedbackGroups: '/api/groups',
    feedbacks: '/api/feedbacks',
    feedbackResponses: '/api/responses',
    feedbackComments: '/api/comments'
}
