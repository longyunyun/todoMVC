var express = require('express')
var router = express.Router()
var UserStatistic = require('../models/userstatistic')
var Statistic = require('../models/statistic')

router.post('/', function (req, res, next) {
  var meanofOpenTime = 0
  var totalTime = 0
  var usercount = 0
  var count = 0
  UserStatistic.find({ 'createAt': { $gt: new Date(req.body.date) } }, function (err, data) {
    if (err) throw err
    data.forEach(element => {
      usercount++
    })
  })

  Statistic.find({ 'createAt': { $gt: new Date(req.body.date) } }, function (err, data) {
    if (err) throw err
    data.forEach(element => {
      totalTime += Number(element.openpagetime)
      count++
    })
    if (count != 0)
      meanofOpenTime = totalTime / count
    return res.json({
      code: 200,
      success: true,
      usercount: usercount,
      meanofOpenTime: meanofOpenTime
    })
  })
})

module.exports = router