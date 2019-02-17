/*
https://api.imgflip.com/get_memes
*/
import React from 'react'

export default class MemeGenerator extends React.Component{
    constructor(){
        super();
        this.state = {
            topText:"",
            bottomText:"",
            randomImg:"https://imgflip.com/s/meme/One-Does-Not-Simply.jpg",
            allMemeImgs:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.fun = this.fun.bind(this)
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then((response) => {
                const {memes} = response.data
                this.setState({allMemeImgs:memes})
            })
    }
    handleChange(event){
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }
    fun(event){
        event.preventDefault();
        const index = Math.floor(Math.random()*this.state.allMemeImgs.length)
        const url = this.state.allMemeImgs[index].url
        //console.log(url)
        this.setState({
            randomImg:url
        })
    }
  render(){
    return (
      <div>
      <form className="meme-form" onSubmit={this.fun}>
      <input type="text" placeholder="Top Text" name="topText" value={this.state.topText} onChange ={this.handleChange} /> 
      <input type="text" placeholder="Bottom Text" name="bottomText" value={this.state.bottomText} onChange ={this.handleChange} />
      <button >Gen</button>
      </form>
      <div className="meme">
         <img src={this.state.randomImg} alt="" />
         <h2 className="top">{this.state.topText}</h2>
         <h2 className="bottom">{this.state.bottomText}</h2>
      </div>
      </div>
    )
  }
}