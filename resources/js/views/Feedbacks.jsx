import React, { useState, useEffect } from 'react';
import withStyles from 'react-jss';
import axios from 'axios';

import Table from '../components/table/Table';

const styles = {
};

const printable = {
    description: 'Отрывок описания',
    created_at: 'Дата',
    pc: 'ПК',
    customer_id: 'Отправитель',
    status: 'Статус',
}

function Feedbacks({ classes, match }) {

    const [feedbacks, setFeedbacks] = useState();

    const [filteredFeedbacksURL, setFilter] = useState('/api/feedbacks?group_id=' + match.params.id);

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
                                            Object.values(printable).map((fieldName, i) => (<th key={i}>{fieldName}</th>))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                    </tr>
                                    <tr>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                    </tr>
                                    <tr>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                    </tr>
                                    <tr>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                        <td>ssdfsdf</td>
                                    </tr>
                                </tbody>
                          </Table>)
                        : ("Загрузка...")
                }
            </div>
        </div>
    );
}

export default withStyles(styles)(Feedbacks);