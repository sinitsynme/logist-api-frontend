import logapiAxios from "../axios/http-common";

class ProductDataService {
    get(id) {
        return logapiAxios.get(`/product/rest/api/v1/product/${id}`);
    }

    getImageLink(productId) {
        return logapiAxios.get(`/product/rest/api/v1/product/${productId}/image`);
    }

    getPage(page, size) {
        return logapiAxios.get(`/product/rest/api/v1/product?page=${page}&size=${size}`);
    }

    getBySearchQuery(page, size, query) {
        console.log(query)
        return logapiAxios.get(`/product/rest/api/v1/product/search?page=${page}&size=${size}&query=${query}`);
    }

    create(product) {
        return logapiAxios.post(`/product/rest/api/v1/product`, product);
    }

    edit(product, id) {
        return logapiAxios.put(`/product/rest/api/v1/product/${id}`, product)
    }

    delete(id) {
        return logapiAxios.delete(`/product/rest/api/v1/product/${id}`)
    }

    addImage(id, formData) {
        return logapiAxios.put(`/product/rest/api/v1/product/${id}/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }}
        );
    }
}

export default new ProductDataService()