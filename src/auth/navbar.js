const headerMappings = {
    "UNAUTHORIZED": {
        "shop": {
            "Каталог товаров": "/catalogue",
            "Категории товаров": "/categories",
            "Производители": "/manufacturers"
        }
    },
    "ROLE_CLIENT": {
        "shop": {
            "Мои заказы": "/orders",
        }
    },
    "ROLE_DRIVER": {
        "management": {
            "Текущие доставки": "/currentDeliveries",
            "Предстоящие доставки": "/nextDeliveries",
        }
    },
    "ROLE_WORKER": {
        "management": {
            "Заказы": "/warehouseOrders",
            "Товары": "/warehouseProducts",
            "Доставки": "/warehouseDeliveries"
        }
    },
    "ROLE_OWNER": {
        "management": {
            "Управление складами": "/warehouses",
            "Управление сотрудниками": "/warehouseWorkers"
        }
    },
    "ROLE_SUPPORT": {
        "Заявки на товары": "/productRequests",
        "Заявки на организации": "/organizationRequests",
        "Заявки на склады": "/warehousesRequests"
    }
}

function getA() {
    return a
}