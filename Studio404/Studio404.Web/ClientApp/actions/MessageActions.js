import { Message } from "./ActionCreators";

export const show = (text) => Message.show(text);

export const hide = () => Message.hide();