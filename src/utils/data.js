import isPlainObject from 'lodash/isPlainObject'
import * as dayjs from 'dayjs'

const formatFunc = {
    dayjs(value, rule) {
        return dayjs(value).format(rule)
    }
}


// 读取数据
const readData = function (data, keyPath, mapKey, format) {
    let resData = data
    if (keyPath) {
        let keys = keyPath.split('.')
        for (let key of keys) {
            if (typeof resData[key] != 'undefined') {
                resData = resData[key]
            } else {
                resData = null
                break
            }
        }
    } else {
        if (typeof format == 'object' && format.func) {
            return formatFunc[format.func].call(null, resData, format.rule)
        } else {
            return resData
        }
    }
    if (mapKey && resData instanceof Array) {
        return resData.map(itemData => {
            return readData(itemData, mapKey, null, format)
        })
    } else {
        if (typeof format == 'object' && format.func) {
            return formatFunc[format.func].call(null, resData, format.rule)
        } else {
            return resData
        }
    }
}


/**
 * 提取原来数据中的相关数据，转换后如下
 * config是提取规则，规则主要是两个值x和y值
 * x是一个横向的数据的提取规则
 * y是一个纵向的多组数据的提取规则
 * 任何一个规则都包含三个属性值name：姓名名称，path：提取深度路径，mapKey：提取所在深度的具体值，
 * 示例：
 * 数据源
 *  {
    base: {
        name: 'wangli',
        age: 18,
        ued: [{
                year: '2010',
                fk: {a: 11,b: 99}
            },
            {
                year: '2011',
                fk: {a: 15,b: 80}
            },
            {
                year: '2012',
                fk: {a: 30,b: 60}
            }]
        }
    }
 * -----------------------------------------------------------------------------------------
  提取规则 1
  {name:'year',path:'base.ued',mapKey:'year',format:{func:'dayjs',rule:''}}
  返回结果
  { year:['2010','2011','2012'] }
 * -----------------------------------------------------------------------------------------
  提取规则 2
  [
  {name:'year',path:'base.ued',mapKey:'year'},
  {name:'name',path:'base.name',mapKey:''},
  ]
  返回结果
  {
  year:['2010','2011','2012'],
  name:'wangli'
  }
 * -----------------------------------------------------------------------------------------
  提取规则 3
  {
   x:{name:'年份',path:'base.ued',mapKey:'year',format:null},
   y:[{name:'张三',path:'base.ued',mapKey:'fk.a',format:null},{name:'张三',path:'base.ued',mapKey:'fk.a',format:null}]
  }
  返回结果
  [
    [ '年份', '张三', '李四' ],
    [ '2010', 11, 99 ],
    [ '2011', 15, 80 ],
    [ '2012', 30, 60 ]
  ]
 * -----------------------------------------------------------------------------------------
 * 
 * @param {*} data 提取数据
 * @param {*} config 提取规则
 * @returns Object
 */
export const extractData = function (data, config) {
    if (config && isPlainObject(config) && config.y && config.y instanceof Array && config.y.length > 0) {
        let resData = []
        if (config.x && config.x.name && config.x.path) {
            resData.push([config.x.name])
            // 二维数组，填充第一条数据
            let rowHead = readData(data, config.x.path, config.x.mapKey, config.x.format)
            if (rowHead) {
                rowHead.forEach((element, index) => {
                    resData[index + 1] = [element]
                })
            }
            // 根据y数据规则集合，提取数据行列
            config.y.forEach(item => {
                // 行数据，第一列数据
                resData[0].push(item.name)
                // 行数据，追加其他数据
                let itemData = readData(data, item.path, item.mapKey, item.format)
                if (itemData && itemData instanceof Array) {
                    itemData.forEach((element, index) => {
                        if (resData[index + 1]) {
                            resData[index + 1].push(element)
                        } else {
                            resData[index + 1] = [element]
                        }
                    })
                }
            })
        } else {
            // 根据y数据规则集合，提取数据行列
            config.y.forEach((item, i) => {
                let itemData = readData(data, item.path, item.mapKey, item.format)
                if (itemData && itemData instanceof Array) {
                    if (i == 0) {
                        resData.push([item.name])
                    } else {
                        resData[0].push(item.name)
                    }
                    itemData.forEach((element, index) => {
                        if (resData[index + 1]) {
                            resData[index + 1].push(element)
                        } else {
                            resData[index + 1] = [element]
                        }
                    })
                }
            })
        }
        return resData
    } else if (config && isPlainObject(config) && config.name && config.path) {
        return {
            [config.name]: readData(data, config.path, config.mapKey, config.format)
        }
    } else if (config && config instanceof Array) {
        let resData = {}
        config.forEach(element => {
            resData[element.name] = readData(data, element.path, element.mapKey, element.format)
        });
        return resData
    } else {
        console.log('数据未处理')
        return data
    }
}

// 将一般对象转换为纯json对象
export const jsonData = function (val) {
    if (typeof val == 'string') {
        try {
            return JSON.parse(val)
        } catch (error) {
            return val
        }
    } else if (val) {
        return JSON.parse(JSON.stringify(val))
    } else {
        return {}
    }
}


// 删除数组值，根据对象key值删除
export const removeArray = function (array, key, value) {
    if (array && array instanceof Array) {
       let index = key ? array.findIndex(n => n[key] == value) : array.findIndex(n => n == value)
       if (index > -1) {
          return array.splice(index, 1)
       } else {
          return false
       }
    } else {
       return false
    }
 }