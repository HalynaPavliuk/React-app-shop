import { useState, useEffect} from "react";
import {API_KEY, API_URL} from "../config"
import Alert from "./Alert";
import BasketList from "./BasketList";
import Cart from "./Cart";
import GoodsList from "./GoodsList";
import Preloader from "./Preloader";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [basketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBasket = (item) => {
        const ItemIndex = order.findIndex(orderItem => orderItem.id === item.id);
        
        if(ItemIndex < 0) {
            const newItem = {
                ...item,
                count: 1,
            }
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if(ItemIndex === index) {
                    return {
                        ...orderItem,
                        count: orderItem.count + 1
                    }
                } else {
                    return orderItem
                }
            })
            setOrder(newOrder);
        }
        setAlertName(item.name);
    }

    const deleteFromBasket = (itemId) => {

        const newOrder = order.filter(el => el.id !== itemId)
        setOrder(newOrder)

    }

    const totalCount = order.reduce((sum, el) => {
        return sum + el.count;
    }, 0)

    const incCounter = (itemId) => {
         const newOrder = order.map(el => {
             if(el.id === itemId) {
                 const newCount = el.count + 1;
                return {
                    ...el,
                    count: newCount
                }
             } else {
                 return el;
             }
         })
         setOrder(newOrder)
    }

    const decCounter = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newCount = el.count - 1;
               return {
                   ...el,
                   count: newCount >= 0 ? newCount : 0
               }
            } else {
                return el;
            }
        })
        setOrder(newOrder)
    }

    const closeAlert = () => {
        setAlertName('')
    }


    const handleBasketShow = () => {
        setBasketShow(!basketShow)
    }

    useEffect(function GetGoods() {
        
        fetch(API_URL, {
            headers: {
                'Authorization' : API_KEY,
            }})
         .then(res => res.json())
         .then(data => {
             data.featured && setGoods(data.featured); 
             setLoading(false);})
        
    }, [])


    return (
      <main className="container">
          <Cart count={totalCount} handleBasketShow={handleBasketShow} />
         {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket} />}
         {basketShow && <BasketList order={order} handleBasketShow={handleBasketShow} deleteFromBasket={deleteFromBasket} incCounter={incCounter} decCounter={decCounter} />}
         {alertName && <Alert name={alertName} closeAlert={closeAlert} /> }
      </main>
    );
  }
  
  export default Shop