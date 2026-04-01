import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCommonPageProps } from "@/application/get-common-page-props";

import IndexPageView, {
  IndexPageViewRawProps,
} from "@/pages-view/IndexPageView";
import { CommonPageProps } from "@/shared/model/types";
import { tp } from "@/shared/lib/formatting";

const IndexPage = ({
  h1,
  heroSectionData,
  aboutSectionData,
  recompositionSectionData,
  directionsSectionData,
  reviewsSectionData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <IndexPageView
        h1={h1}
        heroSectionData={heroSectionData}
        aboutSectionData={aboutSectionData}
        recompositionSectionData={recompositionSectionData}
        directionsSectionData={directionsSectionData}
        reviewsSectionData={reviewsSectionData}
      />
    </>
  );
};

export default IndexPage;

type PageProps = CommonPageProps & IndexPageViewRawProps;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const [commonPageProps] = await Promise.all([getCommonPageProps()]);

  return {
    props: {
      ...commonPageProps,
      bodyClass: "index-page",
      meta: {
        ...commonPageProps.meta,
        title: "Лаборатория стройности - Главная",
      },
      breadcrumbs: [],
      h1: "Лаборатория стройности",
      heroSectionData: {
        image: { src: "/static/images/hero_1.jpg" },
        text: tp(
          "Силовые, танцы, йога и массаж. Камерный формат, персональный подход. Флагманское направление — рекомпозиция тела.",
        ),
        button: tp("Пробное занятие"),
      },
      aboutSectionData: {
        text: tp(
          "Привет, я Настя — тренер с опытом более 12 лет и создатель этой студии. Мы создали пространство, где результат строится на профессионализме, эстетике и внимании к каждой детали.",
        ),
        mainImage: { src: "/static/images/about_main.jpg" },
        button: tp("Узнать больше"),
        advantages: [
          {
            id: 1,
            image: { src: "/static/images/advantages/adv_1.jpg" },
            header: tp("Мини-группы 3–5"),
            description: tp(
              "До 10, но обычно 3–5 — тренер реально видит каждого.",
            ),
          },
          {
            id: 2,
            image: { src: "/static/images/advantages/adv_2.jpg" },
            header: tp("Тренер-основательница"),
            description: tp(
              "Почти все силовые ведёт сама — сильная техника и контроль.",
            ),
          },
          {
            id: 3,
            image: { src: "/static/images/advantages/adv_3.jpg" },
            header: tp("Система вместо хаоса"),
            description: tp(
              "Прогресс шаг за шагом: нагрузка + восстановление + питание.",
            ),
          },
          {
            id: 4,
            image: { src: "/static/images/advantages/adv_4.jpg" },
            header: tp("Уют и эстетика"),
            description: tp(
              "Стильный интерьер, музыка, комфорт — хочется возвращаться.",
            ),
          },
        ],
      },
      recompositionSectionData: {
        header: tp("Рекомпозиция тела"),
        text: tp(
          "Система, в которой ты становишься стройнее, сильнее и увереннее без экстремальных диет. Тренировки, питание и сопровождение работают вместе на твой результат.",
        ),
        steps: [
          {
            id: 1,
            image: { src: "/static/images/recomposition/rec_1.jpg" },
            header: tp("Персональный старт"),
            text: tp(`<p>Мы не начинаем «сразу худеть».<br/>
Мы сначала делаем так, чтобы тело вообще начало меняться.</p>

<p><strong>Что происходит на старте:</strong></p>

<ul>
  <li>фиксируем точку А: фото, вес, состояние</li>
  <li>ставим технику, чтобы тренировки реально работали</li>
  <li>подбираем нагрузку под тебя, а не «как у всех»</li>
  <li>собираем БЖУ, с которым ты ешь и не толстеешь</li>
</ul>

<p>Ты начинаешь понимать своё тело и видеть первые изменения уже здесь.</p>

<p><strong>10 персональных тренировок — 15 000 ₽ вместо 33 000 ₽</strong></p>`),
          },
          {
            id: 2,
            image: { src: "/static/images/recomposition/rec_2.jpg" },
            header: tp("Работа в группе без потери контроля"),
            text: tp(`<p>Когда техника уже поставлена, мы переходим в группу — без потери индивидуального подхода.</p>

<p><strong>Как это проходит:</strong></p>

<ul>
  <li>у каждого своя программа тренировок</li>
  <li>ты работаешь по плану, а не просто повторяешь за тренером</li>
  <li>тренер контролирует технику и корректирует ошибки</li>
  <li>даёт рекомендации по нагрузке и прогрессу</li>
</ul>

<p>Такой формат комфортнее по стоимости, но при этом сохраняет контроль, внимание к твоим задачам и стабильное движение к результату.</p>`),
          },
          {
            id: 3,
            image: { src: "/static/images/recomposition/rec_3.jpg" },
            header: tp("Система, которая даёт результат"),
            text: tp(`<p>Самые важные изменения происходят не только в зале, но и между тренировками.</p>

<p><strong>Ты не остаёшься одна:</strong></p>

<ul>
  <li>чат с постоянной поддержкой</li>
  <li>проверка отчётов и корректировка питания</li>
  <li>помощь без срывов и откатов</li>
  <li>рекомендации, как вписывать любимую еду в систему</li>
  <li>понятные объяснения без мифов и запретов</li>
</ul>

<p>Каждый месяц мы делаем замеры и отслеживаем прогресс не только по цифрам, но и визуально.</p>

<p>Так результат не становится временной историей — он закрепляется и остаётся с тобой надолго.</p> `),
          },
        ],
        button: tp("Обсудить цели"),
      },
      directionsSectionData: {
        header: tp("Движение в своём ритме"),
        text: tp(
          "Собрали направления под разные задачи и добавили выбор формата: групповые занятия или индивидуальная работа с тренером.",
        ),
        items: [
          {
            id: 1,
            image: { src: "/static/images/directions/dir_1.jpg" },
            title: tp("Силовые тренировки"),
            description: tp(
              "Индивидуальные программы для всего тела и с акцентом на ягодицы. Работаем с техникой, прогрессией и нагрузкой, чтобы вы получали реальный визуальный результат: подтянутое тело, рельеф и силу без случайных тренировок.",
            ),
            button: tp("Узнать подробнее"),
            link: { href: "#", name: tp("Записаться") },
          },
          {
            id: 2,
            image: { src: "/static/images/directions/dir_2.jpg" },
            title: tp("Йога"),
            description: tp(
              "Практика для гибкости, осанки и восстановления. Помогаем снять зажимы, улучшить подвижность и почувствовать тело. Подходит как для расслабления после нагрузок, так и для мягкой работы с телом.",
            ),
            button: tp("Узнать подробнее"),
            link: { href: "#", name: tp("Записаться") },
          },
          {
            id: 3,
            image: { src: "/static/images/directions/dir_3.jpg" },
            title: tp("Массаж"),
            description: tp(
              "Общий и зональный массаж под ваш запрос: спина, шея, ноги или всё тело. Снимаем напряжение, улучшаем кровообращение и ускоряем восстановление после тренировок, чтобы тело выглядело и чувствовало себя лучше.",
            ),
            button: tp("Узнать подробнее"),
            link: { href: "#", name: tp("Записаться") },
          },
          {
            id: 4,
            image: { src: "/static/images/directions/dir_4.jpg" },
            title: tp("Танцы"),
            description: tp(
              "Twerk и High Heels — направления, которые раскрывают пластику и уверенность. Работаем с техникой, движением и подачей, чтобы вы чувствовали себя свободно, красиво и уверенно в своём теле.",
            ),
            button: tp("Узнать подробнее"),
            link: { href: "#", name: tp("Записаться") },
          },
        ],
      },
      reviewsSectionData: {
        header: tp("Результаты, которые видно и чувствуется"),
        text: tp(
          "Реальные отзывы, заметные изменения в теле, самочувствии и уверенности в себе.",
        ),
        button1: tp("Обсудить цели"),
        button2: tp("Записаться"),
        slides: [
          {
            id: 1,
            header: tp("Марина, 28 лет"),
            description: tp(
              "«Похудела на 10 кг за 4 месяца, ушёл целлюлит, тело подтянулось. Результат видят все, а я чувствую себя намного увереннее и энергичнее»",
            ),
            imageBefore: { src: "/static/images/before-after/before_1.jpg" },
            imageAfter: { src: "/static/images/before-after/after_1.jpg" },
            timing: "4 месяца",
          },
          {
            id: 2,
            header: tp("Альбина, 30 лет"),
            description: tp(
              "«Похудела на 10 кг, ушёл целлюлит, тело подтянулось. Результат видят все, а я чувствую себя намного увереннее и энергичнее»",
            ),
            imageBefore: { src: "/static/images/before-after/before_1.jpg" },
            imageAfter: { src: "/static/images/before-after/after_1.jpg" },
            timing: "4 месяца",
          },
        ],
      },
    } satisfies PageProps,
    revalidate: 60,
  };
};
