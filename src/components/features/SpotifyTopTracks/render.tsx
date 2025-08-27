'use client';
import { Card, CardBody } from '@/components/ui/Card';
import { Alert, AlertTitle } from '@/components/ui/Alert';
import Link from 'next/link';
import style from './style.module.scss';
import Image from 'next/image';

import type { SpotifyRenderTracksProps } from './types';

export default function SpotifyRenderTracks({
  track,
  container = 'none',
}: SpotifyRenderTracksProps) {
  if (!track) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>Something went wrong, could not fetch top tracks.
      </Alert>
    );
  }

  const trackContent = (
    <div className={style.container}>
      <Link
        href={track.songUrl}
        target='_blank'
        rel='noopener noreferrer'
        className={style['track__spotify-link']}
      >
        <img
          src={track.albumCover.url}
          width={100}
          height={100}
          alt={track.title}
          className={style['track__album-cover']}
        />
      </Link>
      <div className={style['track__content']}>
        <h4 className={style['track__title']}>
          <Link href={track.songUrl} target='_blank' rel='noopener noreferrer'>
            {track.title}
          </Link>
        </h4>
        <p className={style['track__artist']}>
          {track.artists.map((artist, index) => (
            <span key={artist.name}>
              <Link href={artist.url} target='_blank' rel='noopener noreferrer'>
                {artist.name}
              </Link>
              {index < track.artists.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>

      <Image
        src={
          container === 'card'
            ? 'assets/icons/spotify-logo.svg'
            : 'assets/icons/spotify-logo-black.svg'
        }
        width={32}
        height={32}
        alt='Spotify Logo'
        className={style['spotify-logo']}
      />
    </div>
  );

  if (container === 'card') {
    return (
      <Card className={style.track}>
        <CardBody>{trackContent}</CardBody>
      </Card>
    );
  }

  return <div className={style.track}>{trackContent}</div>;
}
