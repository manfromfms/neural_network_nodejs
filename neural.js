module.exports = class Neural {
    constructor(arr, activation, derivation, k) {
        this.activation = activation
        this.derivation = derivation

        this.k = k

        this.WeightLayer = require('./weightLayer.js')

        this.weights = []

        for(let i = 0; i < arr.length - 1; i++) {
            this.weights.push(new this.WeightLayer(arr[i], arr[i+1], this.activation, this.derivation, k))
        }

        //console.log(this.weights)
    }

    train(data) {
        for(let i = 0; i < data.length; i++) {
            this.forWards(data[i].input)
            this.weights[this.weights.length - 1].calcError(data[i].output)
            this.findError()
            this.backWards()
        }
    }

    saveToFile(path) {
        var result = []
        for(let i in this.weights) {
            result.push(this.weights[i].weights)
        }
        require('fs').writeFileSync(path, JSON.stringify(result), () => {})
    }

    forWards(data) {
        //if(this.weights[0].inputLayer.length != data.length) return -1

        this.weights[0].inputLayer = data

        for(let i = 0; i < this.weights.length - 1; i++) {
            this.weights[i+1].inputLayer = this.weights[i].forWards()
        }

        return this.weights[this.weights.length - 1].forWards()
    }

    findError() {
        for(let i = this.weights.length - 1; i > 0; i--) {
            this.weights[i-1].outputError = this.weights[i].findError()
        }

        return this.weights[0].findError()
    }

    backWards() {
        for(let i = 0; i < this.weights.length; i++) {
            this.weights[i].backWards()
        }
    }
}