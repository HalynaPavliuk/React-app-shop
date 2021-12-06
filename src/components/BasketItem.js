
function BasketItem(props){
    const {id, name, price, count, 
        deleteFromBasket = Function.prototype, 
        incCounter = Function.prototype, 
        decCounter = Function.prototype} = props;

        return <li className="collection-item">
            {name}  <span className="in-de" onClick={() => decCounter(id)}> - </span> {count} <span className="in-de" onClick={() => incCounter(id)}> + </span> = {price*count} $
            <span class="secondary-content" onClick={() => deleteFromBasket(id)}><i class="material-icons" >clear</i></span>
        </li>

}

export default BasketItem;