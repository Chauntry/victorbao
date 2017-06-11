<template lang="jade">
.app
  //- .lock(v-if = "key != 'admin'") key:
  //-   input(v-model = "key",length = "200px")
  .wrap
    .information
      h1 Information
      h2 1. Click 'Submit' button after changed
      h2 2. Refresh page if undo
      h2 3. Photo name must not duplicated
      h2 4. Inform administrator to back-up after submitting
      h2 Good Luck xD
    center.center
      button(@click = "addNewItem") Add New Item
      button(@click = "update(json)") Submit
    .catalogs
      span Catalogs:
      .catalog(v-for = "cata in json.catalogs")
        span {{cata}}
        button(@click = "DelectCatalog($index)") Delete
        button(v-if= "$index != json.catalogs.length-1",@click = "moveCatalogDown($index)") Move Down
        button(v-if= "$index != 0",@click = "moveCatalogUp($index)") Move Up
      .lower
        button(@click = "NewCatalog") NewCatalog
        input.iname(v-model="NewCatalogName")
    .item(v-if = "json.items", v-for = "item in json.items")
      .information
        .name Name:
          input.iname(v-model="item.name")
        .catalog Catalog:
          select.iname(v-model="item.catalog")
            option(v-for = "cata in json.catalogs") {{cata}}
        .price Price:
          input.iprice(v-model="item.price")
        div
          input.file(:id="'file' + $index",type="file",accept="image/*")
        div
          button(@click="upload($index)") Add Photo
          button(@click="remove($index)") Remove
        .index
          button(v-if= "$index != json.items.length -1", @click = "moveDown($index)") moveDw
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
      key: '',
      NewCatalogName: '',
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
    moveCatalogUp(index) {
      const movecatalog = this.json.catalogs[index]
      this.json.catalogs.$set(index, this.json.catalogs[index - 1])
      this.json.catalogs.$set(index - 1, movecatalog)
    },
    moveCatalogDown(index) {
      const movecatalog = this.json.catalogs[index]
      this.json.catalogs.$set(index, this.json.catalogs[index + 1])
      this.json.catalogs.$set(index + 1, movecatalog)
    },
    NewCatalog() {
      for (let i in this.json.catalogs) {
        if (this.json.catalogs[i] == this.NewCatalogName) {
          alert('Cannot add duplicate catalog.')
          return
        }
      }
      this.json.catalogs.push(this.NewCatalogName)
      this.NewCatalogName = ''
    },
    DelectCatalog(index) {
      let deleteC = this.json.catalogs[index]
      for (let i in this.json.items) {
        if (this.json.items[i].catalog == deleteC) {
          alert('Cannot delete this catalog, as ' + this.json.items[i].name + '(id:' + this.json.items[i].id + ') belongs to this selected catalog.')
          return
        }
      }
      this.json.catalogs.splice(index,1)
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
    upload(index) {
      var formData = new FormData()
      console.log($('#file' + index))
      let upload_file = $('#file' + index)[0].files[0]
      let name = upload_file.name
      // name = './' + index + '#' + (this.json.items[index].photos.length+1) + '.' + name
      // upload_file.name = name
      formData.append('file', upload_file)
      let link = 'http://www.victorbao.co.uk/data/' + upload_file.name
      console.log(link)
      $.ajax({
          url: 'http://www.victorbao.co.uk/data/upload.php',
          type: 'POST',
          cache: false,
          data: formData,
          processData: false,
          contentType: false
      }).done((res) => {
        if (res != 1) {
          alert(res)
        }
        this.addPhoto(link,index)
      }).fail((res) => {
        alert(res)
      });
    },
    addPhoto(link, index) {
      this.json.items[index].photos.unshift(link)
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
  width: 100%
  color: white
  background-color: #264d67
  top: 0
  position: absolute
  .information
    margin-bottom: 40px
    line-height: 35px
  .wrap
    width: 80%
    height: auto
    margin-left: 10%
    margin-top: 5%
    .catalogs
      background-color: #1b384b
      margin-bottom: 20px
      font-size: 30px
      .catalog
        height: 25px
        margin: 7px
        padding: 3px
        font-size: 15px
        padding-left: 20px
        border-top: 1px solid white
        button
          float: right
      .lower
        margin-left: 20px
        font-size: 20px
        height: 30px
    .item
      position: relative
      height: 200px
      width: 100%
      background-color: #1b384b
      margin-bottom: 20px
      overflow-x: auto
      overflow-y: hidden
      div
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
        line-height: 25px
        .file
          font-size: 10px
        .catalog
          position: absolute
          top: 0
          width: 50%
          left: 50%
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
  .lock
    height: 100px
    margin-left: 20%
    margin-top: 20%
    font-size: 50px
    input
      font-size: 50px
      color: white
      background-color: #1b384b
      border: 0px solid
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
