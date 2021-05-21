import React, {useState, useEffect} from 'react';
import './details'
import '../App.css';

export default function MainPage (){
  
  const [items, setItems] = useState([]);


  function handleLink(nav) {
      window.location.href = nav;
      console.log('The link was clicked.')
  }


  function getBooks(){
    fetch('http://localhost:4000/products')
    .then(response => response.json())
    .then(response => {
      setItems(response.data); 
      console.log(response)
       })
    .catch(err => console.error(err))
  }


  useEffect(() => { 
    getBooks()
  }, [])


  return (
    <React.Fragment>
    <div>
      {items.map((product)=>{
        return(
          <div className="wrapper">
            <div key = {product.id}>
              <div class ="product-img">
                <img src={product.image} height="420" width="327"/>
              </div>
              <div class="product-info">
                <div class="product-text">
                  <h1>{product.name}</h1>
                  <h2>{product.ratings}</h2>
                  <p></p>
                </div>
                <div class="product-price-btn">
                  <p>£<span>{product.price}</span></p>   
                  <button type="button" onClick={()=>{handleLink("/details")}}>Details</button>
                </div>
              </div>
            </div>
          </div>
      )})}
    </div>
    </React.Fragment>
  )
};