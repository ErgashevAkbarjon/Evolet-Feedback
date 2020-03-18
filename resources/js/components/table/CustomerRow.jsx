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

function CustomerRow({ classes, customer, printableFields, onCustomerClick }) {
    const fields = {
        "user.full_name": customer.user.full_name,
        "pc.logo": <img style={{ width: "5.3rem" }} src={customer.pc.logo} />,
        "user.email": customer.user.email,
        bonus: customer.bonus
    };

    return (
        <tr className={classes.tableRow} onClick={() => onCustomerClick(customer)}>
            {printableFields.map(
                (fieldToPrint, i) => (<td key={i}>{fields[fieldToPrint.name]}</td>)
            )}
        </tr>
    );
}

export default withStyles(styles)(CustomerRow);
