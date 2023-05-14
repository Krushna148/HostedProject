import { BaseAPIGET, BaseAPIPOST } from "shared/BaseConfig"

export const addFedback = (reqObj) => {
    return new Promise((resolve, reject) => {
        const url = "addFeedback"
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}


export const getFeedbackByTravel = (travelId) => {
    return new Promise((resolve, reject) => {
        const url = `getFeedbackByTravel?travelId=${travelId}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getFeedbackByUser = (userId) => {
    return new Promise((resolve, reject) => {
        const url = `getFeedbackByUser?userId=${userId}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getFeedbackByBooking = (bookingId) => {
    return new Promise((resolve, reject) => {
        const url = `getFeedbackByBooking?bookingId=${bookingId}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}
