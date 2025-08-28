import style from './styles.module.scss';
import clsx from 'clsx';

export type DividerProps = {
  weight?: 'minimal' | 'thin' | 'thick';
  width?: 'half' | 'default' | 'full';
  centered?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'light-grey';
  opacity?: number;
  className?: string;
  type: 'content' | 'section';
};

/**
 * Divider component renders a divider with a background color, width, weight, opacity, and centered option. A custom class name can be passed to the component.
 * @param props - {@link DividerProps}
 * @param {"thin" | "thick"} [props.weight] - The weight of the divider. Defaults to 'thin'.
 * @param {"half" | "full"} [props.width] - The width of the divider. Defaults to 'full'.
 * @param {boolean} [props.centered] - Whether the divider should be centered. Defaults to false.
 * @param {"primary" | "secondary" | "accent" | undefined} [props.color] - The color of the divider. Defaults to undefined.
 * @param {number} [props.opacity] - The opacity of the divider. Defaults to 0.5.
 * @param {string} [props.className] - The class name to be applied to the divider. Defaults to an empty string.
 * @returns {JSX.Element} The rendered divider component.
 * @example
 * <Divider />
 * <Divider color="accent" />
 * <Divider color="secondary" />
 * <Divider color="primary" weight="thick" />
 * <Divider opacity={1} />
 * <Divider color="accent" opacity={1} width="half" />
 * <Divider color="secondary" opacity={1} width="full" />
 * <Divider color="primary" opacity={1} weight="thick"/>
 */

export const Divider = ({
  weight = 'thin',
  width = 'default',
  centered = false,
  color,
  opacity = 0.5,
  type,
  className,
}: DividerProps) => {
  const dividerClasses = clsx(
    style.base,
    style[weight],
    style[width],
    centered ? style.centered : '',
    color ? style[`clr-${color}`] : '',
    'divider',
    className,
    style[type],
  );
  return <div className={dividerClasses} style={{ opacity }} data-testid='divider'></div>;
};
