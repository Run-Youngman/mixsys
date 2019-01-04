const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Origin', 'http://localhost:3000'); // 定义请求的ip和端口

const init = {
    headers: headers,
    mode: 'cors', // 支持跨域请求，未成为标准之前，请求不同域名的后端api会被同源策略阻止
    cache: 'default' // 缓存，这里使用默认
}
/*
url:传入访问的后续url
method:访问网络的方式，get或者post
successAction:这个是访问网络成功后回调的redux函数
*/
export const createAsyncAction = (url, method, successAction) => {
    method = method.toUpperCase();
    return (
        (pathnames = {}, data = {}) => {
            return (dispatch) => {
                let params = {
                    headers: headers,
                    mode: 'cors',
                    cache: 'default',
                    method
                }
                let u = encodeURI(getUrl(url, pathnames));
                if ((method === 'POST' || method === 'PUT') && Object.keys(data.length !== 0)) {
                    params.body = JSON.stringify(data);
                }
                if(method === 'GET') {

                }
                return fetch(u,params).then(rst => {
                    const contentType = rst.headers.get('content-type');
                    if(contentType && contentType.indexOf('application/json') !== -1){
                        return rst.json();
                    } else {
                        return rst.text();
                    }
                }).catch(err => {
                    return null
                }).then(result => {
                    if (!result) {
                        throw new Error(method + ' ' + url + ' fail');
                    }
                    successAction && dispatch(successAction(result));
                    return result;
                })
            }
        }
    )
}

const getUrl = (template, pathnames = {}) => {
    return template.replace(/\{\{(\w+)}}/g, (literal, key) => {
        if (key in pathnames) {
            return pathnames[key];
        } else {
            return '';
        }
    });
};