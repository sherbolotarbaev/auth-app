'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { LoadSvg } from '@/public/svg';
import scss from '@/app/components/scss/button.module.scss';

interface Props {
  children: React.ReactNode;
  style?: keyof Styles;
  icon?: {
    svg: React.ReactElement;
    position: keyof Position;
  };
  disabled?: boolean;
  width?: number;
  type?: keyof Types;
  load?: boolean | string;
  onClick?: () => void;
  redirect?: string | URL;
  open?: string | URL;
  adaptive?: boolean;
  animation?: boolean;
  size?: Size;
}

type Size = 'small';

type Position = {
  right: string;
  left: string;
};

type Styles = {
  dark: string;
};

type Types = {
  button: string;
  submit: string;
};

export function Button({
  children,
  style,
  icon,
  disabled = false,
  width,
  type = 'button',
  load = false,
  onClick,
  redirect,
  open,
  adaptive = false,
  animation,
  size,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const redirectToPage = (path: string | URL) => {
    setLoading(true);

    if (typeof path === 'string') {
      router.push(path);
    } else {
      window.open(path.toString(), '_self');
    }
  };

  const openTab = (path: string | URL) => {
    setLoading(true);

    window.open(path.toString(), '_blank');
  };

  const renderButtonContent = () => {
    if (load || loading) {
      return typeof load === 'string' ? (
        <>
          <LoadSvg
            className={scss.load}
            style={style === 'dark' ? { fill: '#4a4d55' } : undefined}
          />
          {load}
        </>
      ) : (
        <LoadSvg
          className={scss.load}
          style={style === 'dark' ? { fill: '#4a4d55' } : undefined}
        />
      );
    }

    return (
      <>
        {icon &&
          icon.position === 'left' &&
          React.cloneElement(icon.svg, {
            className: scss.icon,
          })}
        {children}
        {icon &&
          icon.position === 'right' &&
          React.cloneElement(icon.svg, {
            className: scss.icon,
          })}
      </>
    );
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (redirect) {
      redirectToPage(redirect);
    } else if (open) {
      openTab(open);
    }
  };

  const buttonClassName = [
    scss.button,
    style && scss[style],
    disabled && scss.disabled,
    adaptive && scss.adaptive,
    animation && scss.animated,
    load && scss.button_load,
    size && scss[size],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      disabled={(typeof load === 'boolean' && load === true) || disabled}
      style={width ? { maxWidth: width } : undefined}
      onClick={handleClick}
      className={buttonClassName}
    >
      {renderButtonContent()}
    </button>
  );
}
