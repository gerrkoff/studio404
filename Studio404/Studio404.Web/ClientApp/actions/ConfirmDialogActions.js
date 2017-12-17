const ConfirmDialog = {
    show: (text, actionText, action) => {
        return {
            type: 'CONFIRM_SHOW',
            text,
            actionText,
            action
        }
    },

    hide: () => {
        return {
            type: 'CONFIRM_HIDE'
        }
    }
}

export const show = (text, actionText, action) => ConfirmDialog.show(text, actionText, action)

export const hide = () => ConfirmDialog.hide()
