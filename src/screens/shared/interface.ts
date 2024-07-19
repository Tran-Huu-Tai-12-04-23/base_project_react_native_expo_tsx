import { ComponentType } from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { NavigationProp } from '@react-navigation/native'

export type IComponentType = ComponentType<any>;

export interface IScreenProps {
    navigation?: NavigationProp<any>,
    route?: {
        name?: string,
        params?: any
    }
}

export interface IScreenStack {
    component: IComponentType,
    options?: StackNavigationOptions
}
export interface IStackRouter {
    [key: string]: IScreenStack | IComponentType
}


