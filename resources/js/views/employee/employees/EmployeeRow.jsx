import React from "react";
import withStyles from "react-jss";

const styles = {
    tableRow: {
        cursor: "pointer",
        "&:hover": {
            background: "#f5f5f5"
        }
    },
    avatar: {
        height: "3.3rem!important",
        width: "3.3rem!important",
        objectFit: 'cover'
    }
};

function EmployeeRow({ classes, employee, printables, onClick }) {
    const fields = {
        avatar: (
            <img
                className={classes.avatar + " rounded-circle"}
                src={employee.avatar}
            />
        ),
        "user.full_name": employee.user.full_name,
        "user.email": employee.user.email
    };

    return (
        <tr className={classes.tableRow} onClick={() => onClick(employee)}>
            {Object.keys(printables).map((field, i) => (
                <td key={i}>{fields[field]}</td>
            ))}
        </tr>
    );
}

export default withStyles(styles)(EmployeeRow);
