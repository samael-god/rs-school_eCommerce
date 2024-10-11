import classNames from 'classnames';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import BagImage from '@/shared/assets/images/bag_image.jpg';
import Bottle from '@/shared/assets/images/bottle.svg';
import CandleImage from '@/shared/assets/images/candle_image.jpg';
import CaseImage from '@/shared/assets/images/case_image.jpg';
import Cloud from '@/shared/assets/images/cloud.svg';
import Hands from '@/shared/assets/images/hands.svg';
import Background from '@/shared/assets/images/info_background.webp';
import MainLeaf from '@/shared/assets/images/main_leaf.svg';
import { Card } from '@/shared/ui/Card/Card';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';

import cls from './MainPage.module.scss';

interface MainPageProps {
  className?: string;
}

export const MainPage = (props: MainPageProps) => {
  const { className } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={classNames(cls.MainPage, {}, [className])}>
      <div className={cls.wrapper}>
        <Header />
        <section className={cls.mainBlock}>
          <h1 className={cls.title}>Don’t Panic, it’s</h1>
          <h1 className={cls.subtitle}>Organic</h1>
          <NavLink to={Routes.CATALOG} className={cls.linkAsButton}>
            Explore More
          </NavLink>
          <Icon Svg={MainLeaf} className={cls.mainLeaf} />
        </section>
        <section className={cls.infoBlock}>
          <Card
            width={1200}
            className={cls.card}
            text="Shop guilt-free knowing that our eco-friendly e-commerce platform is committed to reducing environmental 
          impact and promoting sustainable practices in every step of the shopping process"
          />
          <img src={Background} className={cls.infoBackground} alt="" />
        </section>
        <section className={cls.addInfo}>
          <div className={cls.benefitsSection}>
            <p className={cls.question}>Why Buy from Us?</p>
            <div className={cls.ecologicalBenefits}>
              <div className={cls.oneBenefit}>
                <Card svg={Bottle} width={205} text="641,698 +" green />
                <p>Zero Plastic Products Sold</p>
              </div>
              <div className={cls.oneBenefit}>
                <Card svg={Cloud} width={205} text="42,780" green />
                <p>Tons Carbon Emission Prevented</p>
              </div>
              <div className={cls.oneBenefit}>
                <Card svg={Hands} width={205} text="50+" green />
                <p>Livelihoods Created</p>
              </div>
            </div>
          </div>
          <div className={cls.featuredProducts}>
            <p className={cls.question}>Featured Products</p>
            <div className={cls.products}>
              <div className={cls.productsWrapper}>
                <NavLink to={Routes.CATALOG}>
                  <Card
                    clickable
                    image={CaseImage}
                    alt="product_1"
                    width={210}
                    transparent
                  />
                </NavLink>
                <NavLink to={Routes.CATALOG}>
                  <Card
                    clickable
                    image={BagImage}
                    alt="product_3"
                    width={210}
                    transparent
                  />
                </NavLink>
                <NavLink to={Routes.CATALOG}>
                  <Card
                    clickable
                    image={CandleImage}
                    alt="product_2"
                    width={210}
                    transparent
                  />
                </NavLink>
              </div>
              <NavLink to={Routes.CATALOG} className={cls.linkAsButton}>
                Shop more
              </NavLink>
            </div>
          </div>
          <section className={cls.promoCodes}>
            <p className={cls.promoCodesTitle}> Active promo codes</p>
            <div className={cls.descriptionWrapper}>
              <p className={cls.promoCodesDescription}>
                <span className={cls.promoCodeName}>FIRST</span> - 10% off your
                first order
              </p>
              <p className={cls.promoCodesDescription}>
                <span className={cls.promoCodeName}>SALE</span> - promo code
                discount applies to all items
              </p>
            </div>
          </section>
          <Footer />
        </section>
      </div>
    </main>
  );
};
