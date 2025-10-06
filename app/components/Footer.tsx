import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import FooterLinks from "@/app/components/FooterLinks";

const Footer = async () => {
  const client = createClient();
  const footer = await client.getSingle("footer");

  return (
    <footer className="relative mx-3 mb-3 before:absolute before:-inset-1 before:-z-10 before:w-auto before:max-w-[1000px] before:rounded-xl before:border before:border-grid-line/80 before:bg-background before:content-[''] before:xs:-inset-[5px] sm:mx-4 sm:mb-4 lg:mx-auto before:lg:mx-auto">
      <div className="relative z-20 w-auto max-w-[990px] overflow-x-hidden rounded-lg border border-grid-line bg-background/15 p-6 backdrop-blur-sm xs:p-8 xs:pb-10 lg:mx-auto">
        <div className="flex flex-col items-center space-y-4 xs:space-y-8">
          <div className="flex w-full flex-col items-center space-y-2.5 xs:space-y-4">
            {isFilled.richText(footer.data.heading) && (
              <h4 className="text-[10px] font-light tracking-wide text-text-secondary uppercase xs:text-xs">
                <PrismicRichText field={footer.data.heading} />
              </h4>
            )}

            <nav aria-label="Footer social links">
              <FooterLinks links={footer.data.social_links} />
            </nav>

            <hr className="h-px w-sm border-0 bg-gradient-to-r from-transparent via-grid-line-bright to-transparent lg:w-lg" />
          </div>

          {isFilled.richText(footer.data.body) && (
            <PrismicRichText
              field={footer.data.body}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-center text-[10px] font-light text-text-tertiary lg:text-xs">
                    {children}
                  </p>
                ),
                hyperlink: ({ children, node }) => (
                  <a
                    href={node.data.url}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors duration-200 hover:text-text-secondary"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          )}

          {isFilled.keyText(footer.data.copyright) && (
            <p className="text-center text-[8px] font-light text-text-quaternary lg:text-[10px]">
              {footer.data.copyright}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
