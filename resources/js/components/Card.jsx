import React from 'react'
import withStyles from 'react-jss';

const styles = {
    card: {
        border: '1px solid #cccccc',
        borderRadius: '5px',
        overflow: 'hidden',
        marginBottom: '2rem'
    },
    title: {
        background: '#F5F5F5',
        color: '#707070',
        padding: '.8rem 1rem',
        borderBottom: '1px solid #cccccc'
    },
    content: {
        padding: '1rem',
    }
}

function Card({ classes, title, children, className }) {
    return (
        <div className={className}>
            <div className={classes.card}>
                <div className={classes.title}>
                    {title}
                </div>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Card);