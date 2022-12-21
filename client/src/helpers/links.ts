interface NavbarLink {
  label: string;
  to: string;
}

export const navbarLinks: Array<NavbarLink> = [
  { label: "Home", to: '/'},
  { label: "Competiciones", to: '/competitions'},
]

export const drawerLinks: Array<NavbarLink> = [
  ...navbarLinks,
]
