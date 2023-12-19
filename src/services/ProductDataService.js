import http from "../http-common";

class ProductDataService {
    get(id) {
        return http.get(`/product/rest/api/v1/product/${id}`);
    }

    getImageLink(productId) {
        return http.get(`/product/rest/api/v1/product/${productId}/image`);
    }

    getPage(page, size) {
        return http.get(`/product/rest/api/v1/product?page=${page}&size=${size}`);
    }

    getBySearchQuery(page, size, query) {
        console.log(query)
        return http.get(`/product/rest/api/v1/product/search?page=${page}&size=${size}&query=${query}`);
    }

    create(product) {
        return http.post(`/product/rest/api/v1/product`, product);
    }

    edit(product, id) {
        return http.put(`/product/rest/api/v1/product/${id}`, product)
    }

    delete(id) {
        return http.delete(`/product/rest/api/v1/product/${id}`)
    }

    addImage(id, formData) {
        return http.put(`/product/rest/api/v1/product/${id}/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }}
        );
    }
}

export default new ProductDataService()