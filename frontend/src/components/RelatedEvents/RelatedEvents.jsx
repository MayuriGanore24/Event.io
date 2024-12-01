import React from 'react'
import "./RelatedEvents.css"
import data_product from '../../assets/Assets/Frontend_Assets/data'
import Item from "../Items/Item"
const RelatedEvents = () => {
  return (
    <div className='relatedevents'>
        <h1>Explore More Related Events...</h1>
        <hr />
        <div className="relatedevents-item">
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
      
    </div>
  )
}

export default RelatedEvents
