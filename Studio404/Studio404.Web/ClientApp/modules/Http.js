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
    if(exception && (exception.Message || exception.message))
    {
        console.error(exception);
        return Message.show(exception.Message ? exception.Message : exception.message);
    }
    else {
        return Message.show(`Error: ${data.status} | ${data.statusText}`);
    }
}

export { Http, errorHandler };