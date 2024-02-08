
import { Component } from 'react';
import styled from 'styled-components';

//Styles from a react libary to style components
const CartItemContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const CartItem = styled.li`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  background-color: grey;
  color: black;
`;

const Button = styled.button`
    display: block;
    margin: 0 auto;
    ;`


//Cart component, its passed the cart list, onClone and onRemoveItem as props
export default function Cart({ cart, onClose, onRemoveItem}) {
    //Displays title, checks if cart is empty, if not displays the items
    return (
      <div className='Cart'>
        <CartTitle />
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
        <Items items={cart} onRemoveItem={onRemoveItem} />
        )}
        <CloseButton onClose={onClose} />
      </div>
    );
  }


  //Title of the cart page
  function CartTitle(){
    return(
        <h2>Your Cart</h2>
    )
  }
//Button for closing the cart, when clicked the store page is shown
  function CloseButton( {onClose}) {
    return(
        <Button>
            <button  onClick={onClose}>Close Cart</button>
        </Button>
    )
  }

  //Component for showing the item list in the cart
  class Items extends Component {
     

     componentWillMount() {
        this.setState({ activities: this.props.items || [] });
     }

     componentDidUpdate(nextProps) {
        if (this.props.items !== nextProps.items) {
            this.setState({ activities: nextProps.items || [] });
     }
    }

     componentWillUnmount() {
        console.log("items Unmounted");
     }

     
     handleRemoveItem = (itemId) => {
        this.props.onRemoveItem(itemId);
      }

      render() {
        const { items } = this.props;
      
        //Displays the list with a remove item button 
        return (
            <CartItemContainer>
                <ul>
                {items.map((item) => (
                    <CartItem key={item.id}>
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Description: {item.description}</p>
                        <button onClick={() => this.handleRemoveItem(item.id)}>Remove</button>
                    </CartItem>
                    ))}
                </ul>
            </CartItemContainer>
      );
    }  
  }