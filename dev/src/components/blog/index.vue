<template lang="jade">
.app
  .ground
    .head
      headnav(:leftvalue = "10%")
    .bloglist
      .blogblock(v-for= "blog in searchedblogData")
        .img(:style = "{'background-image': 'url(' + blog.pic + ')'}",id = "desimg")
          .des {{ blog.describe }}
        .meta
          .title {{ blog.title }}
          //- .des {{ blog.describe }}
          .bot
            .view {{ blog.view }}
            <svg xmlns="http://www.w3.org/2000/svg" class="iview" viewBox="0 0 22 22" height = "0.5rem" wdith = "0.5rem"><g transform="matrix(.02146 0 0 .02146 1 1)" fill="#4d4d4d"><path d="m466.07 161.53c-205.6 0-382.8 121.2-464.2 296.1-2.5 5.3-2.5 11.5 0 16.9 81.4 174.9 258.6 296.1 464.2 296.1 205.6 0 382.8-121.2 464.2-296.1 2.5-5.3 2.5-11.5 0-16.9-81.4-174.9-258.6-296.1-464.2-296.1m0 514.7c-116.1 0-210.1-94.1-210.1-210.1 0-116.1 94.1-210.1 210.1-210.1 116.1 0 210.1 94.1 210.1 210.1 0 116-94.1 210.1-210.1 210.1"/><circle cx="466.08" cy="466.02" r="134.5"/></g></svg>
            .comment {{ blog.comment }}
            <svg enable-background="new 0 0 128 128" class="icomment" version="1.1" viewBox="0 0 128 128" height = "0.45rem" wdith = "0.5rem" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M112,0H16C7.164,0,0,7.164,0,16v64c0,8.836,7.164,16,16,16h24l32,32V96h40c8.836,0,16-7.164,16-16V16    C128,7.164,120.836,0,112,0z M120,80c0,4.414-3.59,8-8,8H64v20.688L43.313,88H16c-4.41,0-8-3.586-8-8V16c0-4.414,3.59-8,8-8h96    c4.41,0,8,3.586,8,8V80z" fill="#555"/></g></g><path d="M24,32h80v-8H24V32z" fill="#555"/><path d="M24,48h80v-8H24V48z" fill="#555"/><path d="M24,64h48v-8H24V64z" fill="#555"/></svg>
            .date {{ timestampToDate(blog.date) }}
    .tool
      //- footnav
    .cntr
      .cntr-innr
        label.search( for="inpt_search")
          input(id="inpt_search" type="text" v-model="searchmessage" @input = "searchBlog")
    //- .sortAndSearch sort by
    //-   select.custom-select(v-model= "sort_by")
    //-     option(value="time") time
    //-     option(value="view") view
    //-     option(value="comment") comment

</template>

