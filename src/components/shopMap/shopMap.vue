<template>
	<div class="map">
		<div class="back" @click.stop="back()">
    </div>
    <iframe class="iframe" name="iframe" :src="gnote" frameborder="0" scrolling="auto"></iframe>
	</div>
</template>
<script>
	export default{
	  data(){
	    return{
        gnote: "",
        lng: "",
        lat: "",
        areaName: "",
        road: "",
        realAddress: "",
        shopId:"",
        shopOther: "",
        collect: ""
      }
    },
		mounted(){
	    $(".iframe").height($(window).height());

	    this.collect = this.$route.query.collect;
	    this.shopOther = this.$route.query.shopOther;
	    console.log( this.shopOther)
	    this.shopId = this.$route.query.shopId;
	    this.lng = this.$route.query.lng;
	    this.lat = this.$route.query.lat;
	    this.areaName = this.$route.query.areaName;
	    this.road = this.$route.query.road;
	    this.realAddress = this.$route.query.realAddress;
      this.gnote = "http://api.map.baidu.com/marker?location="+this.lng+","+this.lat+"&title="+this.areaName+"-"+this.road+"&content="+this.areaName+this.road+this.realAddress+"&output=html&src=zupubao";
	    },
		methods: {
			back(){
        this.$router.go(-1)
      }
		}
	}


</script>
<style scoped lang="scss" type="text/scss">

	.map{
		width: 7.5rem;
		position: relative;
		.back{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      position: fixed;
      left: .3rem;
      top: .1rem;
      width: .58rem;
      height: .58rem;
      z-index: 99999;
      background: url("../../../static/images/common/back-big.png") no-repeat;
      -webkit-background-size: .58rem .58rem;
      background-size: .58rem .58rem;
		}
		.iframe{
      width: 7.5rem;
    }
	}
</style>
