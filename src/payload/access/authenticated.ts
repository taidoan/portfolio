import type { AccessArgs, Access } from 'payload';
import type { User } from '@/payload-types';

type isAuthenticated = (args: AccessArgs<User>) => boolean;

/**
 * Access control function that allows any user to access the resource.
 *
 * @returns {boolean} Always returns `true`, granting access to everyone.
 */
export const anyone: Access = () => true;

/**
 * Checks if the request is authenticated by verifying the presence of a user object.
 *
 * @param context - An object containing the request, which should include a `user` property if authenticated.
 * @returns `true` if the user is authenticated (i.e., the `user` property exists), otherwise `false`.
 */
export const authenticated: isAuthenticated = ({ req: { user } }) => !!user;

/**
 * Checks if the current user is authenticated and either an admin or the owner of the resource.
 *
 * @param params - An object containing the request context and the resource ID.
 * @param params.req.user - The current authenticated user object, if available.
 * @param params.id - The ID of the resource to check ownership against.
 * @returns `true` if the user is an admin or if the user's ID matches the resource ID; otherwise, `false`.
 */
export const authenticatedSelfOrAdmin: isAuthenticated = ({ req: { user }, id }) => {
  if (user?.role === 'admin') return true;
  return !!user && user.id === id;
};

/**
 * Checks if the authenticated user has the 'admin' role.
 *
 * @param context - An object containing the request, which includes the user.
 * @returns `true` if the user exists and their role is 'admin', otherwise `false`.
 */
export const admin: isAuthenticated = ({ req: { user } }) => user?.role === 'admin';

/**
 * Access control function that allows access if the user is authenticated,
 * otherwise restricts access to only published items.
 *
 * @param req - The request object containing the user information.
 * @returns `true` if the user is authenticated, otherwise a filter object that restricts access to items with `_status` equal to `'published'`.
 */
export const authenticatedOrPublished: Access = ({ req: { user } }) =>
  user ? true : { _status: { equals: 'published' } };