<script>
import headnav from 'components/global/headnav.vue'
import linetime from 'components/global/linetime.vue'
import footnav from 'components/global/footnav.vue'
export default {
  components: {
    linetime,
    headnav,
    footnav
  },
  data() {
    return {
      searchmessage: '',
      sort_by: 'time',
      fold : true,
      blogData : [
        {id : 12, view: 100, comment: 2 ,title: 'Example blog 1', date: 1181043950280, describe: 'describe of blog 1', pic: 'http://3.bp.blogspot.com/-19GVoMdwoFo/Vj1Ccmi6MCI/AAAAAAAADL0/5Cz-PeAdGIQ/s1600/Anonymous-facbook-profile-picture.jpg'},
        {id : 1, view: 12, comment: 100, title: 'Example blog 2', date: 1486046972570, describe: 'describe of blog 2', pic: 'https://i.ytimg.com/vi/entAF9DWP5U/maxresdefault.jpg'},
        {id : 28, view: 0,comment: 0, title: 'Example blog 3', date: 286043951280, describe: 'describe of blog 3', pic:'http://img15.deviantart.net/7da5/i/2012/001/2/4/v_for_vendetta_by_manshonyagger-d4kz1vp.png'},
        {id : 90, view: 999,comment: 6, title: 'Example blog 4', date: 1086043992280, describe: 'describe of blog 4', pic: 'http://img12.deviantart.net/759b/i/2006/234/b/4/v_for_vendetta_by_ladygalt.jpg'},
        {id : 5, view: 12,comment: 67, title: 'Example blog 5', date: 1386003992280, describe: 'describe of blog 5', pic: 'https://s-media-cache-ak0.pinimg.com/originals/a8/43/3f/a8433f475de15578b112f19af61c7dfd.jpg'},
      ],
      searchedblogData : []
    };
  },

  methods: {

    // the style of block
    // mousedown (e, index) {
    //   this.touching = index
    //   this.mouseDownLocation = [e.clientX, e.clientY]
    //   this.mouseCurrentLocation = [e.clientX, e.clientY]
    // },
    // mousemove (e) {
    //   if(this.touching == null) return
    //   this.mouseCurrentLocation = [e.clientX, e.clientY]
    //   this.cookies[this.touching].current = [this.cookies[this.touching].original[0] + this.mouseCurrentLocation[0] - this.mouseDownLocation[0], this.cookies[this.touching].original[1] - this.mouseCurrentLocation[1] + this.mouseDownLocation[1]]
    // },
    // mouseup (e) {
    //   if (this.touching != null) {
    //     if (this.cookieIsInPlate(this.cookies[this.touching])) {
    //       this.emergeNewCookie(this.cookies[this.touching].id)
    //     }
    //     this.cookies[this.touching].original = this.cookies[this.touching].current
    //     this.touching = null
    //   }
    // },
    timestampToDate (ts) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ]
      const currentTime = new Date()
      const tstime = new Date(ts)
      const year = tstime.getFullYear()
      const month = monthNames[tstime.getMonth()]
      const date = tstime.getDate()
      const hour = tstime.getHours()
      const minute = tstime.getMinutes()

      // compare the data
      if (year == currentTime.getFullYear()) {
        if (month == monthNames[currentTime.getMonth()]) {
          // This case same day
          if (date == currentTime.getDate()) return hour+':'+minute
          // This case same month
          return month + '-' + date
        }
        else {
          // This case same year
          return month + '-' + date
        }
      }
      return year + ' ' + month
    },
    unfoldmeun() {
    },
    searchBlog () {
      this.searchedblogData = [];
      let index
      for (index in this.blogData) {
        if (this.blogData[index].title.search(this.searchmessage) != -1 || this.blogData[index].describe.search(this.searchmessage) != -1 )
          this.searchedblogData.push(this.blogData[index])
      }
    }
  },
  computed: {
  },
  ready: function() {
    this.searchedblogData = this.blogData
    setTimeout(()=>{console.log($(".img").height($(".img").width() * 0.6))}, 0)



    $(".trigger").click(function() {
      $(".menu").toggleClass("active");
      this.fold = this.fold ? false : true
      if (!this.fold) this.unfoldmeun();
    });
    $("#inpt_search").on('focus', function () {
      $(this).parent('label').addClass('active');
    });

    $("#inpt_search").on('blur', function () {
      if($(this).val().length == 0)
        $(this).parent('label').removeClass('active');
    });
  },
}
</script>
<style lang="sass" scoped>
.app
  font-family: verdana
  position: relative
  left: 0
  width: 100%
  background: #22475E
  .ground
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .head
      position: absolute
      height: 2rem
      width: 100%
      left: 0.5%
    .bloglist
      position: absolute
      top: 3rem
      width: 80%
      left: 50%
      transform: translateX(-50%)
      display: flex
      flex-wrap: wrap
      .blogblock
        align-content: space-around
        width: 31%
        border: 0.1rem solid #2F2F31
        border-radius: 0.1rem
        overflow: hidden
        margin: 0 2% 1rem 0
        position: relative
        box-shadow: 2px 2px 3px rgba(0,0,0,0.28)
        .img
          position: relative
          height: 0
          width: 100%
          overflow: hidden
          background:
            repeat: no-repeat
            size: 100% 100%
          .des
            display: block
            color: white
            transition: all 0.15s ease
            background: rgba(68,68,68,0.95)
            width: 100%
            height: 100%
            position: absolute
            top: 0
            left: 0
            opacity: 0
            font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif
            line-height: 0.4rem
            font-size: 0.4rem
            font-weight: 400
            padding: 0.3rem
            border-bottom: 0.1rem #3c6f84 solid
            &:hover
              opacity: 0.9
        .meta
          background: #2F2F31
          position: relative
          font-size: 0.85em
          white-space: nowrap
          padding: 0rem 0.2rem 0.4rem
          box-shadow: 0 0 2px rgba(0,0,0,0.25)
          z-index: 3
          .title
            width: 100%
            color: #999
            transition: 0.2s
            white-space: nowrap
            font-size: 0.3rem
            line-height: 1rem
            display: block
            position: relative
            top: 0
            letter-spacing: .05409em
            z-index: 1
          .des
            font-size: 0.3rem
            line-height: 0.4rem
            display: -webkit-box
            color: #525252
            z-index: 1
            margin-left: 0.3rem
            padding-top: 0rem
          .bot
            position: absolute
            bottom: 0
            font-size: 0.3rem
            right: 1%
            width: 100%
            text-align: right
            line-height: 0.5rem
            .comment
              width: 12%
              float: left
            .icomment
              width: 15%
              float: left
            .view
              width: 15%
              float: left
            .iview
              width: 10%
              float: left
            .date
              width: 30%
              float: right
    .tool
      position: fixed
      bottom: 2rem
      left: 1.5rem
      height: 1.5rem
      z-index: 10003
    .sortAndSearch
      position: fixed
      bottom: 2rem
      left: 3rem
      height: 1.5rem
      width: 80%
      border-radius: 0.4rem
      box-shadow: 0 4px 9px rgba(0,0,0,.37)
      background: rgba(255,255,255, 0.15);
.cntr
  z-index: 10005
  display: table
  position: fixed
  top: 0
  right: 10%
  width: 2rem
  height: 2rem
  .cntr-innr
    display: table-cell
    text-align: center
    vertical-align: middle
    .search
      color: white
      display: inline-block
      position: relative
      height: 35px
      width: 35px
      box-sizing: border-box
      margin: 0px 8px 7px 0px
      padding: 7px 9px 0px 9px
      border: 3px solid #000
      border-radius: 25px
      transition: all 200ms ease
      cursor: text
      &:after
        content: ""
        position: absolute
        width: 3px
        height: 20px
        right: -5px
        top: 21px
        background: #000
        border-radius: 3px
        transform: rotate(-45deg)
        transition: all 200ms ease
      &.active,
      &:hover
        width: 200px
        margin-right: 0px
        &:after
          height: 0px
      input
        color: white
        width: 100%
        border: none
        box-sizing: border-box
        font-family: Helvetica
        font-size: 15px
        color: inherit
        background: transparent
        outline-width: 0px

@keyframes curtain
  0%
    height: 0%
  100%
    height: 100%


</style>
