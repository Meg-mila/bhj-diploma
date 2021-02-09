'use strict';
/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL='';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    return createRequest({
      data,
      url: this.URL,
      method: "GET",
      responseType: "json",
      callback,
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    return createRequest({
      url: this.URL,
      data,
      responseType: 'json',
      method: 'PUT',
      callback
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    const formData = new FormData();
    formData.append('id', data);

    createRequest({
      url: this.URL,
      method: 'DELETE',
      responseType: 'json',
      data: formData,
      callback: (err, response) => {
        callback(err, response);
      }
    });
  }
}
