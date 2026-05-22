import { GetStaticProps, InferGetStaticPropsType } from "next";
import PricesPageView, {
  PricesPageViewRawProps,
} from "@/pages-view/PricesPageView";
import { getCommonPageProps } from "@/application/get-common-page-props";
import { CommonPageProps } from "@/shared/model/types";
import { tp } from "@/shared/lib/formatting";
import { APPLY_GENERAL, DISCUSS_LINK } from "@/shared/сonfig/const";

const PricesPage = ({
  h1,
  heroSectionData,
  detailsSectionData,
  faqSectionData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PricesPageView
      h1={h1}
      heroSectionData={heroSectionData}
      detailsSectionData={detailsSectionData}
      faqSectionData={faqSectionData}
    />
  );
};

export default PricesPage;

type PageProps = CommonPageProps & PricesPageViewRawProps;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const commonPageProps = await getCommonPageProps();

  return {
    props: {
      ...commonPageProps,
      bodyClass: "prices-page",
      meta: {
        ...commonPageProps.meta,
        title: "Цены",
      },
      breadcrumbs: [],
      h1: "Цены",
      heroSectionData: {
        image: { src: "/static/images/hero-prices.png" },
        text: tp(
          "Инвестиция, которая остаётся с тобой надолго. Честная цена за работу, которую видно. Один выбор — и тело скажет спасибо.",
        ),
        ctaLink: { name: tp("Пробное занятие"), href: APPLY_GENERAL },
      },
      detailsSectionData: {
        preHeader: tp("Стоимость занятий"),
        header: tp("Выберите свой формат"),
        text: tp(
          "Вы выбираете уровень вовлечения и ритм, который подходит именно вам. Каждый формат — это не просто посещения, а продуманная работа с результатом: с вниманием к деталям, состоянию и изменениям в теле.",
        ),
        steps: [
          {
            id: "recomposition-prices",
            image: { src: "/static/images/prices/1.png" },
            header: tp("Рекомпозиция"),
            text: tp(
              "Флагманская программа для изменения состава тела: питание, контроль прогресса и персональные тренировки на старте. Первые 10 занятий проходят индивидуально по специальной цене 15 000 ₽ вместо 33 000 ₽, после чего вы переходите в группу.",
            ),
            items: [
              { text: tp("4 занятия"), price: "7 200 ₽", type: "group" },
              { text: tp("8 занятий"), price: "12 000 ₽", type: "group" },
              { text: tp("12 занятий"), price: "14 400 ₽", type: "group" },
              {
                text: tp("Пробное"),
                price: "2 000 ₽",
                type: "single",
              },
              {
                text: tp("Разовое"),
                price: "3 500 ₽",
                type: "single",
              },
              {
                text: tp("5 занятий"),
                price: "17 000 ₽",
                type: "single",
              },
              {
                text: tp("10 занятий"),
                price: "33 000 ₽",
                type: "single",
              },
            ],
            ctaLink: { name: tp("Обсудить цели"), href: DISCUSS_LINK },
          },
          {
            id: "yoga-prices",
            image: { src: "/static/images/prices/3.png" },
            header: tp("Йога"),
            text: tp(
              "Йога для восстановления и баланса. Мягкая работа с телом, дыханием и вниманием к себе. Подходит для любого уровня, без перегруза и гонки за результатом.",
            ),
            items: [
              {
                text: tp("Пробное"),
                price: "800 ₽",
                type: "group",
              },
              {
                text: tp("Разовое"),
                price: "1 500 ₽",
                type: "group",
              },
              {
                text: tp("4 занятия"),
                price: "5 000 ₽",
                type: "group",
              },
              {
                text: tp("8 занятий"),
                price: "9 600 ₽",
                type: "group",
              },
              {
                text: tp("Разовое"),
                price: "5 000 ₽",
                type: "single",
              },
            ],
            ctaLink: { name: tp("Записаться"), href: APPLY_GENERAL },
          },
          {
            id: "dance-prices",
            image: { src: "/static/images/prices/5.jpg" },
            header: tp("Танцы"),
            text: tp(
              "Занятия, где вы начинаете двигаться свободнее и увереннее. Улучшается координация, появляется контакт с телом и удовольствие от процесса.",
            ),
            items: [
              {
                text: tp("Пробное"),
                price: "500 ₽",
                type: "group",
              },
              {
                text: tp("Разовое"),
                price: "1 400 ₽",
                type: "group",
              },

              {
                text: tp("4 занятия"),
                price: "4 900 ₽",
                type: "group",
              },
              {
                text: tp("8 занятий"),
                price: "7 900 ₽",
                type: "group",
              },
            ],
            ctaLink: { name: tp("Записаться"), href: APPLY_GENERAL },
          },
          {
            id: "massage-prices",
            image: { src: "/static/images/prices/6.png" },
            header: tp("Массаж"),
            text: tp(
              "Глубокая работа с телом без лишней боли и спешки. Уходят зажимы, появляется лёгкость и ощущение собранности.",
            ),
            items: [
              {
                text: tp(
                  "Общий - классический, спортивный, расслабляющий (60 минут)",
                ),
                price: "3 900 ₽",
                type: "once",
              },
              {
                text: tp("Антицеллюлитный, лимфодренажный (60 минут)"),
                price: "4 300 ₽",
                type: "once",
              },
              {
                text: tp("Общий - 5 / 10 сеансов"),
                price: "16 500 ₽ / 31 500 ₽",
                type: "subscription",
              },

              {
                text: tp("Антицеллюлитный, лимфодренажный — 5 / 10 сеансов"),
                price: "18 500 ₽ / 34 900 ₽ ",
                type: "subscription",
              },
              {
                text: tp("Массаж спины (30 минут)"),
                price: "2 900 ₽",
                type: "once",
              },
              {
                text: tp("Массаж спины - 5 / 10 сеансов"),
                price: "11 900 ₽ / 22 500 ₽",
                type: "subscription",
              },
              {
                text: tp("Массаж лица - буккальный, скульптурирующий "),
                price: "2 000 ₽",
                type: "once",
              },
              {
                text: tp("Массаж лица - 5 / 10 сеансов "),
                price: "9 500 ₽ / 17 900 ₽",
                type: "subscription",
              },
              {
                text: tp(
                  "Акупунктура ** - иглоукалывание по китайскому методу (60 минут)",
                ),
                price: "7 000 ₽",
                type: "once",
              },
            ],
            memo: [
              tp(
                "* Цена через «/» указана для разных вариантов: например, 5 и 10 сеансов.",
              ),
              tp(
                "** Процедуру проводит врач Юлия Сидоренко, специалист с высшим медицинским образованием.",
              ),
            ],
            ctaLink: { name: tp("Записаться"), href: APPLY_GENERAL },
          },
        ],
      },
      faqSectionData: {
        header: tp("Частые вопросы"),
        faqItems: [
          {
            id: 1,
            title: tp("Сколько действует абонемент на тренировки?"),
            content: tp(
              "Абонемент на тренировки действует 30 дней с момента активации. За это время можно спокойно распределить занятия по удобному графику.",
            ),
          },
          {
            id: 2,
            title: tp("Сколько действует абонемент на массаж?"),
            content: tp(
              "Абонемент на массаж действует 45 дней с момента активации.",
            ),
          },
          {
            id: 3,
            title: tp("Можно ли продлить или заморозить абонемент?"),
            content: tp("Нет. Продление и заморозка не предусмотрены."),
          },
          {
            id: 5,
            title: tp("Что входит в стоимость тренировки?"),
            content: tp(
              "В стоимость входит занятие с тренером, подбор нагрузки под твой уровень и контроль техники во время тренировки.",
            ),
          },
          {
            id: 8,
            title: tp("Можно ли совмещать тренировки и массаж?"),
            content: tp(
              "Да, это хороший вариант для работы с телом в комплексе: тренировки помогают укреплять мышцы и менять форму, а массаж — снимать напряжение и улучшать восстановление.",
            ),
          },
          {
            id: 9,
            title: tp("Нужно ли записываться заранее?"),
            content: tp(
              "Да, запись обязательна. Так мы сохраняем камерный формат и можем комфортно распределить места в расписании.",
            ),
          },
          {
            id: 10,
            title: tp("Если я пропущу занятие, оно сгорит?"),
            content: tp(
              "Если отменить запись заранее по правилам студии, занятие не сгорает. Если отмена поздняя или без предупреждения, занятие может быть списано.",
            ),
          },
        ],
      },
    } satisfies PageProps,
    revalidate: 60,
  };
};
