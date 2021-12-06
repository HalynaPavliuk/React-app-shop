import BasketItem from "./BasketItem";

function BasketList(props) {
    const {order = [], 
        handleBasketShow = Function.prototype, 
        deleteFromBasket = Function.prototype, 
        incCounter = Function.prototype, 
        decCounter = Function.prototype} = props;

    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.count
    }, 0)



    return       <ul className="collection basket-list">
                    <li className="collection-item active">Basket</li>

                        {order.length ? order.map(item => (<BasketItem key={item.id} deleteFromBasket={deleteFromBasket} incCounter={incCounter} decCounter={decCounter} {...item}  />)) : <li className="collection-item">Basket is empty</li>}

                    <li className="collection-item active">Total cost: {totalPrice} $ <a class="waves-effect waves-light btn-small order-btn" >Order</a></li>
                    <i class="material-icons basket-close" onClick={handleBasketShow}>highlight_off</i>
                </ul>
}

export default BasketList;