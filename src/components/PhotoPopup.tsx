"use client";

import Image from "next/image";
import { useId, useRef } from "react";

export function PhotoPopup({
  src,
  alt,
  label,
  className,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        className={className ?? "photo-popup-trigger"}
        onClick={() => dialogRef.current?.showModal()}
      >
        {label}
      </button>
      <dialog
        ref={dialogRef}
        className="photo-popup"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            event.currentTarget.close();
          }
        }}
      >
        <div className="photo-popup-content">
          <div className="photo-popup-heading">
            <h2 id={titleId}>{label}</h2>
            <button
              type="button"
              className="photo-popup-close"
              aria-label="Close photo"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
          </div>
          <div className="photo-popup-frame">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 720px) 88vw, 760px"
              className="photo-popup-image"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
