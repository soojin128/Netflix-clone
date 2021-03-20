import React, { useEffect, useState } from 'react';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import '../styles/Plan.css';
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

function Plan() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection('customers')
    .doc(user.uid)
    .collection('subscriptions')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start: subscription.data().current_period_start.seconds,
        });
      });
    });
  },[user.uid]);

  useEffect(() => {
    db.collection('products')
    .where('active', '==', true)
    .get()
    .then(querySnapshot => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await productDoc.ref.collection('prices').get();
        priceSnap.docs.forEach(price => {
          products[productDoc.id].prices ={
            priceId: price.id,
            priceData: price.data()
          }
        })
      });
      setProducts(products);
    });
  },[]);
  ;

  const loadCheckout = async (priceId) => {
    const docRef = await db
    .collection('customers')
    .doc(user.uid)
    .collection('checkout_sessions')
    .add({
      price:priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    docRef.onSnapshot(async(snap) => {
      const {error, sessionId} = snap.data();

      if(error){
        alert(`오류가 발생했습니다: ${error.message}`);
      }

      if(sessionId){
        const stripe = await loadStripe('pk_test_51IVxlCB7zRNpSfcmMvyx19GvAodv4EWk5yTvjQocL3NiTT69C11N3Kv4Y4VptAQOjGFecE0G5wyZ1kGzsMxYkuE800APCHymCO');
        stripe.redirectToCheckout({sessionId});
      }
    })
  };

  return (
    <div className="planScreen">
      <br />
      {subscription && (
      <p>
        갱신 날짜: {''} 
        {new Date(
        subscription?.current_period_end * 1000
        ).toLocaleDateString()}
      </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
        ?.includes(subscription?.role);
        return(
          <div
          key={productId}
          className={`${isCurrentPackage && "planScreen__plan--disabled"} planScreen__plan`}>
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => 
              !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                {isCurrentPackage ? '구독중' : '구독하기'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Plan
