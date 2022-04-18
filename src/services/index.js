export const serverUrl = "https://api.reuniones.fundapap.org/api/v1/";
//export const serverUrl = "http://localhost:8000/api/v1/";

export const login = async (email, password, callback) => {
    let url = serverUrl + "user/login";

    const data = {
        email,
        password
    }

    const fetchData = {
        method: "POST",
        body: getFormData(data)
    }

    return await fetch( url, fetchData
        ).then(response => {
            return response.json()
        }).then((data) => {
            callback(data);
        }).catch(error => console.log(error));
}

export const signin = async (firstname, lastname, email, password, phone_number, country, callback) => {
    let url = serverUrl + "user/signin";

    const data = {
        firstname,
        lastname,
        email,
        password,
        phone_number,
        country
    }

    const fetchData = {
        method: "POST",
        body: getFormData(data)
    }

    return await fetch( url, fetchData
    ).then(response => {
        return response.json()
    }).then((data) => {
        callback(data);
    }).catch(error => console.log(error));
}

export const logout = async (api_token, callback) => {
    let url = serverUrl + "user/logout";

    const fetchData = {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + api_token,
        },
    }

    return await fetch( url, fetchData
    ).then(response => {
        return response.json()
    }).then((data) => {
        callback(data);
    }).catch(error => console.log(error));
}

export const meetingHistory = async (api_token, callback) => {
    let url = serverUrl + "user/meetingshistory";

    const fetchData = {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + api_token,
        },
    }

    return await fetch( url, fetchData
    ).then(response => {
        return response.json()
    }).then((data) => {
        callback(data);
    }).catch(error => console.log(error));
}

export const nextMeetings = async (api_token, callback) => {
    let url = serverUrl + "meeting/nextmeetings";

    const fetchData = {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + api_token,
        },
    }

    return await fetch( url, fetchData
    ).then(response => {
        return response.json()
    }).then((data) => {
        callback(data);
    }).catch(error => console.log(error));
}

export const getMeeting = async (api_token, id, callback) => {
    let url = serverUrl + "/meeting/" + id;

    const fetchData = {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + api_token,
        },
    }

    return await fetch( url, fetchData
    ).then(response => {
        return response.json()
    }).then((data) => {
        callback(data);
    }).catch(error => console.log(error));
}

const getFormData = (object) => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());