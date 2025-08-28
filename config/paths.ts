import { join, resolve } from 'path';

// Resolving the root path of the project by moving one directory up from the current directory (__dirname)
export const root: string = resolve(__dirname, '..');

// Joining the root path with the src directory to get the soruce path
export const source: string = join(root, 'src');

// Joining the source path with the styles directory to the styles path
export const styles: string = join(source, 'styles');

// Joining the root path with the public directory to get the public path
export const pub: string = join(root, 'public');

// Joining the public path to get the assets path
export const assets: string = join(pub, 'assets');

// Joing the assets path to get the images path
export const images: string = join(assets, 'images');
