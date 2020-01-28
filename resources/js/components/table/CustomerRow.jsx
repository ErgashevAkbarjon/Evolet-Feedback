import React from "react";
import withStyles from 'react-jss';

const styles = {
    tableRow: {
        cursor: 'pointer',
        '&:hover': {
            background: '#f5f5f5'
        }
    }
}

function CustomerRow({ classes, customer, printable, onCustomerClick }) {
    const fields = {
        "user.full_name": customer.user.full_name,
        "pc.logo": <img style={{ width: "5.3rem" }} src={customer.pc.logo} />,
        bonus: customer.bonus
    };

    return (
        <tr className={classes.tableRow} onClick={() => onCustomerClick(customer)}>
            {Object.keys(printable).map(
                (fieldToPrint, i) => (<td key={i}>{fields[fieldToPrint]}</td> )
            )}
        </tr>
    );
}

export default withStyles(styles)(CustomerRow);
