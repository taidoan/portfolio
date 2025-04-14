import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactMethodsList, contactPlatforms } from './index';

// Mock tabler icons
vi.mock('@tabler/icons-react', () => ({
  IconSend: () => <span data-testid='icon-email'>EmailIcon</span>,
  IconBrandX: () => <span data-testid='icon-twitter'>TwitterIcon</span>,
  IconBrandGithub: () => <span data-testid='icon-github'>GithubIcon</span>,
  IconBrandLinkedin: () => <span data-testid='icon-linkedin'>LinkedinIcon</span>,
  IconBrandInstagram: () => <span data-testid='icon-instagram'>InstagramIcon</span>,
  IconBrandYoutube: () => <span data-testid='icon-youtube'>YoutubeIcon</span>,
}));

describe('ContactMethodsList Component', () => {
  test('renders nothing when no contact methods are provided', () => {
    const { container } = render(<ContactMethodsList />);
    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(0);
  });

  test('renders only the provided contact methods', () => {
    const { container } = render(
      <ContactMethodsList
        email={true}
        emailLink='mailto:test@example.com'
        github={true}
        githubLink='https://github.com/testuser'
      />,
    );

    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toBe(2);

    expect(screen.getByTestId('icon-email')).toBeInTheDocument();
    expect(screen.getByTestId('icon-github')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-twitter')).not.toBeInTheDocument();
  });

  test('renders links with correct URLs', () => {
    render(
      <ContactMethodsList
        email={true}
        emailLink='mailto:test@example.com'
        emailLabel='test@example.com'
        twitter={true}
        twitterLink='https://twitter.com/testuser'
        twitterLabel='@testuser'
      />,
    );

    const emailLink = screen.getByText('test@example.com');
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:test@example.com');

    const twitterLink = screen.getByText('@testuser');
    expect(twitterLink.closest('a')).toHaveAttribute('href', 'https://twitter.com/testuser');
  });

  test('renders platform name as fallback when no label is provided', () => {
    render(<ContactMethodsList github={true} githubLink='https://github.com/testuser' />);

    expect(screen.getByText('github')).toBeInTheDocument();
  });

  test('uses provided label instead of platform name when available', () => {
    render(
      <ContactMethodsList
        github={true}
        githubLink='https://github.com/testuser'
        githubLabel='My GitHub Profile'
      />,
    );

    expect(screen.getByText('My GitHub Profile')).toBeInTheDocument();
    expect(screen.queryByText('github')).not.toBeInTheDocument();
  });

  test('renders text instead of link when only value is provided without link', () => {
    render(<ContactMethodsList email={true} emailLabel='test@example.com' />);

    const emailText = screen.getByText('test@example.com');
    expect(emailText.closest('a')).toBeNull();
    expect(emailText.tagName.toLowerCase()).toBe('span');
  });

  test('applies custom className to the ul element', () => {
    const { container } = render(<ContactMethodsList className='custom-class' email={true} />);

    const list = container.querySelector('ul');
    expect(list).toHaveClass('custom-class');
  });

  test('renders links with correct attributes for external URLs', () => {
    render(<ContactMethodsList linkedin={true} linkedinLink='https://linkedin.com/in/testuser' />);

    const link = screen.getByText('linkedin').closest('a');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('encodes URI for links correctly', () => {
    const complexEmail = 'test user@example.com';
    render(
      <ContactMethodsList
        email={true}
        emailLink={`mailto:${complexEmail}`}
        emailLabel={complexEmail}
      />,
    );

    const link = screen.getByText(complexEmail).closest('a');
    expect(link).toHaveAttribute('href', encodeURI(`mailto:${complexEmail}`));
  });

  test('renders all platforms when all props are provided', () => {
    const props = contactPlatforms.reduce(
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (acc: any, platform: string) => {
        acc[platform] = `${platform}Value`;
        acc[`${platform}Link`] = `https://${platform}.com`;
        acc[`${platform}Label`] = `${platform} Label`;
        return acc;
      },
      {} as Record<string, string>,
    );

    render(<ContactMethodsList {...props} />);

    contactPlatforms.forEach((platform) => {
      expect(screen.getByText(`${platform} Label`)).toBeInTheDocument();
      expect(screen.getByTestId(`icon-${platform}`)).toBeInTheDocument();
    });

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(contactPlatforms.length);
  });
});
