// export const API_URL: string = 'http://180.150.67.104:5000';
export const API_URL: string = 'http://127.0.0.1:5000';

export const OPTIONS = {
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
    mode: 'cors'
};

export function JSONToUrlEncoded(object): any {
    let data: URLSearchParams = new URLSearchParams();
    for (let key in object) {
        data.set(key, object[key]);
    }
    return data.toString();
}
