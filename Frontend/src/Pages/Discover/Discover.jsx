import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Nav from "react-bootstrap/Nav";

import ProfileCard from "./ProfileCard";
import { ImRedo2 } from "react-icons/im";
import "./Discover.css";

import Spinner from "react-bootstrap/Spinner";

const Discover = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const [loading, setLoading] = useState(false);

  const [discoverUsers, setDiscoverUsers] = useState([]);

  const [artUsers, setartUsers] = useState([]);

  const [musicUsers, setMusicUsers] = useState([]);
  const [lifeUsers, setlifeUsers] = useState([]);

  const [cookUsers, setcookUsers] = useState([]);
  const [graphicUsers, setgraphicUsers] = useState([]);

  const [sportsUsers, setsportsUsers] = useState([]);
  const [programUsers, setprogramUsers] = useState([]);

  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/user/registered/getDetails`);
        console.log(data.data);
        setUser(data.data);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        }
        localStorage.removeItem("userInfo");
        setUser(null);
        await axios.get("/auth/logout");
        navigate("/login");
      }
    };
    const getDiscoverUsers = async () => {
      try {
        const { data } = await axios.get("/user/discover");
        console.log(data);
        setDiscoverUsers(data.data.forYou);
        setartUsers(data.data.artUser);
        setMusicUsers(data.data.musicUser);
       setlifeUsers(data.data.lifeUser);
        setcookUsers(data.data.cookUser);
        setgraphicUsers(data.data.graphicUser);
        setsportsUsers(data.data.sportsUser);
        setprogramUsers(data.data.programUser);
        setOtherUsers(data.data.others);

      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        }
        localStorage.removeItem("userInfo");
        setUser(null);
        await axios.get("/auth/logout");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    getUser();
    getDiscoverUsers();
  }, []);

  return (
    <>
      <div className="discover-page">
        <div className="content-container">
          <div className="nav-bar">
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href="#for-you" className="navlink" id="foryou">
                For You
              </Nav.Link>
              <Nav.Link href="#popular" className="navlink" id="popular1">
                Popular
              </Nav.Link>
              <Nav.Link href="#art" className="navlink">
              <img src="/assets/palette.png" alt="" style={{width:"23px",height:"23px"}} /> Art & Design
              </Nav.Link>
              <Nav.Link href="#music" className="navlink">
              <img src="/assets/music.png" alt="" style={{width:"25px",height:"25px"}} /> Music
              </Nav.Link> 
              <Nav.Link href="#lifestyle" className="navlink">
              <img src="/assets/apple.png" alt="" style={{width:"25px",height:"25px"}} /> Lifestyle
              </Nav.Link> 
              <Nav.Link href="#cooking" className="navlink">
              <img src="/assets/cook.png" alt="" style={{width:"25px",height:"25px"}} />  Cooking
              </Nav.Link>
              <Nav.Link href="#graphic" className="navlink">
              <img src="/assets/photoshop.png" alt="" style={{width:"25px",height:"25px"}} />  Graphic Design
              </Nav.Link>
              <Nav.Link href="#sports" className="navlink">
              <img src="/assets/gamin.png" alt="" style={{width:"25px",height:"25px"}} /> Sports
              </Nav.Link>
             
              <Nav.Link href="#web-development" className="navlink">
              <img src="/assets/program.png" alt="" style={{width:"25px",height:"25px"}} /> Programming
              </Nav.Link>
              <Nav.Link href="#others" className="navlink">
              <img src="/assets/others.png" alt="" style={{width:"25px",height:"25px"}} /> Others
              </Nav.Link>
              
            </Nav>
          </div>
          <div className="heading-container">
            {loading ? (
              <div className="container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <>
                <p
                  id="for-you"
                  style={{
                    fontFamily: "Josefin Sans, sans-serif",
                    color: "gray",
                    marginTop: "2rem",
                    marginBottom: "1rem",
                  
                  }}
                >
                  SkillME <ImRedo2 /> For You
                </p>
                <div className="profile-cards">
                  {discoverUsers && discoverUsers.length > 0 ? (
                    discoverUsers.map((user) => (
                      <ProfileCard
                        profileImageUrl={user?.picture}
                        name={user?.name}
                        rating={user?.rating ? user?.rating : 5}
                        bio={user?.bio}
                        skills={user?.skillsProficientAt}
                        username={user?.username}
                      />
                    ))
                  ) : (
                    <p style={{color:"black"}}>No users to show right now</p>
                  )}
          
                </div>
                <h3
                  id="popular"
                  style={{
                    fontFamily: "Josefin Sans, sans-serif",
                    color: "gray",
                    marginTop: "1rem",
                    marginBottom: "3rem",
                  }}
                >
                  Popular
                </h3>
                <p id="art" style={{color:"gray",fontFamily: "Josefin Sans, sans-serif"}}>SkillME <ImRedo2 /> Art & Design</p>
                <div className="profile-cards">
                  {/* Profile cards go here */}
                  {artUsers && artUsers.length > 0 ? (
                    artUsers.map((user) => (
                      <ProfileCard
                        profileImageUrl={user?.picture}
                        name={user?.name}
                        rating={4}
                        bio={user?.bio}
                        skills={user?.skillsProficientAt}
                        username={user?.username}
                      />
                    ))
                  ) : (
                    <p style={{ color: "black" }}>No users to show right now</p>
                  )}
                  {/* Add more ProfileCard components as needed */}
                </div>
                <p id="music" style={{color:"gray",fontFamily: "Josefin Sans, sans-serif"}}>SkillME <ImRedo2 />Music</p>
                <div className="profile-cards">
                  {musicUsers && musicUsers.length > 0 ? (
                    musicUsers.map((user) => (
                      <ProfileCard
                        profileImageUrl={user?.picture}
                        name={user?.name}
                        rating={4}
                        bio={user?.bio}
                        skills={user?.skillsProficientAt}
                        username={user?.username}
                      />
                    ))
                  ) : (
                    <p style={{ color: "black" }}>No users to show right now</p>
                  )}
                  
                </div>

                <p id="lifestyle" style={{color:"gray",fontFamily: "Josefin Sans, sans-serif"}}>SkillME <ImRedo2 />Lifestyle</p>
                <div className="profile-cards">
                  {/* Profile cards go here */}
                  {lifeUsers&& lifeUsers.length > 0 ? (
                  lifeUsers.map((user) => (
                      <ProfileCard
                        profileImageUrl={user?.picture}
                        name={user?.name}
                        rating={4}
                        bio={user?.bio}
                        skills={user?.skillsProficientAt}
                        username={user?.username}
                      />
                    ))
                  ) : (
                    <p style={{ color: "black" }}>No users to show right now</p>
                  )}
   
                  
                </div>
                <p id="cooking" style={{color:"gray",fontFamily: "Josefin Sans, sans-serif"}}>SkillME <ImRedo2 />Cooking</p>
                <div className="profile-cards">
                  {/* Profile cards go here */}
                  {cookUsers && cookUsers.length > 0 ? (
                    cookUsers.map((user) => (
                      <ProfileCard
                        profileImageUrl={user?.picture}
                        name={user?.name}
                        rating={4}
                        bio={user?.bio}
                        skills={user?.skillsProficientAt}
                        username={user?.username}
                      />
                    ))
                  ) : (
                    <p style={{ color: "black" }}>No users to show right now</p>
                  )}
   
                  
                </div>
                <p id="graphic" style={{color:"gray",fontFamily: "Josefin Sans, sans-serif"}}>SkillME <ImRedo2 />Graphic Design</p>
                <div className="profile-cards">
                  {/* Profile cards go here */}
                  {graphicUsers && graphicUsers.length > 0 ? (
                    graphicUsers.map((user) => (
                      <ProfileCard
                        profileImageUrl={user?.picture}
                        name={user?.name}
                        rating={4}
                        bio={user?.bio}
                        skills={user?.skillsProficientAt}
                        username={user?.username}
                      />
                    ))
                  ) : (
                    <p style={{ color: "black" }}>No users to show right now</p>
                  )}
   
                  
                </div>
                <p id="sports" style={{color:"gray",fontFamily: "Josefin Sans, sans-serif"}}>SkillME <ImRedo2 />Sports</p>
                <div className="profile-cards">
                  {/* Profile cards go here */}
                  {sportsUsers && sportsUsers.length > 0 ? (
                    sportsUsers.map((user) => (
                      <ProfileCard
                        profileImageUrl={user?.picture}
                        name={user?.name}
                        rating={4}
                        bio={user?.bio}
                        skills={user?.skillsProficientAt}
                        username={user?.username}
                      />
                    ))
                  ) : (
                    <p style={{ color: "black" }}>No users to show right now</p>
                  )}
   
                  
                </div>
                <p id="web-development" style={{color:"gray",fontFamily: "Josefin Sans, sans-serif"}}>SkillME <ImRedo2 />Programming</p>
                <div className="profile-cards">
                  {/* Profile cards go here */}
                  {programUsers && programUsers.length > 0 ? (
                    programUsers.map((user) => (
                      <ProfileCard
                        profileImageUrl={user?.picture}
                        name={user?.name}
                        rating={4}
                        bio={user?.bio}
                        skills={user?.skillsProficientAt}
                        username={user?.username}
                      />
                    ))
                  ) : (
                    <p style={{ color: "black" }}>No users to show right now</p>
                  )}
   
                  
                </div>
            
                <p id="others" style={{color:"gray",fontFamily: "Josefin Sans, sans-serif"}}>SkillME <ImRedo2 />Others</p>
                <div className="profile-cards">
                  {/* Profile cards go here */}
                  {otherUsers && otherUsers.length > 0 ? (
                    otherUsers.map((user) => (
                      <ProfileCard
                        profileImageUrl={user?.picture}
                        name={user?.name}
                        rating={4}
                        bio={user?.bio}
                        skills={user?.skillsProficientAt}
                        username={user?.username}
                      />
                    ))
                  ) : (
                    <p style={{ color: "black" }}>No users to show right now</p>
                  )}
   
                  
                </div>
               
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
