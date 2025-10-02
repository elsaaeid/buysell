import React from 'react';
import Main from '../../../components/main-components/main/Main';
import { DiscountContainer } from '../../../components/main-components/discount-container/DiscountContainer';
import { PromotionsContainer } from '../../../components/main-components/promotions-container/PromotionsContainer';
import { AdvantagesContainer } from '../../../components/main-components/advantages-container/AdvantagesContainer';

 const Home = () => {
  return (
    <section className='flex flex-col items-center justify-center'>
        <Main />
        <DiscountContainer />
        <PromotionsContainer />
        <AdvantagesContainer />
    </section>
  )
}
export default Home
