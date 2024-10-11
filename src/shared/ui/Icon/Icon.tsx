import classNames from 'classnames';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export const Icon = ({ className, Svg, onClick, ...otherProps }: IconProps) => (
  <Svg className={classNames(className)} onClick={onClick} {...otherProps} />
);
