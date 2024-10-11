import classNames from 'classnames';
import { Header } from '@/widgets/Header/Header';
import { Footer } from '@/widgets/Footer/Footer';
import cls from './AboutUsPage.module.scss';
import Leaf from '@/shared/assets/images/leaf.png';
import RS from '@/shared/assets/images/rsschool-logo.svg';
import { Icon } from '@/shared/ui/Icon/Icon';

import { Developers } from '@/shared/const/Developers';
import {
  DeveloperCard,
  DeveloperCardProps,
} from '@/shared/ui/DeveloperCard/ui/DeveloperCard';

export const AboutUsPage = () => {
  return (
    <div className={cls.wrapper}>
      <Header />
      <main className={cls.main}>
        <div className={cls.grid}>
          <div className={cls.gridDescription}>
            <div className={cls.rs__wrapper}>
              <a href="https://rs.school/" aria-label="rs-logo">
                <Icon Svg={RS} className={cls.rs__logo} />
              </a>
              <p className={cls.rs__text}>
                A free public education program run by The Rolling Scopes
                community since 2013.
              </p>
            </div>
          </div>
          <div className={cls.gridDividerWrapper}>
            <img className={cls.divider__leaf} src={Leaf} alt="" />
            <div className={cls.divider} />
          </div>
          <div className={cls.gridInfo}>
            <h2 className={cls.title}>
              Good day my friends! We are glad that you came here!
            </h2>
            <p className={cls.mainText}>
              We are a community that has set itself the goal of making
              available items that are environmentally friendly to produce and
              dispose of.
            </p>
            <p className={cls.mainText}>
              While traveling abroad we became increasingly aware of the adverse
              effects of hyper consumerism on the natural environment —
              landscapes seemingly transformed into seas of plastic. Wanting to
              make an impactful change in the way we consume, we imagined a
              marketplace that championed responsible consumerism by only
              offering sustainable goods. In 2024{' '}
              <span className={cls.highlight__green}>Prakriti</span> opened its
              virtual doors with just a several dozen products to offer
              sustainable choices for every type of consumer, making sustainable
              shopping approachable and easy for everyone.
            </p>
            <p className={cls.mainText}>
              This project was created with the invaluable support of
              <span className={cls.highlight__green}> The Rolling Scopes.</span>
            </p>
            <p className={cls.additionalText}>
              We started <span className={cls.highlight__green}>Prakriti</span>{' '}
              with the ultimate goal of helping to build a more sustainable
              world by allowing consumers to vote for (and love) sustainable
              products. While this approach is an area we can comfortably grow
              into, we’re not interested in being comfortable, we’re interested
              in being better. Moving forward, we aim to increase our
              environmental and sustainability educational content, use our
              platform to lift marginalized voices, spotlight and learn from
              traditional knowledge experts, and publicly support environmental
              causes and legislation. Sustainability should not be accessible
              only to those with resources, but about making resources available
              to all.
            </p>
          </div>
        </div>
        <h2 className={classNames(cls.title, cls.center)}>Developers</h2>
        {Developers.map(
          ({
            name,
            ghName,
            position,
            gh,
            img,
            description,
            revert,
          }: DeveloperCardProps) => (
            <DeveloperCard
              key={`${name}${ghName}`}
              name={name}
              position={position}
              img={img}
              description={description}
              gh={gh}
              ghName={ghName}
              revert={revert}
            />
          ),
        )}
      </main>
      <Footer />
    </div>
  );
};
