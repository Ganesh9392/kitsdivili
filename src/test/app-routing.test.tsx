import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { createAdmissionEmail } from "@/lib/admissions";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("prepares an admissions email without claiming it was delivered", () => {
    expect(
      createAdmissionEmail({
        name: "Ananya Rao",
        phone: "+91 90000 12345",
        programme: "B.Tech — Civil Engineering",
        message: "Please share admission details.",
      }),
    ).toBe(
      "mailto:kitsenggcollege@gmail.com?subject=Admission%20enquiry%20%E2%80%94%20B.Tech%20%E2%80%94%20Civil%20Engineering&body=Name%3A%20Ananya%20Rao%0APhone%3A%20%2B91%2090000%2012345%0AProgramme%3A%20B.Tech%20%E2%80%94%20Civil%20Engineering%0A%0APlease%20share%20admission%20details.",
    );
  });
});
