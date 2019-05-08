import React from 'react';
import PropTypes from 'prop-types'
import withStyles from 'react-jss'

const styles = {
    tableRow: {
        cursor: 'pointer',
        '&:hover': {
            background: '#f5f5f5'
        },
    },
    description: {
        color: '#3C95D1',
        width: '35em',
    },
    created_at: {
        width: '15em',
        paddingRight: '8rem !important',
    },
    logo: {
        maxWidth: '8em',
    },
    statusWrapper: {
        textAlign: 'center !important',
        paddingRight: '5rem !important',
    },
    status: {
        background: '#4599f3',
        color: 'white',
        padding: '.6rem',
        borderRadius: '50px'
    },
}


function FeedbackRow({ classes, feedback, printableFields }) {
    const shoudPrint = (field) => printableFields.includes(field);

    return (
        <tr className={classes.tableRow}>
            {
                shoudPrint("description")
                    ? (
                        <td className={classes.description}>
                            {
                                feedback.description.length > 60
                                    ? feedback.description.slice(0, 60) + '...'
                                    : feedback.description
                            }
                        </td>
                    )
                    : null
            }
            {
                shoudPrint("created_at")
                    ? (<td className={classes.created_at}>{feedback.created_at}</td>)
                    : null
            }
            {
                shoudPrint("customer.pc")
                    ? (
                        <td>
                            <img src={feedback.customer.pc.logo} alt={feedback.customer.pc.name} className={classes.logo} />
                        </td>
                    )
                    : null
            }
            {
                shoudPrint("customer.user.full_name")
                    ? (<td>{feedback.customer.user.full_name}</td>)
                    : null
            }
            {
                shoudPrint("status.name")
                    ? (
                        <td className={classes.statusWrapper}>
                            <div className={classes.status} style={{background: feedback.status.color}}>
                                {feedback.status.name}
                            </div>
                        </td>
                    )
                    : null
            }
        </tr>
    )
}

FeedbackRow.propTypes = {
    feedback: PropTypes.object.isRequired,
}

export default withStyles(styles)(FeedbackRow);