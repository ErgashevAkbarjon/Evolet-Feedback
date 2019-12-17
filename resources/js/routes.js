
import Feedbacks from './views/employee/Feedbacks';
import Feedback from './views/employee/Feedback';
import Customers from './views/employee/customers/Customers';

import NewFeedback from './views/customer/NewFeedback';
import CustomerFeedbacks from './views/customer/Feedbacks';
import CustomerFeedback from './views/customer/Feedback';

export const EmployeeRoutes = [
    {
        path: '/feedbacks/group/:id',
        component: Feedbacks
    },
    {
        path: '/feedbacks/:id',
        component: Feedback
    },
    {
        path: '/customers',
        component: Customers
    }
]

export const CustomerRoutes = [
    {
        path: '/',
        component: NewFeedback,
        exact: true
    },
    {
        path: '/customer/feedbacks',
        component: CustomerFeedbacks,
        exact: true
    },
    {
        path: '/customer/feedbacks/:id',
        component: CustomerFeedback
    }
]

export const ApiRoutes = {
    feedbackGroups: '/api/groups',
    feedbacks: '/api/feedbacks',
    feedbackResponses: '/api/responses',
    feedbackComments: '/api/comments',
    customers: '/api/customers',
    pc: '/api/pc'
}
