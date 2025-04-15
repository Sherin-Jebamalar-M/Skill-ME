import Carousel from 'react-bootstrap/Carousel';

function IndividualIntervalsExample() {
  return (
    <Carousel  style={{width:"900px",height:"450px"}} controls={false} >
      <Carousel.Item interval={2000} style={{width:"900px",height:"450px"}}>
      <img
          className="d-block w-100"
          src="/assets/img1.jpg" // Replace with your image path
          alt="First slide" style={{width:"900px",height:"450px"}}
        />
        <Carousel.Caption>
          <h3 style={{backgroundColor:"rgba(255, 255, 255, 0.7)",color:"rgb(17, 45, 78)",fontWeight:"800",padding:"5px"}}>Programming / Cooking / Photography</h3>
          <p>Give what you have, get what you need – skill swapping made easy</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000} style={{width:"900px",height:"450px"}}>
      <img
          className="d-block w-100"
          src="/assets/img2.jpg" // Replace with your image path
          alt="First slide" style={{width:"900px",height:"450px"}}></img>
        
        <Carousel.Caption>
          <h3 style={{backgroundColor:"rgba(255, 255, 255, 0.7)",color:"rgb(17, 45, 78)",fontWeight:"800",padding:"5px"}}>Music / Academics / Games</h3>
          <p>Give what you have, get what you need – skill swapping made easy</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}  style={{width:"900px",height:"450px"}}>
      <img
          className="d-block w-100"
          src="/assets/img3.jpg" // Replace with your image path
          alt="First slide" style={{width:"900px",height:"450px"}}></img>
        
        <Carousel.Caption>
          <h3 style={{backgroundColor:"rgba(255, 255, 255, 0.7)",color:"rgb(17, 45, 78)",fontWeight:"800",padding:"5px"}}>Fitness / Marketing / Content Creation</h3>
          <p>
          Give what you have, get what you need – skill swapping made easy
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervalsExample;