import React, { useState, useEffect } from 'react';
import withStyles from 'react-jss';
import axios from 'axios';

import Table from '../components/table/Table';
import FeedbackRow from '../components/FeedbackRow';

const styles = {
};

const printable = {
    description: 'Отрывок описания',
    created_at: 'Дата',
    "customer.pc": 'ПК',
    "customer.user.full_name": 'Отправитель',
    "status.name": 'Статус',
}

function Feedbacks({ classes, match }) {

    const [feedbacks, setFeedbacks] = useState();

    const filteredFeedbacksURL = '/api/feedbacks?group_id=' + match.params.id;

    useEffect(() => {
        axios
            .get(filteredFeedbacksURL)
            .then(({ data }) => setFeedbacks(data))
            .catch((e) => console.log(e));
    }, [filteredFeedbacksURL]);

    return (
        <div className='row'>
            <div className="col">
                {
                    feedbacks
                        ? (<Table>
                            <thead>
                                <tr>
                                    {
                                        Object.values(printable).map((fieldName, i) => (
                                            <th key={i}>{fieldName}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    feedbacks.map((feedback, i) => (
                                        <FeedbackRow key={i} feedback={feedback} printableFields={Object.keys(printable)}/>
                                    ))
                                }
                            </tbody>
                        </Table>)
                        : ("Загрузка...")
                }
            </div>
        </div>
    );
}

export default withStyles(styles)(Feedbacks);