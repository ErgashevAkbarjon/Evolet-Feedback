
import Feedbacks from './views/employee/Feedbacks';
import Feedback from './views/employee/Feedback';

import NewFeedback from './views/customer/NewFeedback';
import CustomerFeedbacks from './views/customer/Feedbacks';

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

export const CustomerRoutes = [
    {
        path: '/',
        component: NewFeedback,
        exact: true
    },
    {
        path: '/customer/feedbacks',
        component: CustomerFeedbacks
    },
    {
        path: '/customer/feedbacks/:id',
        component: Feedback
    }
]

export const ApiRoutes = {
    feedbackGroups: '/api/groups',
    feedbacks: '/api/feedbacks',
    feedbackResponses: '/api/responses',
    feedbackComments: '/api/comments'
}
