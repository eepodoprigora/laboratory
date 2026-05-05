
import { AppCommonPageData } from '@/shared/api/types';
import { CommonPageProps } from '@/shared/model/types';
import { APPLY_GENERAL } from '@/shared/сonfig/const';


export const getCommonPageProps = async (): Promise<Omit<CommonPageProps, 'breadcrumbs' | keyof AppCommonPageData>> => {
    return {
        meta: {
            baseTitle: 'Лаборатория стройности',
            description: 'Лаборатория стройности - Фитнесс студия. Силовые, танцы, йога и массаж. Камерный формат, персональный подход. Флагманское направление — рекомпозиция тела.',
            ogImage: '/static/images/og-image.jpg',
        },
        header: {
            logo: { src: '/static/images/svg/logo-min.svg' },
            menuLinks: [
                { name: 'О студии', href: 'about' },
                { name: 'Рекомпозиция', href: 'recomposition' },
                { name: 'Направления', href: 'directions' },
                { name: 'Отзывы', href: 'reviews' },
                { name: 'Вопросы', href: 'faq' },
                { name: 'Контакты', href: 'contacts' },
            ],
            prices: { name: 'Стоимость', href: 'prices' },
            ctaLink: { name: 'Записаться', href: APPLY_GENERAL }
        },
        footer: {
            rights: '© 2026 Лаборатория стройности. Все права защищены.',
            menuLinks: [
                { name: 'Политика конфиденциальности', href: 'privacy-policy' }
            ],
        }
    };
};
