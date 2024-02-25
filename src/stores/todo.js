import {defineStore} from "pinia"

export const useTodoStore = defineStore('todo', {
    state: () => (
        {count: 0, title: "cook noodles", done: false}
    )
})