export default {
   "title": "测试数据",
   "width": "1080",
   "height": "768",
   "scaleMode": "auto",
   "background": {
      "backgroundImage": "",
      "backgroundColor": "#333333"
   },
   "network": {
      "host": "",
      "method": "GET",
      "headers": {

      }
   },
   "globalData": [
   {
      "id": "GD_ppEyiqmsyG",
      "type": "remote",
      "name": "api",
      "value": "RD_OC_AE9srrV",
      "uptime": 1630573368365
   }],
   "modules": [
   {
      "id": "default",
      "type": "content",
      "title": "页面1",
      "x": 0,
      "y": 0,
      "visible": true,
      "components": [
      {
         "name": "vx-border",
         "type": "shape",
         "title": "元件2",
         "x": 164,
         "y": 141,
         "width": 200,
         "height": 200,
         "data": "",
         "opacity": 100,
         "visible": true,
         "selected": false,
         "id": "044e441d8d71e49df3ec1b6f71b1e512",
         "angle": 0,
         "border": {

         },
         "background": {

         },
         "zIndex": 3,
         "events": [

         ],
         "options": {

         },
         "corner": true,
         "mid": "default"
      },
      {
         "name": "vx-box",
         "type": "shape",
         "title": "元件3",
         "x": 488,
         "y": 250,
         "width": 80,
         "height": 80,
         "data": "",
         "opacity": 100,
         "visible": true,
         "selected": false,
         "id": "ac1a44902404845cb254ffb4261ea46d",
         "angle": 0,
         "border": {

         },
         "background": {
            "backgroundColor": "#89f56369"
         },
         "zIndex": 2,
         "events": [

         ],
         "options": {
            "style": {
               "fontSize": "14px"
            }
         },
         "mid": "default"
      },
      {
         "name": "vx-tabs",
         "type": "tab",
         "title": "元件4",
         "x": 408,
         "y": 281,
         "width": 143,
         "height": 40,
         "data": [
         {
            "label": "标签A",
            "value": 1
         },
         {
            "label": "标签B",
            "value": 2
         }],
         "opacity": 100,
         "visible": true,
         "selected": false,
         "id": "550ec23b3d19364af07d80c921216bea",
         "angle": 0,
         "border": {

         },
         "background": {

         },
         "zIndex": 4,
         "events": [

         ],
         "options": {
            "style": {
               "fontSize": "14px"
            }
         },
         "mid": "default"
      },
      {
         "name": "vx-box",
         "type": "shape",
         "title": "元件5",
         "x": 439,
         "y": 162,
         "width": 332,
         "height": 151,
         "data": "GD_ppEyiqmsyG",
         "opacity": 100,
         "visible": true,
         "selected": false,
         "id": "5d108257a7a1f63eff9adadc8d62f942",
         "angle": 0,
         "border": {

         },
         "background": {
            "background": "linear-gradient(#ffff0066, #33ff88)"
         },
         "zIndex": 6,
         "events": [

         ],
         "options": {
            "style": {
               "fontSize": "14px"
            }
         },
         "mid": "default"
      },
      {
         "name": "vx-image",
         "type": "",
         "title": "元件6",
         "x": 453,
         "y": 252,
         "width": 100,
         "height": 100,
         "data": "",
         "opacity": 100,
         "visible": true,
         "selected": false,
         "id": "00ac28a7473dc0e8d6785fc840b4b69b",
         "angle": 0,
         "border": {

         },
         "background": {

         },
         "zIndex": 7,
         "events": [

         ],
         "options": {

         },
         "mid": "default"
      }]
   },
   {
      "id": "mdu_5YX9QAGDDr",
      "type": "content",
      "title": "页面2",
      "x": 0,
      "y": 0,
      "visible": false,
      "components": [
      {
         "name": "vx-box",
         "type": "shape",
         "title": "元件3",
         "x": 174,
         "y": 144,
         "width": 685,
         "height": 80,
         "data": "GD_ppEyiqmsyG",
         "opacity": 100,
         "visible": true,
         "selected": false,
         "id": "be70cdb3f1cd89277d6216b508b10ba2",
         "angle": 0,
         "border": {

         },
         "background": {
            "backgroundColor": "#89f56369"
         },
         "zIndex": 100001,
         "events": [

         ],
         "options": {
            "style": {
               "fontSize": "14px"
            }
         },
         "mid": "mdu_5YX9QAGDDr"
      }]
   }],
   "actions": [
   {
      "action": "show",
      "target": "044e441d8d71e49df3ec1b6f71b1e512",
      "value": false,
      "description": "隐藏元件2",
      "id": "AC_keZRxnOSR7"
   }],
   "remote": [
   {
      "id": "RD_OC_AE9srrV",
      "url": "http://110.40.172.81:81/",
      "extractRule": {
         "x": {
            "name": "日期",
            "keyname": "",
            "path": "data.growing",
            "mapKey": "date"
         },
         "y": [
         {
            "name": "体重",
            "keyname": "",
            "path": "data.growing",
            "mapKey": "weight"
         },
         {
            "name": "身高",
            "keyname": "",
            "path": "data.growing",
            "mapKey": "height"
         }]
      }
   }]
}