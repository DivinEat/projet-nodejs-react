export function fetch_api(input, method, body, tryLogin) {
    const init = {
        method: method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt_token")}`
        },
    };

    if (body != null)
        init.body = JSON.stringify(body);

    return fetch(`http://localhost:3001/${input}`,init).then((res) => {
        if (res.status === 401) {
            if (tryLogin) {
                return res;
            }
            return login().then(() => fetch_api(input, method, body, true));
        }
        return res;
    })
    .catch(function (e) {
        console.log(e);
    });
}

export function login() {
    // TODO: get en base (dans un fichier)
    const clientId = 'test2@test.fr';
    const clientSecret = 'test';

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
                return;
            }
            localStorage.setItem('jwt_token', data.token);
        })
        .catch(function (e) {
            console.log(e);
        });
    ;
}