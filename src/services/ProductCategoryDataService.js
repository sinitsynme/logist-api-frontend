import http from "../http-common";

class ProductCategoryService {
    get(categoryName) {
        return http.get(`/product/rest/api/v1/product/category/${categoryName}`);
    }

    getPage(page, size) {
        return http.get(`/product/rest/api/v1/product/category?page=${page}&size=${size}`);
    }

    create(manufacturer) {
        return http.post(`/product/rest/api/v1/product/category`, manufacturer);
    }

    edit(manufacturer, categoryName) {
        return http.put(`/product/rest/api/v1/product/category/${categoryName}`, manufacturer)
    }

    delete(categoryName) {
        return http.delete(`/product/rest/api/v1/product/category/${categoryName}`)
    }

}

export default new ProductCategoryService()