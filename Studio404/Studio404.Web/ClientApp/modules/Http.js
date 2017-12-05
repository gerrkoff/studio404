import $ from "jQuery";
import NProgress from "react-nprogress";
import { Message } from "../actions/ActionCreators";

NProgress.configure({ showSpinner: false });

$(document).ajaxStart(function() {
    NProgress.start();
});

$(document).ajaxStop(function() {
    NProgress.done();
});

const Http = {

     Get: (url, params) => {
         return $.get(url, params);
     },

     Post: (url, data) => {
        return $.post(url, data);
    }
}

const errorHandler = (data) => {
    let exception = data.responseJSON;
    console.log(exception);
    return Message.show(exception.Message);
}

export { Http, errorHandler };