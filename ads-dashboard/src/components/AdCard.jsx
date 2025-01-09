import React from "react";
import { useDispatch } from "react-redux";
import { deleteAd } from "../features/adsSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdCard = ({ ad }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAd(ad.id));
    toast.success("Ad deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const formatDateTime = (dateTimeStr) => {
    return new Date(dateTimeStr).toLocaleString();
  };

  const renderMedia = () => {
    if (ad.video) {
      return (
        <video className="w-full h-48 object-cover mb-2" controls>
          <source src={ad.video} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      );
    } else if (ad.image) {
      return (
        <img
          src={ad.image}
          alt="Ad content"
          className="w-full h-48 object-cover mb-2"
        />
      );
    }
    return (
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        No media
      </div>
    );
  };

  return (
    <div className="p-4 bg-black text-white shadow rounded hover:shadow-red-500/50 transition-shadow transform hover:scale-105 duration-300 ease-in-out">
      {renderMedia()}
      <div className="text-sm text-gray-300 flex justify-between">
        <p>Start: {formatDateTime(ad.from_time)}</p>
        <p>End: {formatDateTime(ad.to_time)}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/manage-ad/${ad.id}`}
          className="btn bg-red-600 hover:bg-red-700 text-white flex-1 border-none"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="btn bg-black hover:bg-red-900 text-white flex-1 border border-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdCard;
