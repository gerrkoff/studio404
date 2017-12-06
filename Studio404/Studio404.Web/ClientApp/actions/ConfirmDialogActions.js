import { ConfirmDialog } from "./ActionCreators";

export const show = (text, actionText, action) => ConfirmDialog.show(text, actionText, action);

export const hide = () => ConfirmDialog.hide();