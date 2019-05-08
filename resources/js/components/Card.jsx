import React from 'react'
import withStyles from 'react-jss';

const styles = {
    card: {
        border: '1px solid #707070',
        borderRadius: '5px',
        overflow: 'hidden',
        marginBottom: '2rem'
    },
    title: {
        background: '#F5F5F5',
        color: '#707070',
        padding: '.8rem 1rem',
        borderBottom: '1px solid #707070'
    },
    content: {
        padding: '1rem',
    }
}

function Card({ classes, title, children }) {
    return (
        <div className={classes.card}>
            <div className={classes.title}>
                {title}
            </div>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}

export default withStyles(styles)(Card);