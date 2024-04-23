const headerMappings = {
    "UNAUTHORIZED": {
        "shop": {
            "Каталог": "/catalogue",
            "Категории товаров": "/categories",
            "Производители": "/manufacturers"
        }
    },
    "ROLE_CLIENT": {
        "shop": {
            "Каталог": "/catalogue",
            "Категории товаров": "/categories",
            "Производители": "/manufacturers",
            "Мои заказы": "/orders",
            "Мои организации": "/client/organizations"
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
            "Организации": "/management/organizations",
            "Склады": "/management/warehouse",
        }
    },
    "ROLE_SUPPORT": {
        "management": {
            "Заявки на товары": "/productRequests",
            "Заявки на организации": "/organizationRequests",
            "Заявки на склады": "/warehousesRequests"
        }
    },
    "ROLE_ADMIN": {
        "management": {
            "Панель администратора": "/admin"
        }
    }
}

export function getAllNavItems(roles) {
    let items = {}
    let links = {};

    for (let role in roles) {
        links = headerMappings[roles[role]]
        if ('shop' in items) {
            items.shop = {...items.shop, ...links.shop}
        } else items.shop = links.shop;
        if ('management' in items) {
            items.management = {...items.management, ...links.management}
        } else items.management = links.management
    }

    return items
}