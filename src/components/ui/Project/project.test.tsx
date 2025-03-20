import { render, screen } from '@testing-library/react';
import { DetailsList, DetailsItem } from './details/components';

describe('<DetailsList>', () => {
  it('renders a details list component', () => {
    render(
      <DetailsList data-testid='details-list'>
        <DetailsItem type='client'>Example Client</DetailsItem>
        <DetailsItem type='tools'>Example Tools</DetailsItem>
      </DetailsList>,
    );

    expect(screen.getByTestId('details-list')).toBeInTheDocument();
    expect(screen.getByText('Client:')).toBeInTheDocument();
    expect(screen.getByText('Example Client')).toBeInTheDocument();
    expect(screen.getByText('Tools:')).toBeInTheDocument();
    expect(screen.getByText('Example Tools')).toBeInTheDocument();
    expect(screen.getByTestId('client-icon')).toBeInTheDocument();
    expect(screen.getByTestId('tools-icon')).toBeInTheDocument();
  });
});
