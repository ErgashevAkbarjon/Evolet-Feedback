import React, { useState, useEffect } from 'react'
import withStyles from 'react-jss';
import axios from 'axios';

import Card from '../components/Card';

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

    const feedbackId = match.params.id;

    useEffect(() => {
        axios
            .get('/api/feedbacks/' + feedbackId)
            .then(({ data }) => setFeedback(data))
            .catch((e) => console.log(e));
    }, [])

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
                                    <div className="col-3">
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <img src={file.url} alt={file.name} className={classes.file}/>
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
