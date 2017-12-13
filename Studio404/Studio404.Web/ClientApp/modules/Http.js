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

const tokenKey = "accessToken";
const saveToken = (token) => sessionStorage.setItem(tokenKey, token);
const loadToken = () => sessionStorage.getItem(tokenKey);

$.ajaxSetup({
    beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + loadToken());
    }
});

const Http = {

     Get: (url, params) => {
         return $.get(url, params);
     },

     Post: (url, data) => {
        return $.post(url, data);
    },

    FormSubmit: (url, form) => {
        let formHtml = `<form method="POST" action="${url}">`;
        form.forEach(input => {
            formHtml += `<input type="hidden" name="${input.name}" value="${input.value}" />`;
        });
        formHtml += "</form>";

        $(formHtml).appendTo(document.body).submit();
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

export { Http, errorHandler, saveToken };