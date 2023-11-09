import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: '5d41402abc4b2a76b9719d911017c59228229457b4bedf4a3bc16b998d7e4f0f',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
