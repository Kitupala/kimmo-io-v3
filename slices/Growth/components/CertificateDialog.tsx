"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/app/lib/gsap";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { ImageField, KeyTextField } from "@prismicio/client";

interface CertificateDialogProps {
  certificate: ImageField | null;
  title: KeyTextField;
  provider: KeyTextField;
}

const CertificateDialog = ({
  certificate,
  title,
  provider,
}: CertificateDialogProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (tooltipRef.current && showTooltip) {
        gsap.fromTo(
          tooltipRef.current,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
      }
    },
    { scope: containerRef, dependencies: [showTooltip] },
  );

  if (!certificate?.url) return null;

  return (
    <div
      ref={containerRef}
      className="hidden sm:col-start-2 sm:flex md:col-start-4"
    >
      <Dialog>
        <div className="relative flex w-full md:justify-center">
          <DialogTrigger asChild>
            <button
              className="group/cert flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              aria-label="View certificate"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Image
                src="./assets/icons/certificate.svg"
                width={20}
                height={20}
                alt="View certificate"
                className="transition-transform hover:scale-85"
                data-cursor="-inverse"
              />

              {showTooltip && (
                <div ref={tooltipRef} className="tooltip">
                  View certificate
                </div>
              )}
            </button>
          </DialogTrigger>
        </div>

        <DialogContent className="group/overlay sm:max-w-md md:max-w-xl lg:max-w-4xl">
          <DialogTitle className="sr-only">
            {title} Certificate from {provider}
          </DialogTitle>

          <a
            href={certificate.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-full w-full cursor-zoom-in"
          >
            <div className="relative aspect-[calc(4.04)/3] w-full overflow-hidden rounded-md">
              <Image
                src={certificate.url}
                alt={`${title} certificate from ${provider}`}
                fill
                className="rounded-md object-contain brightness-85"
                priority
              />
              <div className="certificate-overlay">
                <span>Click to view full size</span>
              </div>
            </div>
          </a>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificateDialog;
