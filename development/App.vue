<template>
   <div>
      <div class="item" id="stage" ref="stage"> </div>
      <div class="item" id="stage2" ref="stage2"> </div>
   </div>
</template>
<script>
   import { onMounted, ref } from 'vue'
   import { createVapp } from 'rd-runtime'
   import components from 'rd-components'

   const loadFileData = async function (value) {
      if (typeof value == 'string' && /^http/.test(value)) {
         let data = await fetch(value).then(r => {
            if (r && r.ok) {
               let type = r.headers.get('Content-Type')
               if (/stream/.test(type)) {
                  return r.blob()
               } else {
                  return r.json()
               }
            }
         })
         return data
      } else if (value && typeof value == 'object') {
         return value
      } else {
         await Promise.reject('没有数据')
      }
   }
   export default {
      name: 'rd-screen',
      setup(props) {
         const stage = ref(null)
         const stage2 = ref(null)
         const aa = "https://rde-1251496115.cos.ap-shanghai.myqcloud.com/projects/template/u1_A_22Xqm_hKUs.wty"
         const bb = "https://rde-1251496115.cos.ap-shanghai.myqcloud.com/projects/template/u1_A_WA_uLyu2z-.wty"
         onMounted(() => {
            if (stage.value) {
               loadFileData(aa).then(data => {
                  createVapp({
                     interaction: true,
                     clickCursor: 'pointer',
                     scale: true,
                     dom: stage.value
                  }, { display: true, components, data })

               })
               loadFileData(bb).then(data => {
                  createVapp({
                     interaction: true,
                     clickCursor: 'pointer',
                     scale: true,
                     dom: stage2.value
                  }, { display: true, components, data })

               })
            }
         })
         return { stage, stage2 }
      }
   }
</script>
<style scoped>
   .item {
      position: relative;
      display: inline-block;
      width: 600px;
      height: 450px;
      margin: 10px;
   }
</style>