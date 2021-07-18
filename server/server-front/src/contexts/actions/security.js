export function login(user, pass) {
    return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({username: user, password: pass}),
    })
        .then(res => {
            if (res.status === 200)
                return res.json()
            return null;
        })
        .then(data => {
            return data === null ? data : data.token;
        })
        .catch(function (e) {
            console.log("error");
        });
    ;
}
