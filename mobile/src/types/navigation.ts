import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { FormField } from "./FormField";

export type RootStackParamList = {
  Login: undefined; 
  Register: undefined;
  MainTabs: undefined;
  AddVehicle: { userId: string };
  VehicleList: undefined;
  AddExpense: { vehicleId: string };
  History: { vehicleId: string };
  Profile: { userId: string };
  FormScreen: { type: string; fields: FormField[] }; 
};

// 👇 Tipo para usar com useNavigation
export type RootStackNavigationProp<
  T extends keyof RootStackParamList
> = NativeStackNavigationProp<RootStackParamList, T>;

// 👇 Tipo para usar com props em telas
export type RootStackScreenProps<
  Screen extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, Screen>;

// 👇 Tipo para usar com useRoute
export type RootStackRouteProp<
  Screen extends keyof RootStackParamList
> = RouteProp<RootStackParamList, Screen>;
