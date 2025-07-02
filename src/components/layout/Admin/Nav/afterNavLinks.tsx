import { getNavPrefs } from './getNavPrefs';
import { ServerProps } from 'payload';
import { AfterNavLinksClient } from './afterNavLinks.client';

export const Links = async (props: ServerProps) => {
  const { user, payload } = props;
  const normalizedUser = user
    ? {
        ...user,
        sessions: user.sessions
          ? user.sessions.map((session) => ({
              ...session,
              createdAt: session.createdAt ?? '',
            }))
          : undefined,
      }
    : undefined;
  const navPreferences = await getNavPrefs({ payload, user: normalizedUser });

  return <AfterNavLinksClient navPreferences={navPreferences} key={props.documentSubViewType} />;
};
