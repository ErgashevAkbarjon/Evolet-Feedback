import React, { useState, useEffect } from 'react'
import withStyles from 'react-jss';
import axios from 'axios';

import Card from '../components/Card';
import { isObject, isArray } from 'util';

const styles = {
    info: {
        color: '#707070'
    },
    file: {
        width: '100%',
        borderRadius: '5px'
    },
    commentInput: {
        borderColor: '#707070',
    },
    commentInputWrapper: {
        textAlign: 'end',
    },
    commentButton: {
        borderRadius: '50px',
        padding: '.5em 1.8em',
    },
    commentAuthorAvatar: {
        borderRadius: '50px',
        width: '60%',
    },
    commentsHead: {
        color: '#707070',
        fontWeight: '400'
    },
    commentReply: {
        border: 'none',
        background: 'transparent',
        padding: 'unset',
        color: '#707070',
    },
}

function Feedback({ classes, match }) {

    const [feedback, setFeedback] = useState();
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState();

    const feedbackId = match.params.id;

    useEffect(() => {
        axios
            .get('/api/feedbacks/' + feedbackId)
            .then(({ data }) => setFeedback(data))
            .catch((e) => console.log(e));

        getComments();
    }, [])

    const getComments = () => {
        axios
            .get('/api/comments?feedback_id=' + feedbackId)
            .then(({ data }) => setComments(data))
            .catch((e) => console.log(e));
    };

    const printComment = (comment) => {
        const { id, body, children, employee } = comment;
        return (
            <div className="row mb-3" key={id}>
                <div className="col-1 pr-0 text-center">
                    <img src={comment.employee.avatar} alt={employee.user.full_name} title={employee.user.full_name} className={classes.commentAuthorAvatar} />
                </div>
                <div className="col pr-0 pl-0">
                    <p className='mb-1'>{body}</p>
                    <button className={'mb-3 ' + classes.commentReply}>Ответить</button>
                    //TODO Refactor children position
                    {
                        isArray(children) && children.length > 0
                            ? children.map(child => printComment(child))
                            : null
                    }
                </div>
            </div>
        )
    }

    const addComment = (parentId = null, commentBody = newComment) => {

        const comment = {
            body: commentBody,
            employee_id: 1,
            feedback_id: feedback.id
        };

        axios
            .post('/api/comments', comment)
            .then(() => {
                setNewComment('');
                getComments();
            })
            .catch((e) => console.log(e));
    }

    return feedback
        ? (
            <div className='row'>
                <div className="col-8">
                    <Card title='Описание'>
                        {feedback.description}
                    </Card>
                    <Card title='Файлы' className='mt-5'>
                        <div className="row">
                            {
                                feedback.files.map((file, i) => (
                                    <div className="col-3" key={i}>
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <img src={file.url} alt={file.name} className={classes.file} />
                                            </div>
                                            <div className="col pl-0">
                                                {file.name}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </Card>
                    <div className={classes.commentInputWrapper}>
                        <textarea
                            className={'form-control ' + classes.commentInput}
                            rows="4"
                            placeholder='Напишите коментарий...'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            type="button"
                            className={'btn btn-primary mt-3 ' + classes.commentButton}
                            onClick={() => newComment ? addComment() : null}
                        >
                            Отправить
                        </button>
                    </div>
                    <div>
                        <h3 className={'mb-4 ' + classes.commentsHead}>Обсуждение</h3>
                        {
                            comments && isArray(comments)
                                ? comments.map(comment => printComment(comment))
                                : null
                        }

                    </div>
                </div>
                <div className="col-4 pr-5">
                    <Card title='Информация'>
                        <div className={classes.info}>
                            <p>{'ФИО: ' + feedback.customer.user.full_name}</p>
                            <p>{'ПК: ' + feedback.customer.pc.name}</p>
                            <p>{'Дата: ' + feedback.created_at}</p>
                            <p style={{ color: feedback.status.color }}>{'Статус: ' + feedback.status.name}</p>
                        </div>
                    </Card>
                </div>
            </div>
        )
        :
        ('Загрузка...');
}

export default withStyles(styles)(Feedback);
