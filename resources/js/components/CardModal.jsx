import React from 'react'

import Card from './Card';
import { Modal } from 'react-bootstrap';

function CardModal( props ) {
    const {show, onHide, children} = props;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Card noMargin {...props}>
                {children}
            </Card>
        </Modal>
    )
}

export default CardModal;