const chars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35']

const random = function generateMixed(n, max) {
  var res = [];
  for (var i = 0; i < 10; i++) {
    var id = Math.ceil(Math.random() * max);
    if (res.indexOf(id) == -1) {
      res.push(id)
      if (res.length >= n) {
        return res
      }
    }
  }

}

export {
  random
}