/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require("axios");

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.parseJwt = function (token) {
    try {
        const base64HeaderUrl = token.split(".")[0];
        const base64Header = base64HeaderUrl
            .replace("-", "+")
            .replace("_", "/");
        const headerData = JSON.parse(window.atob(base64Header));

        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const dataJWT = JSON.parse(window.atob(base64));
        dataJWT.header = headerData;

        return dataJWT;
    } catch (err) {
        return false;
    }
}

window.downloadFile = function (url, name = "") {

    if(!name) {
        name = url.substring(url.lastIndexOf('/') + 1);
    }

    axios({
        url,
        method: "GET",
        responseType: "blob"
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        link.click();
    });
}