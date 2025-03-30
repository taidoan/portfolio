'use server';
import { UIFieldServerComponent, UIFieldServerProps } from 'payload';
import { BreakpointSelect } from './component';

export type BreakpointProps = {
  label: string;
  value: string;
};

type CustomUIFieldServerProps = UIFieldServerProps & {
  admin?: {
    width?: string;
    style?: React.CSSProperties;
  };
};

export const BreakpointComponent: UIFieldServerComponent = async (
  props: CustomUIFieldServerProps,
) => {
  const { path } = props;
  const info = await props.payload.findGlobal({
    slug: 'breakpoints',
  });

  const getBreakpointOptions = (
    breakpointsList: {
      name: string;
      breakpoint: string;
    }[],
  ) => {
    return breakpointsList.map((breakpoint) => ({
      label: breakpoint.name,
      value: breakpoint.breakpoint,
    }));
  };

  const breakpointOptions = getBreakpointOptions(info?.breakpoints || []);

  return (
    <div
      className='field-type breakpoint-field'
      style={
        {
          '--field-width': '50%',
        } as React.CSSProperties
      }
    >
      <label className='field-label'>Breakpoints List</label>
      <BreakpointSelect data={breakpointOptions} path={path} />
    </div>
  );
};
