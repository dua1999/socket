import { Server } from "socket.io";
import { defineNuxtModule } from "@nuxt/kit";


const userMap = {

};
function buildMessage(who, what){
    //return{id:"1", message: what};
}

export default defineNuxtModule ({
    setup(_,nuxt) {
        nuxt.hook("listen", (server)=> {
            console.log("Socket listen", server.address(), server.eventNames());
            const io = new Server(server);
            nuxt.hook("close", () => io.close);

            io.on("connected", (socket) => {
                console.log("Connected", socket.id);
   
            });

            io.on("connect", (socket)=> {
                socket.emit("message", buildMessage(socket),`welcome ${socket.id}`);
                socket.broadcast.emit("message", `${socket.id} joined`);
                socket.on ("message", function message(data){
                    console.log("message", buildMessage(socket,data ));
                    socket.broadcast.emit("message" , buildMessage(socket,data));
                });

                socket.on("disconnecting", ()=>{
                    console.log("disconnected", socket.id);
                    socket.broadcast.emit("message", buildMessage(socket,`${socket.id} left`)); 
                })
            })
        });
    },
}); 