import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import { withRouter } from "react-router-dom";

const styles = {
    tableRow: {
        cursor: "pointer",
        "&:hover": {
            background: "#f5f5f5"
        }
    },
    description: {
        color: "#3C95D1",
        width: "35em"
    },
    created_at: {
        width: "15em",
        paddingRight: "8rem !important"
    },
    logo: {
        width: "5em"
    },
    statusWrapper: {
        textAlign: "center !important",
        paddingRight: "5rem !important",
        width: "17em !important"
    },
    status: {
        background: "#4599f3",
        color: "white",
        padding: ".5rem",
        borderRadius: "50px"
    }
};

function FeedbackRow({ classes, feedback, printableFields, history }) {
    const shoudPrint = field => printableFields.includes(field);

    const onFeedbackClick = () => {
        history.push("/feedbacks/" + feedback.id);
    };

    const emptyValue = "Данные были удалены";

    const { description, created_at, customer, status } = feedback;

    return (
        <tr className={classes.tableRow} onClick={onFeedbackClick}>
            {shoudPrint("description") ? (
                <td className={classes.description}>
                    {description.length > 60
                        ? description.slice(0, 60) + "..."
                        : description}
                </td>
            ) : null}
            {shoudPrint("created_at") ? (
                <td className={classes.created_at}>{created_at}</td>
            ) : null}
            {shoudPrint("customer.pc") ? (
                <td>
                    {customer ? (
                        <img
                            src={customer.pc.logo}
                            alt={customer.pc.name}
                            className={classes.logo}
                        />
                    ) : emptyValue}
                </td>
            ) : null}
            {shoudPrint("customer.user.full_name") ? (
                <td>{customer ? customer.user.full_name : emptyValue}</td>
            ) : null}
            {shoudPrint("status.name") ? (
                <td className={classes.statusWrapper}>
                    {status ? (
                        <div
                            className={classes.status}
                            style={{ background: status.color }}
                        >
                            {status.name}
                        </div>
                    ) : emptyValue}
                </td>
            ) : null}
        </tr>
    );
}

FeedbackRow.propTypes = {
    feedback: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(FeedbackRow));
