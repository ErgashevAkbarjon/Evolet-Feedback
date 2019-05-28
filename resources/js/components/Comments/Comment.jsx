import React from 'react';
import withStyles from 'react-jss';
import { isArray } from 'util';

const styles = {
    commentAuthorAvatar: {
        borderRadius: '50px',
        width: '60%',
    },
    commentReply: {
        border: 'none',
        background: 'transparent',
        padding: 'unset',
        color: '#707070',
    },
}

function Comment({ classes, comment }) {
    const { id, body, children, employee } = comment;
    return (
        <li key={id}>
            <div className="row">
                <div className="col-1 pr-0 text-center">
                    <img src={comment.employee.avatar} alt={employee.user.full_name} title={employee.user.full_name} className={classes.commentAuthorAvatar} />
                </div>
                <div className="col pr-0 pl-0">
                    <p className='mb-1'>{body}</p>
                    <button className={'mb-3 ' + classes.commentReply}>Ответить</button>
                    <ul className="list-unstyled ">
                        {
                            isArray(children) && children.length > 0
                                ? children.map(child =>
                                    <Comment comment={child} key={child.id} classes={classes}/>
                                  )
                                : null
                        }
                    </ul>
                </div>
            </div>
        </li>
    )
}
export default withStyles(styles)(Comment)