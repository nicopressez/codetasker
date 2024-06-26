export default function Signup() {
 return (
  <>
  

    <div className="w-100 text-center mt-2">
     <h1 className=" font-bold">
      Signup
      </h1>
      <form>
       <input id="email" 
              type="email"
              name="email"
              placeholder="Email address"
              ></input>
       <input id="password"
              type="password"
              name="password"
              placeholder="Password"
              ></input>
       <input id="repeatPassword"
              type="password"
              name="repeatPassword"
              placeholder="Repeat password"></input>
              <input type="submit"
                     value="Submit"></input>
      </form>
     Already have an account? Log in
    </div>
  </>
 )
}