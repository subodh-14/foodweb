import { useState, useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {

  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(0);
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    fetch("http://localhost:3030/dish")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setDishes(data);
      })
      .catch(err => {
        console.log(err);
      })
  })

  const Decrement = () => setItem(item - 1);
  const Increment = () => setItem(item + 1);

  const placeOrder = () => {
    const c = (dishes[0].price + dishes[1].price) * item;
    setTotal(c);
  }


  return (
    <div className="App">
      <div className="bg-dark text-white p-4">
        {dishes.map((dish, index) => (
          <ul>
            <h1>{dish.name}</h1>
            <br />
            <h2>price:{dish.price}</h2>
            <input type="button" className="mx-1" onClick={Decrement} value="-"></input>
            <span>{item}</span>
            <input type="button" className="mx-1" onClick={Increment} value="+"></input>
          </ul>

        ))}

      </div>
      <div className="bg-dark p-2">
        <input type="button" className="btn btn-secondary " onClick={placeOrder} value="Place Order"></input>
      </div>
      <div className="bg-secondary p-5 border border-success">
        <h3>Total:{total}</h3>
        <h3>GST:{(total * 18) / 1000}</h3>
        <h3>Tip:{total * 10 / 100}</h3>
        <h3 className="">Net Total:{total + ((total * 18) / 1000) + (total * 10 / 100)}</h3>
      </div>
    </div>
  );
}

export default App;
