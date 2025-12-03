export interface Route {
  title: string;
  href: string;
  offset?: {
    mobile?: number;
    desktop?: number;
  };
}

export const routes: Route[] = [
  {
    title: "Work",
    href: "#work",
    offset: { mobile: -110, desktop: -100 },
  },
  {
    title: "Abilities",
    href: "#abilities",
    offset: { mobile: -80, desktop: 0 },
  },
  {
    title: "Growth",
    href: "#growth",
    offset: { mobile: -115, desktop: -140 },
  },
  {
    title: "Contact",
    href: "#contact",
    offset: { mobile: 0, desktop: 0 },
  },
];
