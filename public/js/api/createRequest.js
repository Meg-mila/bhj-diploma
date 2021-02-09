'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.withCredentials = true;

    if (options.method === "GET") {
        options.url += "?";
        for (let key in options.data) {
            options.url += `${key}=${options.data[key]}&`;
        }
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }

    try {
        xhr.open(options.method, options.url);
        xhr.send(formData);
    } catch (e) {
        options.callback(e, xhr.response);
    }

    xhr.addEventListener("readystatechange", () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            options.callback(JSON.parse(xhr.response).success, JSON.parse(xhr.response));
        }
    });
};
