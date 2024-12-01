import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Items/Item';

const Popular = () => {
  const [popularEvents, setPopularEvents] = useState([]);
  const baseUrl = 'https://eventbackend-f53q.onrender.com'; // Base URL

  useEffect(() => {
    fetch(`${baseUrl}/popularinSports`)
      .then((response) => response.json())
      .then((data) => setPopularEvents(data))
      .catch((error) => console.error('Error fetching popular events:', error));
  }, []);

  return (
    <div className="popular">
      <h1>Popular Sports Events</h1>
      <hr />
      <div className="popular-item">
        {popularEvents.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
