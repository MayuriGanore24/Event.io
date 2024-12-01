import React, { useEffect, useState } from 'react';
import './NewCollection.css';
import Item from '../Items/Item';

const NewCollection = () => {
  const [newEvents, setNewEvents] = useState([]);

  useEffect(() => {
    fetch('https://eventbackend-f53q.onrender.com/upcomingevents')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setNewEvents(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="newcollections">
      <h1>Upcoming Events</h1>
      <hr />
      <div className="collections">
        {newEvents.length > 0 ? (
          newEvents.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default NewCollection;
