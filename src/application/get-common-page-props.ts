
import { AppCommonPageData } from '@/shared/api/types';
import { CommonPageProps } from '@/shared/model/types';


export const getCommonPageProps = async (): Promise<Omit<CommonPageProps, 'breadcrumbs' | keyof AppCommonPageData>> => {
    return {
        meta: {
            baseTitle: 'Лаборатория стройности',
            description: 'Фитнесс студия',
            ogImage: '/static/images/og-image.jpg',
        },
        header: {
            logo: { src: '/static/images/svg/logo-min.svg' },
            menuLinks: [
                { name: 'О студии', href: 'about' },
                { name: 'Рекомпозиция', href: 'recomposition' },
                { name: 'Направления', href: 'directions' },
                { name: 'Отзывы', href: 'reviews' },
                { name: 'Контакты', href: 'contacts' },
            ],

            button: 'Записаться'
        }
    };
};
