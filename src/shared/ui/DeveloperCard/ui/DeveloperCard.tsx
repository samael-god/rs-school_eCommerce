import classnames from 'classnames';
import cls from './DeveloperCard.module.scss';

export interface DeveloperCardProps {
  name: string;
  position: string;
  img: string;
  description: string[];
  gh: string;
  ghName: string;
  revert?: boolean;
}
export const DeveloperCard = (props: DeveloperCardProps) => {
  const { name, position, img, description, revert, gh, ghName } = props;
  return (
    <div className={classnames(cls.developerCard, revert && cls.revert)}>
      <figure className={classnames(cls.img__wrapper)}>
        <img src={img} alt="" className={cls.img} />
      </figure>
      <div className={cls.text__wrapper}>
        <h2 className={cls.name}>
          {name}{' '}
          <a className={cls.link} href={gh} target="_blank" rel="noreferrer">
            {ghName}
          </a>
        </h2>
        <h3 className={cls.position}>{position}</h3>
        {description.map((item, i) => (
          <p key={`${name + i}`}>{item}</p>
        ))}
      </div>
    </div>
  );
};
