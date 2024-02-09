import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearCart } from './storeSlice';
import { useNavigate } from 'react-router-dom';
import './invoice.css';


//Component for displaying an invoice
const Invoice = ({ dispatch, cart } ) => {
    const navigate = useNavigate();
    
    

    

        const [invoiceState, setInvoiceState] = useState({
            products: cart,
            
          });

    
          useEffect(() => {
            setInvoiceState((prevState) => ({
              ...prevState,
              products: cart,
              
            }));
        }, [cart]);

        //Function for adding up the price of all items in the cart
        const calculateTotal = () => {
            const total = cart.reduce((acc, item) => acc + Number(item.price), 0);
            // Round to two decimal places
            return total.toFixed(2);
          };

        //When user leaves, it emptys the cart and brings them back to the main page
        const handleGoBack = () => {
        
        dispatch(clearCart());
        // Navigate back to the main page
        navigate('/');
        };
      //Displays all items from cart and the total in a table
        return (
          <div className="Invoice">
            <h2 id='invoiceHeading'>Invoice</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody id='products'>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p id='total'>Total: ${calculateTotal()}</p>
            <button onClick={handleGoBack} id='backButton'>Go Back</button>
          </div>
        );
      };

      //maps the cart to items to be passed as a prop to the invoice
      const mapStateToProps = (state) => ({
        cart: state.cart.items || [], // Adjust this based on your actual state structure
      });


      //connects invoice to the redux store
      export default connect(mapStateToProps)(Invoice);

