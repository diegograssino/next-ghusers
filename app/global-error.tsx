"use client";

import { PageMessage } from "@/features/shared/ui";

export default function GlobalError() {
  return (
    <html>
      <body>
        <PageMessage message="error" />
      </body>
    </html>
  );
}
