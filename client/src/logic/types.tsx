import { ReactChild, ReactChildren } from 'react';

type Children = ReactChild | ReactChildren | Array<ReactChild>;

type Mode = 'light' | 'dark' | undefined;

type Input =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

interface UserObject {
    _id: string;
    email: string;
    publicName: string;
    darkMode: boolean | undefined;
}
type User = UserObject | undefined | null;
interface UserData {
    objectId: string;
    email: string;
    publicName: string;
    darkMode: boolean | undefined;
}

interface Auth {
    username: string;
    password: string;
    team: string;
    email: string;
}

interface Login {
    email: string,
    password: string,
}

interface State {
    user: User | null;
    whoamiRequestDone: boolean;
    mode: Mode;
    notifications?: Array<Notification>;
    data?: StateData;
}

type StateDataFunc = () => StateData;

interface Dimension {
    key: string;
    text: string;
}
interface Measure {
    value: number | string;
    unit?: string;
}
interface StateDataItem {
    country: Dimension;
    division: Dimension;
    month: Dimension;
    year: Dimension;
    qty: Measure;
    sales: Measure;
};

type StateData = Array<StateDataItem>;


type DrawerVariant = 'persistent' | 'temporary';
interface Drawer {
    variant: DrawerVariant;
}

interface Action {
    name: string;
    path: string;
}
interface Jumbotron {
    img?: string;
    title: string;
    subtitle: string;
    actions?: Array<Action>;
    onClick?: any;
}

interface Notification {
    id: string;
    message: string;
}

interface NotificationProps {
    notifications: Array<Notification>;
    onNotificationShown: any;
    addNotification: any;
}

export type {
    Children,
    Auth,
    Login,
    User,
    UserData,
    Mode,
    DrawerVariant,
    Drawer,
    Action, 
    Jumbotron,
    Input,
    Dimension,
    Measure,
    StateDataItem,
    StateData,
    State,
    Notification,
    NotificationProps,
}