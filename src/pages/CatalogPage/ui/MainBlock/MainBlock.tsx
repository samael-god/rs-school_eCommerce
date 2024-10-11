import classNames from 'classnames';

import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { CategoryCustom } from '@/shared/api/types/apiTypes';
import { SliderComponent } from './Slider';
import { SectionSeparator } from '@/shared/ui/SectionSeparator/SectionSeparator';
import { Card } from '@/shared/ui/Card/Card';
import BagImage from '@/shared/assets/images/bag_image.jpg';
import CaseImage from '@/shared/assets/images/case_image.jpg';
import CandleImage from '@/shared/assets/images/candle_image.jpg';
import { useCatalogFilters } from '../../hooks/useCatalogPageFilters';
import cls from './MainBlock.module.scss';

interface MainBlockProps {
  className?: string;
  categories: CategoryCustom[];
  scrollIntoSection: () => void;
}

export const MainBlock = ({
  className,
  categories,
  scrollIntoSection,
}: MainBlockProps) => {
  const { onChangeSelectedCategory } = useCatalogFilters();
  const handleOnLinkClick = (id: string) => () => {
    scrollIntoSection();
    onChangeSelectedCategory(id);
  };

  return (
    <section className={classNames(cls.MainBlock, className)}>
      <ul className={cls.list}>
        {categories.map(({ parent }) => (
          <li key={parent.id}>
            <AppLink
              to={`${parent.path}`}
              className={cls.item}
              onClick={handleOnLinkClick(parent.id)}
            >
              {parent.name}
            </AppLink>
          </li>
        ))}
      </ul>
      <div className={cls.separator} />
      <SliderComponent>
        <Card className={classNames(cls.card)} direction="row">
          <img src={BagImage} alt="" className={cls.image} />
          <div className={cls.text_wrapper}>
            <h1 className={cls.title}>Karigar</h1>
            <h1 className={cls.subtitle}>Up to 10% off Bags</h1>
            <AppLink
              to=""
              underlined
              onClick={handleOnLinkClick('')}
              className={cls.link}
            >
              Shop Now
            </AppLink>
          </div>
        </Card>
        <Card className={classNames(cls.card)} direction="row">
          <img src={CaseImage} alt="" className={cls.image} />
          <div className={cls.text_wrapper}>
            <h1 className={cls.title}>Soloma</h1>
            <h1 className={cls.subtitle}>Up to 15% off Cases</h1>
            <AppLink
              to=""
              underlined
              onClick={handleOnLinkClick('')}
              className={cls.link}
            >
              Shop Now
            </AppLink>
          </div>
        </Card>
        <Card className={classNames(cls.card)} direction="row">
          <img src={CandleImage} alt="" className={cls.image} />
          <div className={cls.text_wrapper}>
            <h1 className={cls.title}>Self Care</h1>
            <h1 className={cls.subtitle}>Up to 20% off Candles</h1>
            <AppLink
              to=""
              underlined
              onClick={handleOnLinkClick('')}
              className={cls.link}
            >
              Shop Now
            </AppLink>
          </div>
        </Card>
      </SliderComponent>
      <SectionSeparator />
    </section>
  );
};
