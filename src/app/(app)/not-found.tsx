import { Button } from '@components/ui/Button';

export default function NotFound() {
  return (
    <div className='not-found__page'>
      <div>
        <h2 className='section-heading'>Error</h2>
        <h1 className='not-found__title'>
          404<span className='accent-dot'>.</span>
        </h1>
        <p>
          Oops! This page could not be found. It doesn&apos;t exist or has been moved. Please check
          the URL and try again.
        </p>
      </div>
      <Button href='/' color='accent' hoverColor='secondary'>
        Return Home
      </Button>
    </div>
  );
}
