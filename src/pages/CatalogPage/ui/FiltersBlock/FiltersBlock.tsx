import classNames from 'classnames';
import { CiSearch } from 'react-icons/ci';

import { Title } from '@/shared/ui/Title/Title';
import { Card } from '@/shared/ui/Card/Card';
import { CategoryCustom } from '@/shared/api';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Input } from '@/shared/ui/input/input';
import { useCatalogFilters } from '../../hooks/useCatalogPageFilters';
import { CatalogSortSelector } from '@/features/CatalogSortSelector';
import { FilterItem } from '@/features/Filters/ui/FilterItem';
import { SelectedItems } from '@/features/Filters';
import HomeIcon from '@/shared/assets/images/home_icon.png';
import AccessoriesIcon from '@/shared/assets/images/accessories_icon.png';
import TablewareIcon from '@/shared/assets/images/tableware_icon.png';
import PersonalCareIcon from '@/shared/assets/images/personal_care_icon.png';
import LeafIcon from '@/shared/assets/images/categories_leaf.svg';
import AllProductsIcon from '@/shared/assets/images/all_products_icon.png';
import { Routes } from '@/app/providers/RouterConfig/RouteConfig';

import cls from './FiltersBlock.module.scss';

interface CategoriesBlockProps {
  className?: string;
  categories: CategoryCustom[];
}

const CategoriesWithImage = {
  Home: HomeIcon,
  Accessories: AccessoriesIcon,
  Tableware: TablewareIcon,
  'Personal care products': PersonalCareIcon,
  All: AllProductsIcon,
};

export const FiltersBlock = ({
  className,
  categories,
}: CategoriesBlockProps) => {
  const {
    search,
    selectedBrands,
    selectedCategory,
    maxPrice,
    minPrice,
    brands,
    onChangeOrder,
    onChangeSearch,
    onChangeMaxPrice,
    onChangeMinPrice,
    onAddBrands,
    onRemoveSelectedBrands,
    onChangeSelectedCategory,
    onRemoveAllFilters,
    onRemoveSelectedPrice,
  } = useCatalogFilters();

  const onHandleChangeCategory = (id: string) => () => {
    onChangeSelectedCategory(id);
  };

  return (
    <section className={classNames(cls.FiltersBlock, className)}>
      <Title
        subtitle="All products"
        title="Explore Our Products"
        className={cls.title}
      />
      <Icon Svg={LeafIcon} className={cls.leftLeaf} />
      <div className={cls.wrapper}>
        <AppLink
          onClick={onHandleChangeCategory('')}
          to={Routes.CATALOG}
          className={classNames(cls.link, cls.allProducts)}
        >
          <Card
            clickable
            transparent
            className={cls.card}
            text="All Categories"
            image={CategoriesWithImage.All}
          />
        </AppLink>
        {categories.map(({ parent, items }) => {
          return (
            <div key={parent.id} className={cls.category}>
              <AppLink
                onClick={onHandleChangeCategory(parent.id)}
                to={`${parent.path}`}
                className={cls.link}
              >
                <Card
                  clickable
                  transparent
                  className={classNames(cls.card, {
                    [cls.selected]: selectedCategory === parent.id,
                  })}
                  text={parent.name}
                  image={CategoriesWithImage[parent.name]}
                />
              </AppLink>
              <div className={cls.sub_wrapper}>
                {items.map((item) => {
                  return (
                    <AppLink
                      onClick={onHandleChangeCategory(item.id)}
                      to={`${parent.path}/${item.path}`}
                      key={item.id}
                      className={cls.link}
                    >
                      <Card
                        clickable
                        transparent
                        className={classNames(cls.card, cls.subcategory, {
                          [cls.selected]: selectedCategory === item.id,
                        })}
                        text={item.name}
                      />
                    </AppLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Icon Svg={LeafIcon} className={cls.rightLeaf} />
      <Input
        value={search}
        onChange={onChangeSearch}
        className={cls.input}
        placeholder="Поиск"
        icon={<CiSearch className={cls.icon} />}
      />
      <div className={cls.filtersWrap}>
        <FilterItem
          brands={brands}
          selectedBrands={selectedBrands}
          onAddBrands={onAddBrands}
          onRemoveSelectedBrands={onRemoveSelectedBrands}
          title="Brand"
        />
        <FilterItem
          maxPrice={maxPrice}
          minPrice={minPrice}
          onChangeMaxPrice={onChangeMaxPrice}
          onChangeMinPrice={onChangeMinPrice}
          title="Price"
          range
        />
      </div>
      <SelectedItems
        attributes={selectedBrands}
        onRemoveSelectedFilter={onRemoveSelectedBrands}
        onRemoveAllFilters={onRemoveAllFilters}
        onRemoveSelectedPrice={onRemoveSelectedPrice}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      <CatalogSortSelector onChangeOrder={onChangeOrder} />
    </section>
  );
};
