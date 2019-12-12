import React from "react";

function CustomerRow({ customer, printable }) {
    
    const fields = {
        "user.full_name": customer.user.full_name,
        "pc.logo": <img style={{ width: "5em" }} src={customer.pc.logo} />,
        bonus: customer.bonus
    };

    return (
        <tr>
            {Object.keys(printable).map(
                (fieldToPrint, i) => (<td key={i}>{fields[fieldToPrint]}</td> )
            )}
        </tr>
    );
}

export default CustomerRow;
