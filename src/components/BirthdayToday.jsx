
import React from 'react';

const BirthdayToday = ({ birthdays }) => {
  const today = new Date();
  const todayDayMonth = `${today.getMonth() + 1}-${today.getDate()}`;

  const todayBirthdays = birthdays.filter((birthday) => {
    const birthdate = new Date(birthday.date);
    const birthdateDayMonth = `${birthdate.getMonth() + 1}-${birthdate.getDate()}`;
    return todayDayMonth === birthdateDayMonth;
  });

  return (
    <div className="birthday-today">
      {todayBirthdays.length > 0 ? (
        <>
          <p>
            {todayBirthdays.length === 1
              ? `Hoy es el cumpleaños de: `
              : 'Hoy es el cumpleaños de:'}
          </p>
          <ul>
            {todayBirthdays.map((birthday) => (
              <li key={birthday.id}>{birthday.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Hoy no hay ningún cumpleaños de tus amigos.</p>
      )}
    </div>
  );
};

export default BirthdayToday;
