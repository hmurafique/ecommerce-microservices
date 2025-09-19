import React, {useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';

function App(){
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(()=> {
    fetch('/api/catalog')
      .then(r=>r.json())
      .then(setProducts)
      .catch(console.error);

    fetch('/api/cart')
      .then(r=>r.json())
      .then(setCart)
      .catch(()=>setCart([]));
  },[]);

  function addToCart(id){
    fetch('/api/cart', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ productId:id }) })
      .then(()=> alert('Added'))
      .catch(console.error);
  }

  return (
    <div style={{fontFamily:'system-ui',padding:20}}>
      <h1>Simple E-Commerce Demo</h1>
      <h2>Products</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {products.map(p=>(
          <div key={p.id} style={{padding:12,border:'1px solid #ddd',borderRadius:6}}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <b>${p.price}</b>
            <div><button onClick={()=>addToCart(p.id)}>Add to cart</button></div>
          </div>
        ))}
      </div>
      <h2 style={{marginTop:30}}>Cart (preview)</h2>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
