'use client';
import { useEffect, useState } from 'react';
import { Select, useField } from '@payloadcms/ui';
import { Option } from '@payloadcms/ui/elements/ReactSelect';

export type BreakpointProps = {
  label: string;
  value: string;
};

export const BreakpointSelect = (props: any) => {
  const { data, path } = props;
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState<BreakpointProps[]>([]);

  useEffect(() => {
    const breakpoints = data.map((option: BreakpointProps) => {
      return {
        label: option.label,
        value: option.value,
      };
    });

    setOptions(breakpoints);
  }, [data]);

  const handleChange = (selectedOption: Option) => {
    setValue(selectedOption.value as string);
  };

  if (options.length === 0) {
    return <div>No breakpoints available, please add some in the Globals section</div>;
  }

  return (
    <Select
      {...props}
      value={options.find((option) => option.value === value) || null}
      options={options}
      onChange={handleChange}
      name={path}
    />
  );
};
