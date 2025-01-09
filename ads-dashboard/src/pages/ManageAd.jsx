import React from "react";
import AdForm from "../components/AdForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ManageAd = () => {
  const { id } = useParams();
  const ads = useSelector((state) => state.ads.ads);
  const existingAd = id ? ads.find((ad) => ad.id === parseInt(id)) : null;

  if (id && !existingAd) {
    toast.error("Ad not found. Redirecting...", {
      position: "top-right",
      autoClose: 3000,
    });
  }

  return (
    <div className="p-4 animate__animated animate__fadeIn">
      <h1 className="text-2xl font-bold mb-6 text-red-600">
        {existingAd ? "Edit Ad" : "Create New Ad"}
      </h1>
      <AdForm existingAd={existingAd} />
    </div>
  );
};

export default ManageAd;
