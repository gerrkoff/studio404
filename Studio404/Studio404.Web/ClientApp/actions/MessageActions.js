const Message = {
    show: (text) => {
        return {
            type: "MESSAGE_SHOW",
            text
        }
    },

    hide: () => {
        return {
            type: "MESSAGE_HIDE"
        }
    },
}

export const show = (text) => Message.show(text);

export const showDefaultError = () => Message.show("Something went wrong...");

export const hide = () => Message.hide();