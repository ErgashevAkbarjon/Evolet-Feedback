import React, { useState, useEffect } from 'react';
import withStyles from 'react-jss';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import Card from './Card';
import { ApiRoutes } from '../routes';

const styles = {
    actionButton: {
        borderRadius: '50px',
        padding: '.5em',
        color: 'white',
        display: 'block',
        width: '100%',
        cursor: 'pointer',
        '&:hover': {
            color: 'white',
        }
    },
    acceptActionButton: {
        background: '#30D92A',
        borderColor: '#30D92A',
        '&:focus': {
            boxShadow: '0 0 0 0.2rem #30da2a4a'
        }
    },
    denyActionButton: {
        background: '#EB552F',
        borderColor: '#EB552F',
        '&:focus': {
            boxShadow: '0 0 0 0.2rem #eb542f4a'
        }
    }
}

const APPROVE_STATUS_ID = 1;
const ACCEPT_STATUS_ID = 2;
const DENY_STATUS_ID = 3;

function FeedbackActions({ classes, feedback, reloadFeedbackCallBack }) {

    const { feedbackResponses: responseRoute, feedbacks: feedbacksRoute } = ApiRoutes;

    const [modal, setModal] = useState({ show: false, status: null });
    const [message, setMessage] = useState();
    const [feedbackResponse, setFeedbackResponse] = useState();

    const getFeedbackResponse = () => {
        //FIXME Fix time zones
        axios
            .get(`${responseRoute}?feedback_id=${feedback.id}`)
            .then(({ data }) => setFeedbackResponse(data[0]))
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        getFeedbackResponse();
    }, [])

    const { id: statusId } = feedback.status;

    const hideModal = () => {
        setModal({ show: false, status: modal.status });
    };
    const getModalActionClasses = (modalStatus = null) => {

        let jssClass = classes.actionButton;

        switch (modalStatus) {
            case ACCEPT_STATUS_ID:
                jssClass += ` ${classes.acceptActionButton} `;
                break;
            case DENY_STATUS_ID:
                jssClass += ` ${classes.denyActionButton} `;
        }

        return jssClass;
    }
    const getModalActionText = (modalStatus = null) => {
        let text = 'Отмена';

        switch (modalStatus) {
            case ACCEPT_STATUS_ID:
                text = 'Принять';
                break;
            case DENY_STATUS_ID:
                text = 'Отклонить';
                break;
        }
        return text;
    }
    const updateFeedbackStatus = (statusId) => {

        const newStatus = { status_id: statusId };
        const newResponse = {
            body: message,
            employee_id: 1, //TODO Make employee_id dymanic
            feedback_id: feedback.id
        };

        axios
            .put( `${feedbacksRoute}/${feedback.id}`, newStatus)
            .then(() => {
                axios
                    .post(responseRoute, newResponse)
                    .then(() => {
                        //TODO Add some notificattion and loading
                        reloadFeedbackCallBack();
                        getFeedbackResponse();
                        hideModal();
                    })
            });
    }

    const feedbackStatusInfo = feedbackResponse
        ? (
            <div className={`alert ${statusId === ACCEPT_STATUS_ID ? 'alert-success' : 'alert-danger'} `} role="alert">
                {
                    'Статус фидбека был изменен сотрудником: '
                }
                <b>{feedbackResponse.employee.user.full_name}</b>
                {
                    ' в '
                }
                <b>{feedbackResponse.updated_at}</b> 
            </div>
        )
        : null;

    return (
        <React.Fragment>
            {
                statusId === APPROVE_STATUS_ID
                    ? (
                        <div className="row justify-content-center">
                            <div className="col-xs-6 col-xl-5 mb-2 mb-xl-0">
                                <button
                                    className={`btn ${getModalActionClasses(ACCEPT_STATUS_ID)}`}
                                    onClick={() => setModal({ show: true, status: ACCEPT_STATUS_ID })}
                                >
                                    {getModalActionText(ACCEPT_STATUS_ID)}
                                </button>
                            </div>
                            <div className="col-xs-6 col-xl-5">
                                <button
                                    className={`btn ${getModalActionClasses(DENY_STATUS_ID)}`}
                                    onClick={() => setModal({ show: true, status: DENY_STATUS_ID })}
                                >
                                    {getModalActionText(DENY_STATUS_ID)}
                                </button>
                            </div>
                        </div>
                    )
                    : feedbackResponse
                        ? feedbackStatusInfo
                        : null
            }
            <Modal show={modal.show} onHide={() => hideModal()} centered>
                <Card title="Сообщение отправителю" noMargin>
                    <div>
                        <textarea
                            className="form-control mb-3"
                            rows={4}
                            placeholder="Сообщение"
                            value={message}
                            onChange={({ target }) => setMessage(target.value)}
                        />
                        <div className="row justify-content-end">
                            <div className="col-7">
                                <div className="row">
                                    <div className="col-6 mb-2 mb-xl-0">
                                        <button
                                            className={`btn btn-primary ${getModalActionClasses()}`}
                                            onClick={() => hideModal()}
                                        >
                                            {getModalActionText()}
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button
                                            className={`btn ${classes.actionButton} ${getModalActionClasses(modal.status)}`}
                                            onClick={() => message.length > 3 ? updateFeedbackStatus(modal.status) : null}
                                        >
                                            {getModalActionText(modal.status)}

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </Modal>
        </React.Fragment>
    )
}
export default withStyles(styles)(FeedbackActions);