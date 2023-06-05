import { request } from "./axios"

export const services = {
    getAll: (slug) => {
        return request.get(slug)
    },
    getOne: (slug, id) => {
        return request.get(slug+"/"+id)
    },
    addNew: (slug, newObj) => {
        return request.post(slug, newObj)
    },
    delete: (slug, id) => {
        return request.delete(slug+"/"+id)
    },
    update: (slug, id, newObj) => {
        return request.put(slug + "/" + id, newObj)
    }
}