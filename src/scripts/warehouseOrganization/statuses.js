const orderStatusMappings = {
    "NEW": {
        name: "NEW",
        screenName: "Заявка на рассмотрении",
        style: 'badge-primary'
    },
    "APPROVED": {
        name: "APPROVED",
        screenName: "Одобрено",
        style: 'badge-success'
    },
    "REJECTED": {
        name: "REJECTED",
        screenName: "Отклонено",
        style: 'badge-danger'
    },
    "CLOSED": {
        name: "CLOSED",
        screenName: "Закрыто",
        style: 'badge-warning'
    }
}

export function mapOrganizationStatus(status) {
    return orderStatusMappings[status]
}
