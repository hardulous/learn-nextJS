export default function handler(req, res) {

  // Here as this params will grab all dynamic segment in URL so it is of type array
  const { params } = req.query;
  res.status(200).json({
    catchAllRoutes: params ? params : "No Dynamic Segment To Catch" ,
  });

}

// Here similar to catch all routes of pages we have catch all routes for apis as well in which after a particular URL segments if ther exist further dynamic route segments seperated by "/" then we can grab all of them in catch all route

// Now if we access a route which does not exist then nextJS will by-default send 404 page but we can override it with optiinal catch all route by double square bracket [[...name]].js
