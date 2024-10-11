import { NavLink } from 'react-router-dom';

import Icon_facebook from '@/shared/assets/images/icon_facebook.png';
import Icon_instagram from '@/shared/assets/images/icon_instagram.png';
import Icon_telegram from '@/shared/assets/images/icon_telegram.png';
import Icon_youtube from '@/shared/assets/images/icon_youtube.png';
import animation_background from '@/shared/assets/video/background_video.mp4';
import cls from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={cls.socialMedia}>
      <video autoPlay loop muted className={cls.videoBackground}>
        <source src={animation_background} type="video/mp4" />
      </video>

      <p>Let’s get Social!</p>
      <div className={cls.iconWrapper}>
        <NavLink to="https://www.instagram.com/ecobar_by/?hl=ru">
          <img src={Icon_instagram} alt="our_instagram" className={cls.icon} />
        </NavLink>
        <NavLink to="https://t.me/noplasticitsfantastic_store">
          <img src={Icon_telegram} alt="our_telegram" className={cls.icon} />
        </NavLink>
        <NavLink to="https://www.facebook.com/ecobarby/">
          <img src={Icon_facebook} alt="our_facebook" className={cls.icon} />
        </NavLink>
        <NavLink to="https://www.youtube.com/channel/UC9XoSUHD5wztVgqnCKQqSDg">
          <img src={Icon_youtube} alt="our_youtube" className={cls.icon} />
        </NavLink>
      </div>
    </footer>
  );
};
