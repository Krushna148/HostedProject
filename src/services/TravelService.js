import { BaseAPIGET, BaseAPIPOST } from "shared/BaseConfig"

export const addTravels = (reqObj) => {
    return new Promise((resolve, reject) => {
        const url = "addTravel"
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateTravels = (reqObj) => {
    return new Promise((resolve, reject) => {
        const url = "updateTravel"
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getTravels = (travelId) => {
    return new Promise((resolve, reject) => {
        const url = `getTravel?travelId=${travelId}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getAllTravels = (userId) => {
    return new Promise((resolve, reject) => {
        const url = `getAllTravel?userId=${userId}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const deleteTravel = (travelId) => {
    return new Promise((resolve, reject) => {
        const url = `deleteTravel?travelId=${travelId}`
        const method = "DELETE"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

