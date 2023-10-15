import { adminLinks, drawerLinks, loggedInLinks, logoutLink, notLoggedInLinks } from "@/helpers/links";
import { Drawer, DrawerStylesNames, Flex, Stack, Styles, Text } from "@mantine/core";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Avatar } from "./Avatar";
import { DrawerLink } from "./DrawerLink";
import { BACKEND_URL } from "@/helpers/constants";

interface Props {
  opened: boolean;
  onClose: () => void;
  onLinkClick: () => void;
}

const drawerStyles: Styles<DrawerStylesNames, Record<string, any>> = (theme) => ({
  drawer: {
    backgroundColor: theme.colors.yellow[2],
    borderRadius: theme.radius.lg,
    margin: theme.spacing.lg,
    boxShadow: '8px 8px black',
  },
})

export function NavigationDrawer(props: Props) {

  const isAuth = useIsAuthenticated()
  const logout = useSignOut()
  const auth = useAuthUser()
  const username = auth()?.user.username || 'visitante'
  const avatar = auth()?.user.avatar || null
  const isStaff = auth()?.user.is_staff || false

  function handleLogout() {
    logout()
    props.onLinkClick()
  }

  return (
    <Drawer
      styles={drawerStyles}
      padding="md"
      withCloseButton={false}
      opened={props.opened}
      onClose={props.onClose}
    >
      <Stack>
        <Flex justify="center">
          <Avatar
            withPlaceholder
            src={`${BACKEND_URL}${avatar}`}
            width={100}
            height={100}
            radius={50}
          />
        </Flex>
        <Text align="center">
          Hola, <Text span fw="bold">{username}</Text>! 👋
        </Text>
        {/* Navigation links */}
        {drawerLinks.map(link => (
          <DrawerLink key={link.id} color="blue" link={link} onClick={props.onLinkClick}/>
        ))}
        {/* Account links */}
        {!isAuth() && notLoggedInLinks.map(link => (
          <DrawerLink key={link.id} color="cyan" link={link} onClick={props.onLinkClick}/>
        ))}
        {/* Logged in links */}
        {isAuth() && loggedInLinks.map(link => (
          <DrawerLink key={link.id} color={link.color ?? "teal"} link={link} onClick={props.onLinkClick}/>
        ))}
        {/* Logged in links */}
        {isAuth() && isStaff && adminLinks.map(link => (
          <DrawerLink key={link.id} color="orange" link={link} onClick={props.onLinkClick}/>
        ))}
        {isAuth() && (
          <DrawerLink
            color={logoutLink.color}
            link={logoutLink}
            onClick={handleLogout}
          />
        )}
      </Stack>
    </Drawer>
  )
}
