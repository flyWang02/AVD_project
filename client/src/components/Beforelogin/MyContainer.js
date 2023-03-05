
/*
This file is a pre-validation file and has no role!!!
*/
import React from "react";
class MyContainer extends React.Component {
  name = React.createRef()
  author = React.createRef()
  pages = React.createRef()
  
  addtext =(cname,cauthor,cpages)=>{
    console.log(cname.value,cauthor.value,cpages.value)

    fetch('http://localhost:1234/api/book/',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:cname.value,
        author:cauthor.value,
        pages:cpages.value,
      }) 
      }).then(res=>res.json()).then(data=>{
        console.log(data) //请求的结果
       }).catch((err) => {
        console.log(err.message);
     });

  }

  
  render() {
      return (
          <>
          Book Name:  <input id='name' ref={this.name}/> <br/>
          Book Author:  <input id='author' ref={this.author}/> <br/>
          Book Pages:  <input id='pages' ref={this.pages}/>  <br/>
          <input type='submit' id='submit' ref='submit' value="Submit"
          onClick={()=>{
            this.addtext(this.name.current,this.author.current,this.pages.current)
            }}/> <br/>
          


        </>
      );
    }
  }

export default MyContainer;