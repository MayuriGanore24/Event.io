import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrums/Breadcrum';
import { BookEventContext } from '../context/BookEventContext';
import EventDisplay from '../components/EventDisplay/EventDisplay';
import DesccriptionBox from '../components/DesccriptionBox/DesccriptionBox';
import RelatedEvents from '../components/RelatedEvents/RelatedEvents';

const Events = () => {
  const {all_events}=useContext(BookEventContext);
  const {eventId}=useParams();
  const event=all_events.find((e)=>e.id===Number(eventId));
  console.log("Event iD:",Event.id)
  return (
    <div>
      <Breadcrum event={event}/>
      <EventDisplay event={event}/>
      <DesccriptionBox />
      <RelatedEvents/>
    </div>
  )
}

export default Events
