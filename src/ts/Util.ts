
const Util = {
  // inplace shuffle
  fisherYatesShuffle(arr) {
    let lastIndex = arr.length - 1
    let index = 0

    while (index < lastIndex) {
      let randIndex = this.randomNumber(index, lastIndex + 1)

      let tmp = arr[randIndex]
      arr[randIndex] = arr[index]
      arr[index] = tmp

      index++
    }
  },

  // [lowerValue, upperValue - 1]
  randomNumber(upperValue, lowerValue = 0) {
    if (upperValue === lowerValue) return lowerValue
    return lowerValue + Math.floor(Math.random() * (upperValue - lowerValue + 1))
  },
  
  getRandomOneItem(arr) {
    if (!arr.length) {
      return undefined
    }

    let randNum = this.randomNumber(arr.length - 1, 0)
    return arr[randNum]
  }
}

export default Util