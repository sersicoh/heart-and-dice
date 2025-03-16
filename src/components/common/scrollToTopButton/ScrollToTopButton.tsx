import { useEffect, useState } from 'react';

import { BasicButton } from '@components/common/basicButton/BasicButton';

import { useMyTheme } from '@hooks/useMyTheme';
import ArrowSvg from '@assets/svg/arrow.svg?react';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { isMobile } = useMyTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
      }}
    >
      <BasicButton
        onClick={scrollToTop}
        fontSize={{ tablet: '10px', mobile: '10px' }}
        content={<ArrowSvg width={isMobile ? '24px' : '32px'} height={'100%'} />}
      ></BasicButton>
    </div>
  );
};
