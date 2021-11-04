import { ChangeEvent } from "react";

export interface IFuck {
    title: string,
    text: string
}

export interface IFucks {
    fucks: IFuck[]
}

export interface ICardProps {
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