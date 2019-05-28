import React, { useState } from 'react'
import withStyles from 'react-jss'
import { isArray } from 'util';

import Comment from './Comment';

const styles = {
    commentInput: {
        borderColor: '#707070',
    },
    commentInputWrapper: {
        textAlign: 'end',
    },
    commentButton: {
        borderRadius: '50px',
        padding: '.5em 1.8em',
    },
    commentsHead: {
        color: '#707070',
        fontWeight: '400'
    },
}

function Comments({ classes, comments, addCallback }) {
    const [newComment, setNewComment] = useState();

    const addComment = () => {
        if(newComment.lenght < 2) return;

        addCallback(newComment);
        setNewComment('');
    }

    return (
        <React.Fragment>
            <div className={classes.commentInputWrapper}>
                <textarea
                    className={'form-control ' + classes.commentInput}
                    rows="4"
                    placeholder='Напишите коментарий...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    type="button"
                    className={'btn btn-primary mt-3 ' + classes.commentButton}
                    onClick={() => addComment()}
                >
                    Отправить
                </button>
            </div>
            <div>
                <h3 className={'mb-4 ' + classes.commentsHead}>Обсуждение</h3>
                <ul className="list-unstyled">
                    {
                        isArray(comments)
                            ? comments.map(comment => (
                                <Comment comment={comment} key={comment.id} />
                            ))
                            : null
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}
export default withStyles(styles)(Comments);