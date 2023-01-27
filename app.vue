<script setup>

import io from "socket.io-client";
const config = useRuntimeConfig();

const chatLog = ref([]);
const text = ref("");
let socket;


function addToChat(content, type = "message"){
  switch (type){}
  chatLog.value.push({
    content,
    type,
  });
}

function send() {
  socket.emit("message",text.value);
  addToChat(text.value );
  text.value = "";
}
onMounted (() => {
  socket = io(config.public.wssUrl);
  addToChat("welcome!","activity");
  socket.on("message", (data) => {
    //console.log(data);
    addToChat(data.message);
  });
});

onUnmounted(() => {
  socket.disconnect(true);
});
</script>

<template>

  <div class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lex min-h-full justify-center p-4 text-center sm:items-center sm:p-0 m-50 md:place-content-center ml-10 place-items-center content-center">
   <ChatLog :chat-log="chatLog"/>
    <input v-model="text" class="relative place-content-center  rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20" placeholder="Type your message here" @keyup.enter="send" />
    <br/>
    <button @click="send" class="m-6 inline-flex items-center justify-center rounded-md p-2.5 text-white bg-emerald-400 opacity-90 hover:opacity-100">Send</button> 
  </div>
</template>

<style>
body{
    @apply bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ;
}
</style>