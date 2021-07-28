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

    return fetch(`http://localhost:3001/${input}`, init)
        .then((res) => {
            if (res.status === 401) {
                localStorage.removeItem('jwt_token');
            }
            return res;
        })
        .catch(function (e) {
            console.log(e);
        });
}

export function login(user, pass) {
    console.log('login');
    return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({username: user, password: pass}),
    })
        .then(res => {
            if (res.status === 200)
                return res.json();
            return null;
        })
        .catch(function (e) {
            console.log(e);
        });
    ;
}
