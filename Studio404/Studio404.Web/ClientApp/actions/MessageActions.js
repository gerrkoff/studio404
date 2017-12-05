import { Message } from "./ActionCreators";

export const show = (text) => Message.show(text);

export const showDefaultError = () => Message.show("Something went wrong...");

export const hide = () => Message.hide();