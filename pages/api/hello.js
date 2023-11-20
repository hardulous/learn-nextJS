// Now we have created hello.js inside api folder so api route /api/hello is automatically created and to make it work we have to export default a handler function which handles the req-res cycle when user makes request to this route

// Here this req/res object is similar to the one in nodeJS
export default function handler(req, res) {

  res.status(200).json({ msg: "Hello.js" });  // Now when we go "/api/hello" then this handler function will be executed and will return an object as response 

}
