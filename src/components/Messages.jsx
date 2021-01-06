import React from 'react';
import PropTypes from 'prop-types';

export default function Messages({ messages, allDonation }) {
  return (
    <>
      <h2>Messages</h2>
      <h4>Your Total Donations: <span>{ allDonation || 0 }</span> </h4>
      {messages.map((message, i) =>
        // TODO: format as cards, add timestamp
        <p key={i} className={message.premium ? 'is-premium' : ''}>
          <strong>{message.sender}</strong>:<br/>
          {message.text}
        </p>
      )}
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array
};
