import $ from "jQuery";

const Http = {

     Get: (url, params) => {
         return $.get(url, params);
     },

     Post: (url, data) => {
        return $.post(url, data);
    }
}

export default Http;