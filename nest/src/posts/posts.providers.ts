import { Post } from './posts.entity';

export const catsProviders = [
    {
        provide: 'PostRepository',
        useValue: Post,
    },
];
