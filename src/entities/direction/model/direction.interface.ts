import { ILink, ImageShape } from '@/shared/model/types';

export interface IDirection {
    id: string | number;
    title: string;
    description: string | null;
    image: ImageShape;
    button: string;
    link: ILink;
};

