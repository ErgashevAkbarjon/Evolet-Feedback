import React, { useState, useEffect, useContext } from 'react'
import withStyles from 'react-jss';
import axios from 'axios';

import AuthContext from '../../components/AuthContext';
import Card from '../../components/Card';
import Comments from '../../components/Comments/Comments';
import FeedbackActions from '../../components/FeedbackActions';
import Loading from '../../components/Loading';

const styles = {
    info: {
        color: '#707070'
    },
    file: {
        width: '100%',
        borderRadius: '5px'
    },
}

function Feedback({ classes, match }) {

    const [feedback, setFeedback] = useState();
    const [comments, setComments] = useState();

    const authBearer = useContext(AuthContext);

    const jwtPayload = parseJwt(authBearer.auth); //FIXME It shoud execute once not on every re-rendering
    
    const user = jwtPayload.sub[0];
    
    const feedbackId = match.params.id;

    const getFeedback = () => {
        axios
            .get('/api/feedbacks/' + feedbackId)
            .then(({ data }) => setFeedback(data))
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        getFeedback();
        getComments();
    }, [])

    const getComments = () => {
        axios
            .get('/api/comments?feedback_id=' + feedbackId)
            .then(({ data }) => setComments(data))
            .catch((e) => console.log(e));
    };

    const addComment = (commentBody, parentId = null) => {
        const newComment = {
            body: commentBody,
            author_id: user.id,
            feedback_id: feedback.id,
        };

        if (parentId)
            newComment['parent_id'] = parentId;

        axios
            .post('/api/comments', newComment)
            .then(() => {
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
                    <Card title='Файлы'>
                        <div className="row">
                            {
                                feedback.files.length > 0
                                    ? feedback.files.map((file, i) => (
                                        <div className="col-xs-4 col-lg-3" key={i}>
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
                                    : (<div className="col text-center" style={{ color: '#707070a8' }}>Файлов нет</div>)
                            }

                        </div>
                    </Card>
                    <Comments comments={comments} addCallback={addComment} />
                </div>
                <div className="col-4 pr-5">
                    <Card title='Информация'>
                        <div className={classes.info}>
                            <p>{'Отправитель: ' + feedback.customer.user.full_name}</p>
                            <p>{'ПК: ' + feedback.customer.pc.name}</p>
                            <p>{'Дата: ' + feedback.created_at}</p>
                            <p style={{ color: feedback.status.color }}>{'Статус: ' + feedback.status.name}</p>
                        </div>
                    </Card>
                    <FeedbackActions feedback={feedback} reloadFeedbackCallBack={getFeedback} />
                </div>
            </div>
        )
        :
        (<Loading />);
}

export default withStyles(styles)(Feedback);
