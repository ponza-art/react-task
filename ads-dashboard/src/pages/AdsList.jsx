import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAds } from "../features/adsSlice";
import AdCard from "../components/AdCard";
import { toast } from "react-toastify";

const AdsList = () => {
  const ads = useSelector((state) => state.ads.ads) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (ads.length === 0) {
      fetch("https://ads-back.shutterstudio.io/ads")
        .then((res) => res.json())
        .then((response) => {
          if (response.data && Array.isArray(response.data.result)) {
            dispatch(setAds(response.data.result));
            toast.success("Ads loaded successfully!", {
              position: "top-right",
              autoClose: 3000,
            });
          } else {
            console.error("Unexpected API response structure:", response);
            toast.error("Failed to load ads. Unexpected response structure.", {
              position: "top-right",
              autoClose: 3000,
            });
            dispatch(setAds([]));
          }
        })
        .catch((error) => {
          console.error("Error fetching ads:", error);
          toast.error("Failed to load ads. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
          });
          dispatch(setAds([]));
        });
    }
  }, [dispatch, ads.length]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-red-600">Ads List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default AdsList;
