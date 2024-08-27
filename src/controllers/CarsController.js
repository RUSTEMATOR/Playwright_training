
export default class CarsController {

    #CREATE_CAR_PATH = '/api/cars'
    #GET_CARS_PATH = '/api/cars'
    #DELETE_CAR_PATH = (id) => `/api/cars/${id}`
    #GET_CAR_BRANDS_PATH = '/api/cars/brands'
    #GET_CAR_BRANDS_PATH_ID = (id) => `/api/cars/brands/${id}`
    #GET_CAR_MODELS_PATH = '/api/cars/models'
    #GET_CAR_MODELS_PATH_ID = (id) => `/api/cars/models/${id}`
    #GET_CURRENT_CAR_PATH_ID = (id) => `/api/cars/${id}`
    #EDIT_CURRENT_CAR_PATH_ID = `/api/cars/`        

    constructor(request) {
        this._request = request
    } 

    async getCarBrands() {
        console.log('All car brands:')
        return this._request.get(this.#GET_CAR_BRANDS_PATH)
    }

    async getBrandById(id) {
        console.log(`Getting car by ID: ${id}`)
        return this._request.get(this.#GET_CAR_BRANDS_PATH_ID(id))
    }

    async getCurrentCarById(id){
        console.log(`Getting current car by ID: ${id}`)
        return this._request.get(this.#GET_CURRENT_CAR_PATH_ID(id))
    }

    async getCarModels() {
        console.log('All car models:')
        return this._request.get(this.#GET_CAR_MODELS_PATH)
    }

    async getModelsById(id){
        console.log(`Getting car models by ID: ${id}`)
        return this._request.get(this.#GET_CAR_MODELS_PATH_ID(id))
    }

    async createCar(requestBody) {
        console.log('Creating new car:', requestBody)  
        return this._request.post(this.#CREATE_CAR_PATH, {
            data: requestBody
        })
    }

    async getCars(){
        console.log('All user cars:')
        return this._request.get(this.#GET_CARS_PATH)
    }

    async deleteCar(id) {
        console.log(`Deleting car:, ${id}`)
        return this._request.delete(this.#DELETE_CAR_PATH(id))
    }

    async editCar(id, changeBody) {
        console.log(`Editing car:, ${id}`)
        return this._request.put(`${this.#EDIT_CURRENT_CAR_PATH_ID}/${id}`, {
            data: changeBody
        })
    }
}