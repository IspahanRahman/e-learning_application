// const uploadroute=require('./fileuploadroute')
// const authroute=require('./authroute')
// const chatroute=require('./chatroute')
// const routes=[
//     {
//         path:'/auth',
//         handler:authroute
//     },
//     {
//         path:'/uploads',
//         handler:uploadroute
//     },
//     {
//         path:'/chat',
//         handler:chatroute

//     },
//     {
//         path:'/',
//         handler:(req,res)=>{
//             res.render('index')
//         }

//     }
// ]

// module.exports=app=>{
//     routes.forEach((r)=>{
//         if(r.path=='/'){
//             app.get(r.path,r.handler)
//         }
//         else{
//             app.use(r.path,r.handler)
//         }
//     })
// }