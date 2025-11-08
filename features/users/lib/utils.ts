import { log } from "@/features/shared/lib/logger";

export function handleFetchError(error: unknown, context: string): never {
  if (error instanceof Error) {
    log.error("Server error occurred", {
      context,
      errorName: error.name,
      message: error.message,
      stack: error.stack,
    });
  } else {
    log.error("Server error occurred", { context, error });
  }
  throw new Error("Server error occurred");
}

export function parseNext(linkHeader: string): string | null {
  if (!linkHeader) return null;
  const links = linkHeader.split(",");

  for (const link of links) {
    const [urlPart, relPart] = link.split(";");
    const urlMatch = urlPart.match(/<([^>]+)>/);
    const relMatch = relPart?.match(/rel="([^"]+)"/);

    if (relMatch?.[1] === "next") {
      return urlMatch?.[1] ?? null;
    }
  }

  return null;
}

export function extractSince(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get("since");
  } catch {
    return null;
  }
}

export const getClientFetchOptions = (): RequestInit => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  return {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "GitHub-Users-App",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    // TODO Add timeout to envs or constants file
    signal: AbortSignal.timeout(10000),
  };
};

export const getServerFetchOptions = (): RequestInit => {
  const token = process.env.GITHUB_TOKEN;
  return {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "GitHub-Users-App",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    // TODO Add timeout to envs or constants file
    signal: AbortSignal.timeout(10000),
  };
};
