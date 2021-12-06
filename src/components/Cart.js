function Cart (props) {
    const {count = 0, handleBasketShow = Function.prototype} = props;

    return <div className="cart purple darken-4 white-text" onClick={handleBasketShow}>
        <i class="material-icons">local_grocery_store</i> 
        {count > 0 ? <span className="cart-count">{count}</span> : null}
    </div>
}
export default Cart;