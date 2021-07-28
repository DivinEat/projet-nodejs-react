export function fetch_api(input, method, body) {
    const init = {
        method: method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt_token")}`
        },
    };

    if (body != null)
        init.body = JSON.stringify(body);
    

    return fetch(`http://localhost:3001/${input}`, init).then((res) => {
        return res;
    })
        .catch(function (e) {
            console.log(e);
        });
}

export function login(clientId, clientSecret) {
    return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({clientId: clientId, clientSecret: clientSecret}),
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data == null) {
                localStorage.removeItem('jwt_token');
                return null;
            }
            return data.token;
        })
        .catch(function (e) {
            console.log(e);
        });
    ;
}