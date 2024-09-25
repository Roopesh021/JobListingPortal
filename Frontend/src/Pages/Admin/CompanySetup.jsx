import "./DashboardPage.css";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/Components/ui/button";
import { ArrowLeft } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { UserContext } from "@/Store/user-store";
const CompanySetup = () => {
  // const { singleCompany, useGetCompanyById } = useContext(UserContext);
  const params = useParams();
  // useGetCompanyById(params);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data, message);
    }
  };
  // useEffect(() => {
  //   if (singleCompany) {
  //     setInput({
  //       name: singleCompany.name || "",
  //       description: singleCompany.description || "",
  //       website: singleCompany.website || "",
  //       location: singleCompany.location || "",
  //       file: singleCompany.location || null,
  //     });
  //   }
  // }, [singleCompany]);
  return (
    <>
      <div className="admin-section">
        <div className="admin-hero-section">
          <div className="header-content">
            <h1>Company Profile</h1>
            <p>
              Ensure your company profile reflects your brand to attract the
              best candidates.
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="btn-back"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
          </div>
        </div>
        <div className="admin-details">
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                ></Input>
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                ></Input>
              </div>
              <div>
                <Label>Website</Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                ></Input>
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                ></Input>
              </div>
              <div>
                <Label>Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                ></Input>
              </div>
            </div>
            <Button type="submit" className="w-full mt-8">
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;
