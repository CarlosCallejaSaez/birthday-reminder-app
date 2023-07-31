
import React from 'react';

const BirthdayItem = ({ birthday, onDelete }) => {
  const { id, name, date } = birthday;

  return (
    <li className="birthday-item">
      <div className="birthday-details">
        <span className="birthday-name">{name}</span>
        <span className="birthday-date">{date}</span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(id)}>
        Eliminar
      </button>
    </li>
  );
};

export default BirthdayItem;
