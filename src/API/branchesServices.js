import { request } from "./axios"

export const branchesServices = {
    getAllBranches: (slug) => {
        return request.get(slug)
    }
}