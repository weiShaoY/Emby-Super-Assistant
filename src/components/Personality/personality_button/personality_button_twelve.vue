<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

</script>

<template>
  <div
    class="container"
  >
    <input
      id="power"
      name="power"
      type="checkbox"
    >

    <label
      class="power"
      for="power"
    >
      <span
        class="icon-off"
      />

      <span
        class="light"
      />
    </label>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 150px;
  height: 130px;
  padding-top: 20px;
  margin: 50px auto;
}

#power {
  position: absolute;
  left: -9999px;
}

label {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  margin: auto;
  border: 4px solid #636679;
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    #efefef 0%,
    #eee 80%,
    #fff 100%
  );
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    #efefef 0%,
    #eee 80%,
    #fff 100%
  );
  background: radial-gradient(
    center,
    ellipse cover,
    #fefefe 0%,
    #eee 80%,
    #fff 100%
  );
  box-shadow:
    inset 0 -5px 10px 0 #d0d5eb,
    inset 0 5px 10px 0 #fff,
    0 0 0 1px #333;
  cursor: pointer;
  text-align: center;
  font-size: 40px;
  color: #0f0;
  line-height: 100px;
  text-shadow:
    -1px -1px 0px #fff,
    1px 1px 0px #fff;
  transition: all 0.1s ease-in-out;
}

label:after,
label:before {
  display: block;
  content: '';
  position: absolute;
}

label:before {
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background: -webkit-linear-gradient(
    top,
    #fefefe 0%,
    #eee 30%,
    #ddd 82%,
    #ddd 100%
  );
  background: -moz-linear-gradient(
    top,
    #fefefe 0%,
    #eee 30%,
    #ddd 82%,
    #ddd 100%
  );
  background: linear-gradient(top, #fefefe 0%, #eee 30%, #ddd 82%, #ddd 100%);
  box-shadow: 0 10px 30px 0 #000;
  top: -25px;
  left: -25px;
  z-index: -2;
}

label:after {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #fff;
  top: -15px;
  left: -15px;
  z-index: -1;
  box-shadow:
    0 -2px 5px 0px #fefefe,
    0 2px 5px 0 #ccc;
  background: rgb(210, 215, 237);
  background: -webkit-linear-gradient(
    top,
    #ddd 0%,
    #ddd 30%,
    #eee 82%,
    #efefef 100%
  );
  background: -moz-linear-gradient(
    top,
    #ddd 0%,
    #ddd 30%,
    #eee 82%,
    #efefef 100%
  );
  background: linear-gradient(top, #ddd 0%, #ddd 30%, #eee 82%, #efefef 100%);
}

.light {
  display: block;
  width: 12px;
  height: 12px;
  position: absolute;
  top: -12px;
  right: -12px;
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    #fff 0%,
    #d6f804 80%,
    #bade32 100%
  );
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    #fff 0%,
    #d6f804 80%,
    #bade32 100%
  );
  background: radial-gradient(
    center,
    ellipse cover,
    #fff 0%,
    #d6f804 80%,
    #bade32 100%
  );
  box-shadow:
    inset 0 1px 1px 0 #333,
    inset 0 -1px 1px 0 #333,
    0 0 5px 1px #bade32;
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
}

.icon-off {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #d6f804;
  box-shadow: inset 0 0 4px 0 #999;
  transition: all 0.1s ease-in-out;
}

.icon-off:after {
  display: block;
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #eee;
  box-shadow: 0 0 3px 0 #999;
  z-index: 2;
}

.icon-off:before {
  display: block;
  content: '';
  position: absolute;
  top: -5px;
  left: 0;
  right: 0;
  margin: auto;
  width: 8px;
  height: 25px;
  background: #d6f804;
  box-shadow: inherit;
  border-radius: 10px;
  border-style: solid;
  border-width: 0 3px 0;
  border-color: #eee;
  z-index: 3;
  transition: all 0.1s ease-in-out;
}

#power:checked + label {
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    #ddd 0%,
    #eee 80%,
    #efefef 100%
  );
  background: radial-gradient(
    center,
    ellipse cover,
    #ddd 0%,
    #eee 80%,
    #efefef 100%
  );
  background: radial-gradient(
    center,
    ellipse cover,
    #ddd 0%,
    #eee 80%,
    #efefef 100%
  );
  box-shadow:
    inset 0 -5px 10px 0 #aaa,
    inset 0 5px 10px 0 #aaa,
    0 0 0 1px #333;
  transition: all 0.1s linear;
}

#power:checked + label .light {
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    #fcc 0%,
    #f88 60%,
    #f00 100%
  );
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    #fcc 0%,
    #f88 60%,
    #f00 100%
  );
  background: radial-gradient(
    center,
    ellipse cover,
    #fcc 0%,
    #f88 60%,
    #f00 100%
  );
  box-shadow:
    inset 0 1px 1px 0 #555,
    inset 0 -1px 1px 0 #555,
    0 0 5px 0 #f55;
  transition: all 0.1s linear;
}

#power:checked + label .icon-off {
  background: transparent;
  box-shadow: inset 0 0 5px 0 #777;
  transition: all 0.1s linear;
}

#power:checked + label .icon-off:after {
  background: inherit;
  box-shadow: 0 0 5px 0 #777;
}

#power:checked + label .icon-off:before {
  background: #ddd;
  border-color: #dfdfdf;
  box-shadow: inherit;
  transition: all 0.1s linear;
}
</style>
