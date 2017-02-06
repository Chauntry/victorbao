<template lang="jade">
.cp-uploadimg
  .header
    button.back(v-link = "'../cpanel'") &#60;返回
    h1.title 选择1-3张现场照片
  .upload-imgs
    span.signup-upload-img(v-for = "i in 3")
      .signup-file-del(v-if = "imgList[$index] && update", @click = "imgList.$set($index,'')")
      input(v-if = "update",type = "file", @change="uploadImg($event, $index)")
      img(v-if="imgList[$index]", :src="imgList[$index]")
  button.upload(@click = "confirm = true", v-if = "update") 上传
  confirm(:exist.sync = "confirm", :titile = "'上传后不可更改，确认上传?'", :to-be-true = "'update'")
  .about 本页面由江苏广电新闻中心提供
</template>

<script>
import api from 'api/'
import imagemin from 'common/imagemin'
import confirm from 'components/global/confirm.vue'

// console.log(imagemin)
export default {
  components: {
    confirm
  },
  data() {
    return {
      update: false,
      selectedItem: 0,
      rewardsList: null,
      prizeThisTime: '',
      newUsers: null,
      prizeUser: null,
      probabilityAdjust: null,
      confirm: false,
      drawning: true,
      itiemId: null,
      newList: null,
      imgList: ['', '', ''],
      imgListIndex: null,
    }
  },
  methods: {
    uploadImg (e, index) {
      const reader = new FileReader()
      let img = new Image()
      reader.readAsDataURL(e.target.files[0])
      this.imgListIndex = index
      self = this
      reader.onload = function( evt ) {
        let imgSrc = this.result
        img.src = imgSrc
        img.onload = () => {
          var src = imgSrc
          src = imagemin.compressWithRatio(img, {
              maxWidth: 640,
              maxHeight:1136,
              quality:.6
          })
          self.uploadImgToFeatureApi(src)
        }
      }
    },
    uploadImgToFeatureApi (src) {
      const data = { img: src }
      api.yaoTvImage(data).then(res => {
        self.imgList.$set(self.imgListIndex, res.data.data.data)
      })
    },
    updateImg () {
      this.update = false
      const data = {
        imgs: this.imgList,
        id: this.$route.params.id,
      }
      App.showLoading()
      api.uploadImg(data).then(res => {
        App.hideLoading()
        App.pop(res.data.msg)
        // reflash
//        this.$router.go('uploadImg')
      })
    },
  },
  computed: {
  },
  events: {
    'update'() {
      if (this.imgList == ['', '', '']) App.pop('请至少上传一张照片')
      else this.updateImg()
    }
  },
  ready () {
    api.getCpanel().then(res => {
      const now = new Date()
      if (res.data.data.promotion.images !== '') this.imgList = res.data.data.promotion.images
      else this.update = now.getTime() - new Date(res.data.data.promotion.activate_time).getTime() <= 15 * 60 * 1000
    })
  }
}
</script>

<style lang="sass" scoped>
@import 'config'
.cp-uploadimg
  height: 100%
  width: 100%
  background-color: #fff
  .header
    height: 44px
    padding-right: 10px
    padding-left: 10px
    background-color: #fff
    border-bottom: 1px solid #ddd
    .back
      position: absolute
      top: 0
      padding: 0
      font-size: 16px
      line-height: 44px
      color: #428bca
      text-align: center
      border: 0
      background: transparent
    h1
      font-size: 17px
      font-weight: 500
      line-height: 44px
      color: #000
      text-align: center
      white-space: nowrap
  .upload-imgs
    .signup-upload-img
      position: relative
      display: inline-block
      margin: 10px 0 0 20px
      width: 40%
      height: rem(150)
      border: rem(1) dashed #A0A0A0
      border-radius: rem(5)
      background:
        image: url('~assets/icon-photo.png')
        repeat: no-repeat
        color: #F1F0EE
        position: center
        size: rem(17) rem(17)
      input
        width: 100%
        height: 100%
        opacity: 0
      img
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: 2
      .signup-file-del
        position: absolute
        top: -0.5rem
        right: -0.7rem
        width: 1.375rem
        height: 1.5rem
        z-index: 3
        background-image: url('~assets/icon-close.png')
        background-size: 1.0625rem auto
        background-repeat: no-repeat
  .upload
    width: 80%
    border: 0
    position: relative
    display: block
    margin-top: r(50)
    margin-left: 10%
    margin-right: 10%
    padding-left: rem(14)
    padding-right: rem(14)
    box-sizing: border-box
    font-size: rem(18)
    text-align: center
    text-decoration: none
    color: #fff
    line-height: 2.33333333
    border-radius: rem(5)
    -webkit-tap-highlight-color: rgba(0,0,0,0)
    background-color: #428bca
  .confirm
    background-color: #04be02
    margin-bottom: r(50)
  .about
    position: absolute
    bottom: 0
    width: 100%
    font-size: 0.7rem
    text-align: center
    height: 1rem
    color: gray
</style>
