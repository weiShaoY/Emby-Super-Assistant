<template>
  <div
    class="group fixed bottom-[200px] left-[20px] cursor-pointer rounded-[10px] text-[17px] transition-all duration-200"
  >
    <div
      class="pointer-events-none absolute left-1/2 top-0 transform rounded-[15px] p-[10px] opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:top-[-120px] -translate-x-1/2 group-hover:opacity-100"
      :style="{
        boxShadow: 'inset 20px 20px 8px #bebebe, inset -20px -20px 8px #ffffff',
      }"
    >
      <div
        class="border border-[#52382f] rounded-[10px_15px] bg-[#2a2b2f] p-[10px]"
      >
        <div
          class="flex gap-[10px]"
        >
          <div
            class="h-[50px] w-[50px] flex items-center justify-center border border-[#e6683c] rounded-[10px] bg-white text-[25px] font-bold"
          >
            Ui
          </div>

          <div
            class="flex flex-col gap-0 text-white"
          >
            <div
              class="text-[17px] text-[#e6683c] font-bold"
            >
              User
            </div>

            <div>
              @username
            </div>
          </div>
        </div>

        <div
          class="pt-[5px] text-[#ccc]"
        >
          800+ Followers
        </div>
      </div>
    </div>

    <!-- 按钮 -->
    <div
      class="bg-#EB3349 p-3"
    >
      11111111111111
    </div>
  </div>
</template>
