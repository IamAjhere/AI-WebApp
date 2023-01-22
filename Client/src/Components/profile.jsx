import React, { useState, useEffect } from "react";
import Axios from "axios";
import axios from "../api/axios";
import Skeleton from "react-loading-skeleton";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faSave,
  faBackspace,
  faImage,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
function Profilecomponent() {
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState();
  const [saveimage, setSaveimage] = useState();
  const { auth, setAuth } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const [isloading, setLoading] = useState(false);
  const [infosaved, setInfosaved] = useState(false);

  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [birthday, setBirthday] = useState(undefined);
  const [mobile, setMobile] = useState(undefined);
  useEffect(() => {
    setLoading(true);
    const GetuserInfo = async () => {
      auth.accessToken &&
        (await axios
          .get("/userinfo", {
            headers: { "auth-token": auth.accessToken },
            withCredentials: true,
          })
          .then((r) => {
            setUserInfo(r.data);
          }));
      setLoading(false);
    };
    GetuserInfo();
  }, [auth, infosaved]);

  useEffect(() => {
    userInfo && setImage(userInfo.image);
  }, [userInfo]);
  const saved = async (img) => {
    const reg = new RegExp("^[0-9]+$");
    const date = new Date(birthday);
    if (mobile !== "") {
      if (mobile.length > 10 || !reg.test(mobile)) {
        alert("Invalid Number");
        return;
      }
    }
    setLoading(true);

    await axios
      .post(
        "/updateuser",
        {
          name: name,
          email: email,
          dateofbirth: date,
          mobile: mobile,
          image: img,
        },
        {
          headers: { "auth-token": auth.accessToken },
          withCredentials: true,
        }
      )
      .then((r) => r && setInfosaved(!infosaved));
    setLoading(false);
  };

  function toggle() {
    setEdit(!edit);
  }
  const logout = () => {
    setAuth({});
    window.location.reload();
  };

  const save = async (e) => {
    e.preventDefault();
    if (saveimage) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", saveimage);
      formData.append("upload_preset", "vqhxidnq");

      await Axios.post(
        "https://api.cloudinary.com/v1_1/dlpnkayyj/image/upload",
        formData,
        { withCredentials: false }
      ).then((r) => {
        saved(r.data.secure_url);
        setSaveimage(undefined);
      });
    } else {
      saved();
    }
  };

  //profile
  let Showprofile = (
    <>
      <div className="m-1 w-75 mx-auto d-block">
        <button className="btn border btn-secondary" onClick={toggle}>
          <FontAwesomeIcon icon={faGear} /> Edit
        </button>
        <button className="btn border btn-secondary" onClick={logout}>
          <FontAwesomeIcon icon={faSignOut} /> Logout
        </button>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userInfo?.name}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userInfo?.email}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Birthday</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {userInfo?.dateofbirth.split("T")[0]}
                </p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Mobile</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {userInfo?.mobile || "Not Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border m-3 text-center ">
        <h3>Disclaimer</h3>
        <h4>Past performance may not be indicative of future results!</h4>
        <p>
          Therefore, you should not assume that the future performance of any
          specific investment or investment strategy will be profitable or equal
          to corresponding past performance levels. Each investment decision you
          make should be determined with reference to the specific information
          available for such investment, and not based upon the success of past
          recommendations.
        </p>
      </div>
    </>
  );
  //edit profile
  let updateprofile = (
    <div className="m-1 w-75 mx-auto d-block">
      <form>
        <button className="btn border btn-secondary" onClick={toggle}>
          <FontAwesomeIcon icon={faBackspace} />
        </button>
        <label className="btn btn-secondary m-0">
          <FontAwesomeIcon icon={faImage} /> Upload Image
          <input
            type="file"
            hidden
            onChange={(e) => {
              setImage(URL.createObjectURL(e.target.files[0]));
              setSaveimage(e.target.files[0]);
            }}
          />
        </label>
        <button
          className="btn border btn-secondary"
          type="submit"
          onClick={save}
        >
          <FontAwesomeIcon icon={faSave} /> Save
        </button>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 text-black">Full Name</p>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="text-black"
                  placeholder={userInfo?.name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 text-black">Email</p>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="text-black"
                  placeholder={userInfo?.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 text-black">Birthday</p>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="text-black"
                  placeholder={userInfo?.dateofbirth.split("T")[0]}
                  onChange={(e) => {
                    setBirthday(e.target.value);
                  }}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 text-black">Mobile</p>
              </div>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="text-black"
                  placeholder={userInfo?.mobile || "Not Available"}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
  return (
    <div className="card h-100 ">
      <div className="card-header">Profile</div>
      <div className="card-body ">
        {isloading ? (
          <Skeleton height={670} />
        ) : (
          <>
            <div className="btn mx-auto d-block">
              <img
                src={`${
                  image
                    ? image
                    : `https://eu.ui-avatars.com/api/?name=${userInfo?.name}&size=130`
                }  `}
                className="img-thumbnail prof-img"
                alt="Profile_picture"
              />
            </div>
            {edit ? updateprofile : Showprofile}
          </>
        )}
      </div>
    </div>
  );
}

export default Profilecomponent;
