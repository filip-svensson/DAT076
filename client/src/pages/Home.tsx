import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-moving-gradient" style={{minHeight:"100vh"}}>
      <h1 className="text-white text-center fw-bolder">Share-A-Drink</h1>
      <p className="bg-white p-3 mx-5 my-3 fs-6" style={{maxWidth:"30rem", borderRadius:"1rem"}}>
        <span className="fw-bold fs-5">Hi,</span><br/>
        Welcome to Share-A-Drink. 
        This is an online forum where you can share your delicious drink recipes with others.
      </p>
      <Button 
        href="/forum"
        variant="outline-light"
        size="lg"
        className="fw-bold"
      >
        Enter Forum
      </Button>
    </div>
  )
}