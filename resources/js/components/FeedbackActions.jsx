import React, { useState } from 'react';
import withStyles from 'react-jss';
import { Modal } from 'react-bootstrap';
import Card from './Card';

const styles = {
    actionButton: {
        borderRadius: '50px',
        padding: '.5em',
        color: 'white',
        display: 'block',
        width: '100%',
        cursor: 'pointer',
        // fontSize: '.85vw',
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

function FeedbackActions({ classes, feedback }) {
    const [modalShow, setModalShow] = useState(false);
    const [message, setMessage] = useState();
    
    const updateFeedbackStatus = (statusId) => {
        
    }

    return (
        <React.Fragment>
            {
                feedback.status.id === APPROVE_STATUS_ID
                    ? (
                        <div className="row justify-content-center">
                            <div className="col-xs-6 col-xl-5 mb-2 mb-xl-0">
                                <button
                                    className={`btn ${classes.actionButton} ${classes.acceptActionButton}`}
                                    onClick={() => setModalShow(true)}
                                >
                                    Принять
                                </button>
                            </div>
                            <div className="col-xs-6 col-xl-5">
                                <button
                                    className={`btn ${classes.actionButton} ${classes.denyActionButton}`}
                                    onClick={() => setModalShow(true)}
                                >
                                    Отклонить
                                </button>
                            </div>
                        </div>
                    )
                    : null
            }
            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Card title="Сообщение отправителю" noMargin>
                    <div>
                        <textarea 
                            className="form-control mb-3" 
                            rows={4} 
                            placeholder="Сообщение" 
                            value={message} 
                            onChange={({target}) => setMessage(target.value)}
                        />
                        <div className="row justify-content-end">
                            <div className="col-7">
                                <div className="row">
                                    <div className="col-6 mb-2 mb-xl-0">
                                        <button
                                            className={`btn btn-primary ${classes.actionButton}`}
                                            onClick={() => setModalShow(false)}
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button
                                            className={`btn ${classes.actionButton} ${classes.acceptActionButton}`}
                                            onClick={() => updateFeedbackStatus(ACCEPT_STATUS_ID)}
                                        >
                                            Принять
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