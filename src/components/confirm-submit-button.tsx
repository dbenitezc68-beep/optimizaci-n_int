"use client";

import { Button } from "@/components/ui";

export function ConfirmSubmitButton({
  children,
  confirmMessage,
}: {
  children: React.ReactNode;
  confirmMessage: string;
}) {
  return (
    <Button
      type="submit"
      variant="danger"
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </Button>
  );
}
