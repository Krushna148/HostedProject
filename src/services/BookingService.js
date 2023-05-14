import { BaseAPIGET, BaseAPIPOST } from "shared/BaseConfig"

export const addBooking = (reqObj) => {
    return new Promise((resolve, reject) => {
        const url = "addBooking"
        const method = "POST"
        BaseAPIPOST(url, method, reqObj).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateBookingStatus = (travelId, bookingStatus, bookingDate) => {
    return new Promise((resolve, reject) => {
        const url = `updateBookingStatus?travelId=${travelId}&bookingStatus=${bookingStatus}&bookingDate=${bookingDate}`
        const method = "POST"
        BaseAPIPOST(url, method, {}).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getBookingDetailsByTravel = (travelId) => {
    return new Promise((resolve, reject) => {
        const url = `getBookingDetailsByTravel?travelId=${travelId}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getBookingDetailsByUser = (userId) => {
    return new Promise((resolve, reject) => {
        const url = `getBookingDetailsByUser?userId=${userId}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getBookingDetailsByAgency = (agencyId) => {
    return new Promise((resolve, reject) => {
        const url = `getBookingDetailsByAgency?agencyId=${agencyId}`
        const method = "GET"
        BaseAPIGET(url, method).then(res => {
            if (res.status === 200) resolve(res)
            else reject(res)
        }).catch(err => {
            reject(err)
        })
    })
}
