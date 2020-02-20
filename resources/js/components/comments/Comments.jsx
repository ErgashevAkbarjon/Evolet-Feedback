import React from 'react'
import withStyles from 'react-jss'
import { isArray } from 'util';

import Comment from './Comment';
import CommentInput from './CommentInput';

const styles = {
    commentsHead: {
        color: '#707070',
        fontWeight: '400'
    },
}

function Comments({ classes, comments, addCallback }) {
    return (
        <div>
            <h3 className={'mb-4 ' + classes.commentsHead}>Обсуждение</h3>
            <CommentInput addCallback={addCallback} />
            <div>
                <ul className="list-unstyled">
                    {
                        isArray(comments)
                            ? comments.map(comment => (
                                <Comment comment={comment} key={comment.id} addCallback={addCallback}/>
                            ))
                            : null
                    }
                </ul>
            </div>
        </div>
    )
}
export default withStyles(styles)(Comments);