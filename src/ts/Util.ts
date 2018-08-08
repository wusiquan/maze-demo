
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
    return lowerValue + Math.floor(Math.random() * (upperValue - lowerValue))
  }
}

export default Util