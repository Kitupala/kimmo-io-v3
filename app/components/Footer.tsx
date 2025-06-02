import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

const Footer = async () => {
  const client = createClient();
  const footer = await client.getSingle("footer");

  return (
    <footer className="border-container mx-3 mb-3 sm:mx-4 sm:mb-4 lg:mx-auto">
      <div className="bg-background/15 border-grid-line xs:p-8 xs:pb-10 relative z-20 w-auto max-w-[990px] overflow-x-hidden rounded-lg border p-6 backdrop-blur-sm lg:mx-auto">
        <div className="xs:space-y-8 flex flex-col items-center space-y-4">
          <div className="xs:space-y-4 flex w-full flex-col items-center space-y-2.5">
            {isFilled.richText(footer.data.heading) && (
              <h4 className="text-text-secondary xs:text-xs text-[10px] font-light tracking-wide uppercase">
                <PrismicRichText field={footer.data.heading} />
              </h4>
            )}

            <nav aria-label="footer social links">
              <ul className="xs:mb-2 mb-1 flex space-x-6">
                {footer.data.social_links.map((item, i) => (
                  <li key={i}>
                    <PrismicNextLink
                      field={item.link}
                      className="group inline-flex min-h-11 items-center"
                    >
                      <PrismicNextImage
                        field={item.icon}
                        alt=""
                        className="transition-all duration-200 group-hover:inset-1 group-hover:invert-50"
                      />
                    </PrismicNextLink>
                  </li>
                ))}
              </ul>
            </nav>

            <hr className="via-grid-line-bright h-px w-sm border-0 bg-gradient-to-r from-transparent to-transparent lg:w-lg" />
          </div>

          {isFilled.richText(footer.data.body) && (
            <PrismicRichText
              field={footer.data.body}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-text-tertiary text-center text-[10px] font-light lg:text-xs">
                    {children}
                  </p>
                ),
                hyperlink: ({ children, node }) => (
                  <a
                    href={node.data.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-text-secondary transition-colors duration-200"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          )}

          {isFilled.keyText(footer.data.copyright) && (
            <p className="text-text-quaternary text-center text-[8px] font-light lg:text-[10px]">
              {footer.data.copyright}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
