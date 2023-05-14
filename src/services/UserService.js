import { BaseAPIGET, BaseAPIPOST } from "shared/BaseConfig"

export const createUser = (reqObj) => {
    return new Promise((resolve, reject) => {
        const url = "createUser"
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateUser = (reqObj) => {
    return new Promise((resolve, reject) => {
        const url = "updateUser"
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const login = (email, password, isAgency) => {
    return new Promise((resolve, reject) => {
        const url = `login?email=${email}&password=${password}&isAgency=${isAgency}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
        const url = `forgotPassword?email=${email}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}
