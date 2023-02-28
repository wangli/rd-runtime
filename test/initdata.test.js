import { extractData } from '../src/utils/convert'
test(('数据转换'), () => {
   let data = {
      base: {
         name: 'wangli',
         age: 18,
         ued: [{
            year: '2010',
            fk: { a: 11, b: 99 }
         },
         {
            year: '2011',
            fk: { a: 15, b: 80 }
         },
         {
            year: '2012',
            fk: { a: 30, b: 60 }
         }]
      }
   }
   let config = { name: 'year', path: 'base.ued', mapKey: 'year' }
   expect(extractData(data, config)).toEqual({ year: ['2010', '2011', '2012'] })
})