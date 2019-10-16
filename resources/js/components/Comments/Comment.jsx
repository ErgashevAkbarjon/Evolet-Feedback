import React, { useState } from 'react';
import withStyles from 'react-jss';
import { isArray } from 'util';
import CommentInput from './CommentInput';

const styles = {
    authorAvatar: {
        borderRadius: '100%',
        width: '100%',
    },
    reply: {
        border: 'none',
        background: 'transparent',
        padding: 'unset',
        color: '#707070',
        fontSize: '14px'
    },
    avatarWrapper: {
        display: 'inline-flex',
        flex: '0 0 0',
    },
    userName: {
        fontWeight: '500',
        fontSize: '14px'
    },
    time: {
        color: '#707070',
        fontWeight: '400',
        fontSize: '14px'
    }
}

function Comment({ classes, comment, addCallback }) {
    const { id, body, children, employee, humanCreateTime } = comment;

    const [replieble, setReplieble] = useState(false);

    const storeComment = (commentBody, parentId = null) => {
        setReplieble(false);
        addCallback(commentBody, parentId);
    }

    if(!employee) return ("");

    const employeeAvatar = employee.hasOwnProperty('avatar') ? employee.avatar: "";

    return (
        <li key={id}>
            <div className="row">
                <div className={"col " + classes.avatarWrapper}>
                    <div style={{ width: '50px' }}>
                        <img src={employeeAvatar} alt={employee.user.full_name} className={classes.authorAvatar} />
                    </div>
                </div>
                <div className="col pr-0 pl-0">
                    <span className={'pr-1 ' + classes.userName}>
                        {employee.user.full_name}
                    </span>
                    <span className={classes.time}>
                        {humanCreateTime}
                    </span>
                    <p className='mb-1'>{body}</p>
                    <button
                        className={'mb-3 ' + classes.reply}
                        onClick={() => setReplieble(!replieble)}
                    >
                        Ответить
                    </button>
                    <CommentInput
                        addCallback={storeComment}
                        parentCommentId={id}
                        hidden={!replieble}
                    />
                    <ul className="list-unstyled ">
                        {
                            isArray(children) && children.length > 0
                                ? children.map(child =>
                                    <Comment comment={child} key={child.id} classes={classes} addCallback={addCallback} />
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