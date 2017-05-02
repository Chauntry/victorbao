<template lang="jade">
.app
  .wrap
    center.center
      button(@click = "addNewItem") Add New Item
      button(@click = "update(json)") Submit
    .item(v-if = "json.items", v-for = "item in json.items")
      .information
        .name Name:
          input.iname(v-model="item.name")
        .price Price:
          input.iprice(v-model="item.price")
        div
          input.file(id="file",type="file",accept="image/*")
        div
          button(@click="upload") Add Photo
          button(@click="remove($index)") Remove
        .index
          button(v-if= "$index != json.items.length -1", @click = "moveDown($index)") moveDown
          button(v-if= "$index != 0", @click = "moveUp($index)") moveUp
      .description Description:
        textarea(type = "text", v-model= "item.descr").des
      .photo(v-for = "photo in item.photos",:style = "{'left': ($index+2) * 170 + 'px'}")
        .img(:style = "{'background-image': 'url(' + photo + ')'}")
        div
          button(@click = "removePhoto($parent.$index, $index)") Remove
          button(v-if= "$index != item.photos.length -1", @click = "moveRight($parent.$index, $index)") Right
          button(v-if= "$index != 0", @click = "moveLeft($parent.$index, $index)") Left


</template>

<script>
import * as actions from 'vuex/actions'
import $ from 'jquery'

export default {
  vuex: {
    getters: {
    },
    actions
  },
  components: {
  },
  data() {
    return {
      index: 0,
      json: {},
    }
  },
  props: {
  },
  methods: {
    update(json) {
      let data = {json : JSON.stringify(json)}
      $.ajax({
          url: 'http://www.victorbao.co.uk/data/update.php',
          type: 'POST',
          data: data,
          dataType: "json",
          success: (response) => {
            console.log(response)
          },
      })
    },
    addNewItem() {
      const item = {
        id : this.json.items.length + 1,
        name : '',
        price : 'N/A',
        descr: '',
        photos : []
      }
      this.json.items.unshift(item)
    },
    moveUp(index) {
      const moveItem = this.json.items[index]
      this.json.items.$set(index, this.json.items[index - 1])
      this.json.items.$set(index - 1, moveItem)
    },
    moveDown(index) {
      const moveItem = this.json.items[index]
      this.json.items.$set(index, this.json.items[index + 1])
      this.json.items.$set(index + 1, moveItem)
    },
    moveLeft(pindex,index) {
      const movePhoto = this.json.items[pindex].photos[index]
      this.json.items[pindex].photos.$set(index, this.json.items[pindex].photos[index - 1])
      this.json.items[pindex].photos.$set(index - 1, movePhoto)
    },
    moveRight(pindex,index) {
      const movePhoto = this.json.items[pindex].photos[index]
      this.json.items[pindex].photos.$set(index, this.json.items[pindex].photos[index + 1])
      this.json.items[pindex].photos.$set(index + 1, movePhoto)
    },
    removePhoto(pindex,index) {
      this.json.items[pindex].photos.$remove(this.json.items[pindex].photos[index])
    },
    remove(index) {
      this.json.items.$remove(this.json.items[index])
    },
    upload() {
      var formData = new FormData()
      formData.append('file', $('#file')[0].files[0])

      $.ajax({
          url: 'http://www.victorbao.co.uk/data/upload.php',
          type: 'POST',
          cache: false,
          data: formData,
          processData: false,
          contentType: false
      }).done(function(res) {
      }).fail(function(res) {});
    }
  },
  computed: {
  },
  route: {
  },
  created () {
    $.ajax({
        url: 'http://www.victorbao.co.uk/data/index.php',
        type: 'GET',
        dataType: "json",
        success: (response) => {
          // console.log(response)
          this.json = response
          console.log(response)
        }
    });
  },
  ready () {
    // let test = {'json' : "{'hello' : {'hello' : '12456'}}"}
    // this.update(test)
  },
  beforeDestroy () {
  }
}
</script>

<style lang="sass" scoped>
::-webkit-scrollbar-track
  background-color: #1b384b

::-webkit-scrollbar
  width: 10px;
  background-color: #555555

::-webkit-scrollbar-thumb
  background-color: #555555
  border: 2px solid #555555
.app
  height: 100%
  width: 100%
  color: white
  .wrap
    width: 80%
    height: auto
    margin-left: 10%
    margin-top: 5%
    .item
      position: relative
      height: 200px
      width: 100%
      background-color: #1b384b
      margin-bottom: 20px
      overflow-x: auto
      overflow-y: hidden
      div
        margin-top: 5px
        margin-bottom: 12px
        padding-left: 2px
      input
        color: white
        background-color: transparent
        border: 0px solid
      .information
        overflow: hidden
        position: absolute
        top: 0
        left: 0
        height: 100%
        width: 160px
        .file
          font-size: 10px
      .description
        position: absolute
        top: 0
        left: 160px
        height: 90%
        width: 170px
        textarea
          border-radius: 4px
          color: white
          background-color: transparent
          margin-top: 10px
          width: 100%
          height: 80%
          border: 1px solid

      .photo
        position: absolute
        top: 0
        height: 100%
        width: 170px
        .img
          width: 150px
          height: 150px
          background-repeat: no-repeat
          background-size: 100% 100%
          margin: 0px
  .center
    button
      font-size: 40px
      margin-right: 100px
      margin-left: 100px
      margin-bottom: 50px
button
  margin-right: 9px
  text-align: center
  cursor: pointer
  font-size: 12px
  outline: none
  background-color: #27ae60
  border: 0px
  border-radius: 5px
  box-shadow: 0 2px #95a5a6

button:hover
  background-color: #2ecc71
  background-color: #2ecc71
  box-shadow: 0 3px #95a5a6
  transform: translateY(2px)

</style>
