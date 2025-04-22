import React from 'react';

const SmsStatus = ({ stats }) => {
  const { queued = 0, sent = 0, failed = 0 } = stats || {};

  return (
    <div className="sms-status">
      <h3>SMS Status</h3>
      <ul>
        <li>Queued: {queued}</li>
        <li>Sent: {sent}</li>
        <li>Failed: {failed}</li>
      </ul>
    </div>
  );
};

export default SmsStatus;