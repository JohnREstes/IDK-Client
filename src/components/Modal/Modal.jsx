import React from 'react';
import Backdrop from './Backdrop'

const modal = props => {
    return (
        <>
        <div
            className="Modal"
            style={{
                transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity : props.show ? 1 : 0
            }}
        >
            {props.children}
        </div>
        <Backdrop show={props.show}  clicked={props.modalClosed}/>
        </>
    );
};

export default modal;