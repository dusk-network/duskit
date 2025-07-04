/** @type {import("..").failureToRejection} */
const failureToRejection = (response) =>
  response.ok
    ? Promise.resolve(response)
    : Promise.reject(
        new Error(
          `HTTP Request failed with status ${response.status}: ${response.statusText}`,
          {
            cause: response,
          }
        )
      );

export default failureToRejection;
