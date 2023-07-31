
import React, { useState, useEffect } from 'react';
import BirthdayItem from './components/BirthdayItem';
import BirthdayToday from './components/BirthdayToday';
import Footer from './components/Footer';
import './App.css';
import birthdaysData from './data';

const STORAGE_KEY = 'birthday_reminder_birthdays';

function App() {
  const [birthdays, setBirthdays] = useState(() => {
    const storedBirthdays = localStorage.getItem(STORAGE_KEY);
    return storedBirthdays ? JSON.parse(storedBirthdays) : birthdaysData;
  });
  const [newBirthday, setNewBirthday] = useState({ name: '', date: '' });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(birthdays));
  }, [birthdays]);

  const handleDeleteBirthday = (id) => {
    setBirthdays((prevBirthdays) => prevBirthdays.filter((birthday) => birthday.id !== id));
  };

  const handleAddBirthday = (e) => {
    e.preventDefault();
    if (!newBirthday.name || !newBirthday.date) return;

    const newId = Math.max(...birthdays.map((b) => b.id)) + 1;
    const newBirthdayWithId = { ...newBirthday, id: newId };
    setBirthdays((prevBirthdays) => [...prevBirthdays, newBirthdayWithId]);
    setNewBirthday({ name: '', date: '' });
    sortBirthdays();
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const sortBirthdays = () => {
    setBirthdays((prevBirthdays) =>
      prevBirthdays.sort((a, b) => new Date(a.date) - new Date(b.date))
    );
  };

  return (
    <div className="container">
      <h1 className="title">Birthday Reminder</h1>
      <form className="add-birthday-form" onSubmit={handleAddBirthday}>
        <input
          type="text"
          placeholder="Nombre"
          value={newBirthday.name}
          onChange={(e) => setNewBirthday({ ...newBirthday, name: e.target.value })}
        />
        <label htmlFor="date">Fecha de nacimiento:</label>
        <input
          type="date"
          id="date"
          value={newBirthday.date}
          onChange={(e) => setNewBirthday({ ...newBirthday, date: e.target.value })}
        />
        <button type="submit" className="add-btn">
          Añadir
        </button>
      </form>
      <BirthdayToday birthdays={birthdays} />
      {birthdays.length === 0 ? (
        <p className="no-birthdays">No hay cumpleaños para mostrar</p>
      ) : (
        <ul className="birthday-list">
          {birthdays.map((birthday) => (
            <BirthdayItem
              key={birthday.id}
              birthday={{ ...birthday, date: formatDate(birthday.date) }}
              onDelete={handleDeleteBirthday}
            />
          ))}
        </ul>
      )}
      <Footer />
    </div>
  );
}

export default App;
