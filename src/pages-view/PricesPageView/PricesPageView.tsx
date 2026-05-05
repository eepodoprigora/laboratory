import { useRef } from "react";
import DefaultLayout from "@/shared/ui/DefaultLayout";
import { Hero, HeroRawProps } from "@/widgets/Hero";
import { DARK_HEADER_CLASS } from "@/shared/сonfig/const";
import { useMapSections } from "@/shared/lib/use-map-sections";
import { useHeaderColorObserver } from "@/shared/lib/use-header-color";
import { Details, DetailsRawProps } from "./sections";
import { Faq, FaqRawProps } from "@/widgets/Faq";

export type RawProps = {
  h1: string;
  heroSectionData: HeroRawProps;
  detailsSectionData: DetailsRawProps;
  faqSectionData: FaqRawProps;
};

const PricesPageView = ({
  h1,
  heroSectionData,
  detailsSectionData,
  faqSectionData,
}: RawProps) => {
  const ref = useRef(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const sections = useMapSections([{ ref: heroRef }]);

  useHeaderColorObserver(sections, undefined, "-100px 0px 0px 0px");

  return (
    <DefaultLayout ref={ref}>
      <h1 className="visually-hidden">{h1}</h1>
      <Hero
        {...heroSectionData}
        variant="secondary"
        data-header-class={DARK_HEADER_CLASS}
        ref={heroRef}
      />
      <Details {...detailsSectionData} />
      <Faq {...faqSectionData} />
    </DefaultLayout>
  );
};

export default PricesPageView;
