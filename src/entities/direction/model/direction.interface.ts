import { ILink, ImageShape } from '@/shared/model/types';
import { PricesRawProps } from '@/shared/ui/Prices';

export interface IDirection {
    id: string | number;
    title: string;
    description: string | null;
    image: ImageShape;
    ctaLink: ILink;
    viewPrices: ILink;
    prices: PricesRawProps;
};

