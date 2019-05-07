import React from 'react';
import withStyles from 'react-jss';

const styles = {
    tableWrapper: {
        border: "1px solid #9B9B9B",
        borderRadius: "5px",
        overflow: "hidden",
        '& table': {
            marginBottom: '0px',
            color: '#707070',
        },
        '& th': {
            borderBottom: '1px solid #9B9B9B !important',
            background: '#F5F5F5',
            fontWeight: '400',
        },
        '& td': {
            border: 'none',
        }
    },
};


function Table({classes, children}) {
    return (
        <div className={classes.tableWrapper}>
            <table className="table">
                {children}
            </table>
        </div>
    )
}

export default withStyles(styles)(Table)
