import { DefaultMantineColor } from "@mantine/core";
import { IconEdit, IconHome, IconList, IconLogin, IconTournament, IconTrophy, IconUserPlus, TablerIcon } from "@tabler/icons";

export interface NavbarLink {
  id: "home" | "competitions" | "login" | "register" | "logout" | "my-participations" | "leagues" | "my-leagues";
  label: string;
  to: string;
  Icon: TablerIcon;
  color?: DefaultMantineColor;
}

export const navigationLinks: Array<NavbarLink> = [
  { id: "competitions", label: "Competiciones", to: '/competitions', Icon: IconTrophy },
  { id: "leagues", label: "Ligas", to: '/leagues', Icon: IconList },
]

export const navbarLinks: Array<NavbarLink> = [
  { id: "home", label: "Prode", to: '/', Icon: IconHome },
  ...navigationLinks,
]

export const drawerLinks: Array<NavbarLink> = [
  ...navbarLinks,
]

export const notLoggedInLinks: Array<NavbarLink> = [
  { id: "login", label: "Iniciar sesión", to: '/login', Icon: IconLogin },
  { id: "register", label: "Registrarse", to: '/register', Icon: IconUserPlus },
]

export const loggedInLinks: Array<NavbarLink> = [
  { id: "my-participations", label: "Mis Participaciones", to: '/my-participations', Icon: IconTournament },
  { id: "my-leagues", label: "Mis Ligas", to: '/my-leagues', Icon: IconEdit },
]

export const logoutLink: NavbarLink =
  { id: "logout", label: "Cerrar sesión", to: '#', Icon: IconLogin, color: "red" }
