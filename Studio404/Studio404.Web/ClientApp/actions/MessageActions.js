import Labels from '../modules/Labels'

const Message = {
    show: (text) => {
        return {
            type: 'MESSAGE_SHOW',
            text
        }
    },

    hide: () => {
        return {
            type: 'MESSAGE_HIDE'
        }
    },

    showAction: (text, actionText, actionClick) => {
        return {
            type: 'MESSAGE_SHOW_ACTION',
            text,
            actionText,
            actionClick
        }
    }
}

export const show = (text) => Message.show(text)

export const showDefaultError = () => Message.show(Labels.defaultError)

export const hide = () => Message.hide()

export const showAction = (text, actionText, actionClick) => Message.showAction(text, actionText, actionClick)
