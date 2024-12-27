import React from 'react';
import Main from '../../../components/portfolio-components/main/Main';
import { DiscountContainer } from '../../../components/portfolio-components/discount-container/DiscountContainer';
import { PromotionsContainer } from '../../../components/portfolio-components/promotions-container/PromotionsContainer';
import { AdvantagesContainer } from '../../../components/portfolio-components/advantages-container/AdvantagesContainer';

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
