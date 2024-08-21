import { DrawerMenu } from "@/components/drawer-menu";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false, // Ensure no header is shown for the drawer
        drawerPosition: "right", // Keep the drawer on the right side
        drawerStyle: {
          width: 320, // Adjust the drawer width
        },
      }}
      drawerContent={DrawerMenu}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false, // Ensure no header is shown for the tabs
        }}
      />
      {/* You can add other screens here, ensuring that headerShown is handled appropriately */}
    </Drawer>
  );
}
