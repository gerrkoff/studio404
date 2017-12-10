import $ from "jQuery";
import NProgress from "react-nprogress";
import { show } from "../actions/MessageActions";
import Labels from "./Labels";

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
        return show(exception.Message ? exception.Message : exception.message);
    }
    else {
        return show(Labels.error(data.status, data.statusText));
    }
}

export { Http, errorHandler };