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
import { useHeaderColorObserver } from "@/shared/lib/use-header-color";
import { useRef } from "react";
import { useMapSections } from "@/shared/lib/use-map-sections";
import { DARK_HEADER_CLASS } from "@/shared/сonfig/const";

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
  const heroRef = useRef<HTMLDivElement>(null);

  const sections = useMapSections([{ ref: heroRef }]);

  useHeaderColorObserver(sections, undefined, "-100px 0px 0px 0px");

  return (
    <DefaultLayout>
      <div className="index__content">
        <h1 className="visually-hidden">{h1}</h1>
        <Hero
          {...heroSectionData}
          ref={heroRef}
          data-header-class={DARK_HEADER_CLASS}
        />
        <About {...aboutSectionData} id="about" />
        <Recomposition {...recompositionSectionData} id="recomposition" />
        <Directions {...directionsSectionData} id="directions" />
        <Reviews {...reviewsSectionData} id="reviews" />
        <Faq {...faqSectionData} id="faq" />
        <Contacts {...contactsSectionData} id="contacts" />
      </div>
    </DefaultLayout>
  );
};

export default IndexPageView;
