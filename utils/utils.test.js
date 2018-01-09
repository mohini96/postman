const {add,get} = require('../utils/utils'),
    expect = require('expect')

it('it response will be addition of two numbewrs',() => {
    var res = add(12,12)
    expect(res).toBe(24)
})

it('it will give response like my name',() => {
    expect(get).toBe('Hardik')
})