import { AppCommonPageData } from '../api/types';

export type PageMeta = Partial<{
    title: string;
    description: string;
    ogImage: string;
}>;

export type AppBreadcrumbs = {
    text: string;
    href?: string | null;
}[];


export type CommonPageProps = AppCommonPageData & {
    bodyClass?: string;
    meta: PageMeta &
    Partial<{
        baseTitle: string;
    }>;
    breadcrumbs: AppBreadcrumbs;
    header: {
        logo: ImageShape | null;
        menuLinks: ILink[];
        ctaLink: ILink;
    }

};

export type ImageShape = {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
    title?: string;
};

export type OrientationImageShape = {
    horizontal: ImageShape | null;
    vertical: ImageShape | null;
};
export type ILink = {
    href: string;
    name: string;
}

export type VideoShape = {
    type: string;
    src: string;
    media?: string;
    previewImg?: ImageShape | null;
}[];


export type IPhone = {
    value: string;
    link: string;
}

export type ISocial = {
    type: string
    value: string;
    link: string;
}



