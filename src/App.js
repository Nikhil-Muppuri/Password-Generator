import {Component} from 'react'
import './App.css';


let formData = {
  passwordNumber : ""
}

class App extends Component{
  state = {userInput:'',errorMsg:'',isError:false,isPasswordAction:false,password:''}

  onEnterInput=(event)=>{
    this.setState({userInput:event.target.value})
    if(event.target.value === ""){
      this.setState({errorMsg:"*Required",isError:true})
    }
    else{
      this.setState({errorMsg:'',isError:false})
    }
    formData.passwordNumber=event.target.value
  }

  onBlurEvent = (event)=>{
    if(event.target.value === ""){
      this.setState({errorMsg:"*Required",isError:true})
    }
  }

  generatedPassword=()=>{
    const {userInput} = this.state
    const symbols = "!@#$%^&*()"
    const numbers = "0123456789"
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz"
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let allList = symbols+numbers+lowerCaseLetters+upperCaseLetters
    let generated=""
    for (let i=0;i<userInput;i++)
    {
       generated += allList[(Math.floor(Math.random()*allList.length))]
    }
    return generated
  }

  validateFormData = (formData)=>{
      let {passwordNumber} = formData
      if(passwordNumber === ""){
        this.setState({errorMsg:"*Required",isError:true})
      }
      else{
        this.setState({errorMsg:'',isError:false})
      }
      if(parseInt(passwordNumber)<=0){
        this.setState({errorMsg:"Password length must be greater than 0.",isError:true})
      }
  }

  onSubmitForm=(event)=>{
    event.preventDefault()
    const {userInput}=this.state 
    this.validateFormData(formData)
    if (userInput !== "" & userInput>0){
      this.setState({password:this.generatedPassword(),isPasswordAction:true})
    }
    else{
      this.setState({password:"",isPasswordAction:false})
    }
   
  }

  

  render(){
    const {errorMsg,isError,isPasswordAction,password,userInput} = this.state
    const errorClassName = isError?'error-input-field input-field':'input-field'
    return(
<div className="main-container">
      <h1 className="heading">Password Generator</h1>
      <form className="card-container" onSubmit={this.onSubmitForm}>
        <div className="container"> 
          <label htmlFor="inputNum" className="input-label">Password Length :</label>
          <div className='error-container'>
            <input type="number" id="inputNum" className={errorClassName} onChange={this.onEnterInput} onBlur={this.onBlurEvent} value={userInput}/>
            {isError && <p className='error-field'>{errorMsg}</p>}
          </div>
          
        </div>
        <button type="submit" className="button-style">Generate Password</button>
        <div className='generated-password-container'>
        {isPasswordAction && <p className='generated-pass-style'>Generated Password : <span>{password}</span></p>}
        </div>
        
      </form>
    </div>
    )
  }
}

export default App;
