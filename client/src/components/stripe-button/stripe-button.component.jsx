import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_HktAjWcuxSGzm0qBlil429L000Ce53Aw5m';

    const onToken = token =>{
       axios({
           url:'payment',
           method: 'post',
           data: {
            amount: priceForStripe,
            token
           }
       })
       .then(response => {
        alert('Your Payment is Successful');
       })
       .catch(error => {
           console.log('Something happened with the Payment', JSON.parse(error));
           alert("Something happened to your payment, please use the credit card provided");
       })
        
    }

    return(
        <StripeCheckout
            label='Pay Now'
            name='Crown Clothing'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your Total Price is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );

};

export default StripeCheckoutButton;