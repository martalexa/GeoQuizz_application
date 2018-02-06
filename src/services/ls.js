import localStorage from 'local-storage'

export default {
    get(key, defaultValue = null) {
        return localStorage(key) || defaultVal
    },

    set(key, value) {
        return localStorage(key, value)
    },

    remove(key) {
        return localStorage.remove(key)
    }
}