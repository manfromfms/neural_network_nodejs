module.exports = class WeightLayer {
    constructor(input, output, activation, derivation, k) {
        this.weights = []

        this.inputLayer = []
        this.outputLayer = []

        this.inputError = []
        this.outputError = []

        this.activation = activation
        this.derivation = derivation

        this.k = k

        for(let i = 0; i < input; i++) {
            var temp = []
            for(let o = 0; o < output; o++) {
                temp.push(Math.random())
            }
            this.weights.push(temp)
        }

        for(let i = 0; i < input; i++) {
            this.inputLayer.push(0)
            this.inputError.push(0)
        }

        for(let i = 0; i < output; i++) {
            this.outputLayer.push(0)
            this.outputError.push(0)
        }
    }

    forWards() {
        for(let o in this.outputLayer) {
            this.outputLayer[o] = 0
            for(let i in this.inputLayer) {
                this.outputLayer[o] += this.inputLayer[i] * this.weights[i][o]
            }
            this.outputLayer[o] = this.activation(this.outputLayer[o])
        }

        return this.outputLayer
    }

    findError() {
        for(let i = 0; i < this.inputError.length; i++) {
            this.inputError[i] = 0
            for(let o = 0; o < this.outputError.length; o++) {
                this.inputError[i] += this.outputError[o] * this.weights[i][o]
            }
        }

        return this.inputError
    }

    backWards() {
        for(let o = 0; o < this.outputLayer.length; o++) {
            for(let i = 0; i < this.inputLayer.length; i++) {
                //this.weights[i][o] += this.k * this.outputError[o] * this.inputLayer[i] * this.outputLayer[o] * (1 - this.outputLayer[o])
                this.weights[i][o] += this.k * this.outputError[o] * this.inputLayer[i] * this.derivation(this.outputLayer[o])
            }
        }
    }

    calcError(data) {
        for(let i = 0; i < data.length; i++) {
            this.outputError[i] = data[i] - this.outputLayer[i]
            //console.log(this.outputError[i], data[i] - this.outputLayer[i])
        }
    }
}