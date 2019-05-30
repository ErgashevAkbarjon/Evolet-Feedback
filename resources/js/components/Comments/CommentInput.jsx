import React, { useState } from 'react'
import withStyles from 'react-jss'

const styles = {
    input: {
        borderColor: '#707070',
    },
    inputWrapper: {
        textAlign: 'end',
    },
    button: {
        borderRadius: '50px',
        padding: '.5em 1.8em',
    },
    replyButton: {
        borderRadius: '50px',
        padding: '.3em .9em',
        zIndex:'1000'
    }
}

function CommentInput({ classes, addCallback, parentCommentId, hidden }) {
    const [newComment, setNewComment] = useState();
    
    const addComment = () => {
        if (newComment.lenght < 2) return;

        if (parentCommentId) {
            addCallback(newComment, parentCommentId);
        }
        else {
            addCallback(newComment);
        }
        setNewComment('');
    }
    
    const wrapperClasses = 'row align-items-center mb-3 ' + classes.inputWrapper + (hidden ? ' d-none' : '');
    const inputClasses = parentCommentId ? 'col-10' : 'col-12 mb-3';
    const inputRows = parentCommentId ? 1 : 4;
    const buttonWrapperClasses = parentCommentId ? 'col-1 p-0 ' : 'col';
    const buttonClasses = 'btn btn-primary ' + (parentCommentId ? classes.replyButton : classes.button);
    const buttonText = parentCommentId ? 'Ответить': 'Комментировать';

    return (
        <div className={wrapperClasses}>
            <div className={inputClasses}>
                <textarea
                    className={'form-control ' + classes.input}
                    rows={inputRows}
                    placeholder='Напишите коментарий...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
            </div>
            <div className={buttonWrapperClasses}>
                <button
                    className={buttonClasses}
                    onClick={() => addComment()}
                >
                    {buttonText}
            </button>
            </div>
        </div>
    )
}
export default withStyles(styles)(CommentInput)