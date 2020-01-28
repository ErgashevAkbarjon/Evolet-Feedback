
import Feedbacks from './views/employee/Feedbacks';
import Feedback from './views/employee/Feedback';
import Customers from './views/employee/customers/Customers';
import Employees from './views/employee/employees/Employees';
import FeedbackGroups from './views/employee/groups/FeedbackGroups';
import Settings from './views/employee/Settings';

import NewFeedback from './views/customer/NewFeedback';
import CustomerFeedbacks from './views/customer/Feedbacks';
import CustomerFeedback from './views/customer/Feedback';
import PromoCompanies from './views/employee/pc/PromoCompanies';

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
        path: '/customers/:id',
        component: Customers
    },
    {
        path: '/customers',
        component: Customers
    },
    {
        path: '/employees/:id',
        component: Employees
    },
    {
        path: '/employees',
        component: Employees
    },
    {
        path: '/groups',
        component: FeedbackGroups
    },
    {
        path: '/pc',
        component: PromoCompanies
    },
    {
        path: '/settings',
        component: Settings
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
    pc: '/api/pc',
    employees: '/api/employees',
    roles: '/api/roles'
}
