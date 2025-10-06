"use client";

import React, { useState } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import type { Content } from "@prismicio/client";

interface FooterLinksProps {
  links: Content.FooterDocumentData["social_links"];
}

const FooterLinks = ({ links }: FooterLinksProps) => {
  const [copied, setCopied] = useState(false);
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      console.error("Failed to copy email");
    }
  };

  return (
    <ul className="mb-1 flex space-x-6 xs:mb-2">
      {links.map((item, i) => {
        const isEmail = item.link.text?.startsWith("Email");

        if (isEmail) {
          return (
            <li key={i}>
              <button
                onClick={handleCopy}
                className="group relative inline-flex min-h-11 items-center"
                aria-label="Copy email to clipboard"
                data-cursor="-inverse"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-grid-line-medium/50 transition-transform duration-500 hover:scale-90 sm:size-15">
                  <PrismicNextImage
                    field={item.icon}
                    alt=""
                    className="size-5 transition-all duration-200 sm:size-6"
                  />
                </span>

                {copied && (
                  <span className="tooltip !-top-9 animate-in !bg-background duration-300 fade-in slide-in-from-bottom-2">
                    Email copied to clipboard!
                  </span>
                )}
              </button>
            </li>
          );
        }

        return (
          <li key={i}>
            <PrismicNextLink
              field={item.link}
              className="group inline-flex min-h-11 items-center"
              data-cursor="-inverse"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-grid-line-medium/50 transition-transform duration-500 hover:scale-90 sm:size-15">
                <PrismicNextImage
                  field={item.icon}
                  alt=""
                  className="size-5 transition-all duration-200 sm:size-6"
                />
              </span>
            </PrismicNextLink>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterLinks;
