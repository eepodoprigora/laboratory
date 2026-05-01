import DOMPurify from "isomorphic-dompurify";
import { useRef } from "react";
import DefaultLayout from "@/shared/ui/DefaultLayout";

export type RawProps = {
  textBlocks: string;
};

const TextPageView = ({ textBlocks }: RawProps) => {
  const ref = useRef(null);

  return (
    <DefaultLayout ref={ref}>
      <div className="text-page__inner">
        <div className="wrapper">
          {textBlocks.length > 0 && (
            <div className="text-page__wysiwyg-container">
              {textBlocks.length > 0 && (
                <div
                  className="wysiwyg"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(textBlocks),
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TextPageView;
