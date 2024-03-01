import logapiAxios from "../axios/http-common";

class ProductCategoryService {
    get(categoryName) {
        return logapiAxios.get(`/product/rest/api/v1/product/category/${categoryName}`);
    }

    getPage(page, size) {
        return logapiAxios.get(`/product/rest/api/v1/product/category?page=${page}&size=${size}`);
    }

    create(manufacturer) {
        return logapiAxios.post(`/product/rest/api/v1/product/category`, manufacturer);
    }

    edit(manufacturer, categoryName) {
        return logapiAxios.put(`/product/rest/api/v1/product/category/${categoryName}`, manufacturer)
    }

    delete(categoryName) {
        return logapiAxios.delete(`/product/rest/api/v1/product/category/${categoryName}`)
    }

}

export default new ProductCategoryService()