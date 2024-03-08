class AddressDataService {

    async getAddressData(lat, lon) {
        return fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`)
    }
}

export default new AddressDataService()