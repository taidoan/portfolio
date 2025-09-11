import React, { useState, useContext, createContext } from 'react';
import clsx from 'clsx';
import style from './style.module.scss';

const TooltipContext = createContext<{
  color?: 'dark' | 'light';
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export const Tooltip = ({
  children,
  defaultOpen = false,
  color = 'dark',
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  color?: 'dark' | 'light';
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <TooltipContext.Provider value={{ open, setOpen, color }}>
      <span className={clsx(style['tooltip__container'])}>{children}</span>
    </TooltipContext.Provider>
  );
};

Tooltip.Trigger = (({ children }: { children: React.ReactNode }) => {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error('Tooltip.Trigger must be used within a Tooltip');

  return (
    <span
      onMouseEnter={() => ctx.setOpen(true)}
      onMouseLeave={() => ctx.setOpen(false)}
      onFocus={() => ctx.setOpen(true)}
      onBlur={() => ctx.setOpen(false)}
      className={clsx(style['tooltip__trigger'])}
    >
      {children}
    </span>
  );
}) as React.FC<{ children: React.ReactNode }>;

Tooltip.Trigger.displayName = 'Tooltip.Trigger';

Tooltip.Content = (({ children }: { children: React.ReactNode }) => {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error('Tooltip.Content must be used inside <Tooltip>');

  return ctx.open ? (
    <span className={clsx(style.tooltip, style[`tooltip--${ctx.color}`])}>{children}</span>
  ) : null;
}) as React.FC<{ children: React.ReactNode }>;

Tooltip.Content.displayName = 'Tooltip.Content';
