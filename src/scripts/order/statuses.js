const orderStatusMappings = {
    "NEW": {
        name: "NEW",
        screenName: "Оформлен",
        style: 'badge-primary'
    },
    "IN_PROGRESS": {
        name: "IN_PROGRESS",
        screenName: "Взят в работу",
        style: 'badge-primary'
    },
    "READY_TO_DELIVER": {
        name: "READY_TO_DELIVER",
        screenName: "Готов к доставке",
        style: 'badge-primary'
    },
    "DELIVERY": {
        name: "DELIVERY",
        screenName: "В доставке",
        style: 'badge-primary'
    },
    "DONE": {
        name: "DONE",
        screenName: "Завершен",
        style: 'badge-success'
    },
    "REJECTED": {
        name: "REJECTED",
        screenName: "Отклонен",
        style: 'badge-danger'
    },
    "RETURNED": {
        name: "RETURNED",
        screenName: "Возврат",
        style: 'badge-warning'
    },
    "PARTIALLY_RETURNED": {
        name: "PARTIALLY_RETURNED",
        screenName: "Частичный возврат",
        style: 'badge-warning'
    },
    "ABORTED": {
        name: "ABORTED",
        screenName: "Отказ",
        style: 'badge-danger'
    }
}

const orderPaymentStatusMappings = {
    "PENDING_PAYMENT": {
        name: "PENDING_PAYMENT",
        screenName: "Ожидает оплаты",
        style: 'badge-primary'
    },
    "PAID": {
        name: "PAID",
        screenName: "Оплачен",
        style: 'badge-success'
    },
    "PARTIALLY_REFUNDED": {
        name: "PARTIALLY_REFUNDED",
        screenName: "Частичный возврат средств",
        style: 'badge-warning'
    },
    "REFUNDED": {
        name: "REFUNDED",
        screenName: "Полный возврат средств",
        style: 'badge-warning'
    },
}

const orderPaymentTypeMappings = {
    "CASH": "Наличные",
    "NON_CASH": "Безналичные"
}

export function mapOrderStatus(status) {
    return orderStatusMappings[status]
}

export function mapPaymentStatus(status) {
    return orderPaymentStatusMappings[status]
}

export function mapPaymentType(type) {
    return orderPaymentTypeMappings[type]
}