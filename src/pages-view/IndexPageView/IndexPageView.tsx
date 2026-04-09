import DefaultLayout from "@/shared/ui/DefaultLayout";
import {
  About,
  AboutRawProps,
  Recomposition,
  RecompositionRawProps,
  Directions,
  DirectionsRawProps,
  Reviews,
  ReviewsRawProps,
  Faq,
  FaqRawProps,
  Contacts,
  ContactsRawProps,
} from "@/pages-view/IndexPageView/sections";
import { Hero, HeroRawProps } from "@/widgets/Hero";

export type RawProps = {
  h1: string;
  heroSectionData: HeroRawProps;
  aboutSectionData: AboutRawProps;
  recompositionSectionData: RecompositionRawProps;
  directionsSectionData: DirectionsRawProps;
  reviewsSectionData: ReviewsRawProps;
  faqSectionData: FaqRawProps;
  contactsSectionData: ContactsRawProps;
};

const IndexPageView = ({
  h1,
  heroSectionData,
  aboutSectionData,
  recompositionSectionData,
  directionsSectionData,
  reviewsSectionData,
  faqSectionData,
  contactsSectionData,
}: RawProps) => {
  return (
    <DefaultLayout>
      <div className="index__content">
        <h1 className="visually-hidden">{h1}</h1>
        <Hero {...heroSectionData} />
        <About {...aboutSectionData} />
        <Recomposition {...recompositionSectionData} />
        <Directions {...directionsSectionData} />
        <Reviews {...reviewsSectionData} />
        <Faq {...faqSectionData} />
        <Contacts {...contactsSectionData} />
      </div>
    </DefaultLayout>
  );
};

export default IndexPageView;
