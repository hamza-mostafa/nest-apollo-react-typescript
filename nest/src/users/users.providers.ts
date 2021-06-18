import { User } from './users.entity';

export const catsProviders = [
    {
        provide: 'UserRepository',
        useValue: User,
    },
];
