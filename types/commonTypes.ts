import { ChangeEvent } from "react";

export interface IFuck {
    title: string,
    text: string,
    id: number
}

export interface IFucks {
    fucks: IFuck[]
}

export interface ICardProps {
    showNotice: () => void,
    href: string,
    as: string,
    to: string,
    from: string,
    cardData: IFuck,
    type: string
}

export interface IFuckingControlsProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onNewView: (text: string) => void,
    currentView: string
}