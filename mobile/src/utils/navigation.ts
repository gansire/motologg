import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// 🔹 Tipagem que entende quando params são opcionais ou obrigatórios
export function navigate<RouteName extends keyof RootStackParamList>(
  ...args: undefined extends RootStackParamList[RouteName]
    ? [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  if (navigationRef.isReady()) {
    // TS não consegue inferir perfeitamente -> forçamos aqui
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigationRef.navigate(...args);
  }
}

// 🔹 Reset helper (útil para logout/login)
export function reset<RouteName extends keyof RootStackParamList>(
  route: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: route, params }],
    });
  }
}
