export async function transformRequest<T = any>(promise: T) {
    return Promise.all([promise]).then(([response]: any) => {
        const isOk = response.status === "OK";
        if (isOk) {
            return [null, response || response];
        } else {
            return [response, null];
        }
    });
}
