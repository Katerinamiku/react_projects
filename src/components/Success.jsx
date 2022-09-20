import React from 'react';

export const Success = ({ count, onClickBack }) => {
    return (
        <div class="success-block">
            <img src="/assets/success.svg" alt="Success" />
            <h3>Success!</h3>
            <p>Inivitation send to all of the {count} users.</p>
            <button onClick={onClickBack} className="send-invite-btn">Back</button>
        </div>
    );
};
