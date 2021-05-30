import apisauce from 'apisauce'

const create = (baseURL = 'localhost:8001') => {

    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache',
            //'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjozLCJyb2xlIjowLCJyb2xlVHlwZSI6bnVsbH0sImlhdCI6MTYyMjEwNDYwNCwiZXhwIjoxNjIyMTkxMDA0fQ.lVa2s6ggYlxMR56cRlJRAKm3m2Y52J5tLESQry2oWDw'
        },
        timeout: 10000
    })

    const apiMultiPart = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'multipart/form-data'
        },
        timeout: 10000
    })
    const login = (data) => api.post('/user-management/login', data)
    return {
        login
    };
}

export default {
    create
}
