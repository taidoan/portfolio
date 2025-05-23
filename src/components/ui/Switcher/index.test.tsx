import { render, screen, fireEvent } from '@testing-library/react';
import { Switcher, SwitcherButton } from '.';
import React from 'react';
import style from './style.module.scss';

describe('Switcher', () => {
  it('renders a switcher component', () => {
    render(
      <Switcher data-testid='switcher'>
        <SwitcherButton value='active'>Active</SwitcherButton>
        <SwitcherButton value='inactive'>Inactive</SwitcherButton>
      </Switcher>,
    );

    const switcher = screen.getByTestId('switcher');
    expect(switcher).toBeInTheDocument();
  });

  it('renders a switcher component with a custom class', () => {
    render(
      <Switcher className='test-class' data-testid='switcher'>
        <SwitcherButton value='active'>Active</SwitcherButton>
        <SwitcherButton value='inactive'>Inactive</SwitcherButton>
      </Switcher>,
    );

    const switcher = screen.getByTestId('switcher');
    expect(switcher).toHaveClass('test-class');
  });

  it('renders a switcher component with a custom value', () => {
    render(
      <Switcher value='inactive'>
        <SwitcherButton value='active'>Active</SwitcherButton>
        <SwitcherButton value='inactive'>Inactive</SwitcherButton>
      </Switcher>,
    );
  });

  it('adds an active class to the active button when clicked', () => {
    const TestComponent = () => {
      const [value, setValue] = React.useState('inactive');
      return (
        <Switcher value={value} onChange={setValue}>
          <SwitcherButton value='active'>Active</SwitcherButton>
          <SwitcherButton value='inactive'>Inactive</SwitcherButton>
        </Switcher>
      );
    };

    render(<TestComponent />);

    const activeButton = screen.getByRole('button', { name: 'Active' });
    const inactiveButton = screen.getByRole('button', { name: 'Inactive' });

    fireEvent.click(activeButton);
    expect(activeButton).toHaveClass(style['switcher__button--active']);
    expect(inactiveButton).not.toHaveClass(style['switcher__button--active']);
  });
});
